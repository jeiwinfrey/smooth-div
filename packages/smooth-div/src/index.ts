import "./jsx"

export interface SmoothDivOptions {
  radius?: number
  smoothness?: number
  multiplier?: number
}

export const DEFAULT_SMOOTHNESS = 0.6
export const DEFAULT_MULTIPLIER = 2.2
export const SMOOTH_DIV_TAG = "smooth-div"

const BASE_STYLE_ID = "smooth-div-base-styles"
const PATH_TEST_VALUE = 'path("M 0 0 H 1 V 1 H 0 Z")'

let cachedClipPathSupport: boolean | undefined

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function round(value: number): number {
  return Number(value.toFixed(2))
}

function readNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined
}

function readNumberAttribute(element: Element, name: string): number | undefined {
  const value = element.getAttribute(name)

  if (value === null || value.trim() === "") {
    return undefined
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

function writeNumberAttribute(element: Element, name: string, value: number | undefined): void {
  if (value === undefined || value === null || !Number.isFinite(value)) {
    element.removeAttribute(name)
    return
  }

  element.setAttribute(name, String(value))
}

function ensureBaseStyles(): void {
  if (typeof document === "undefined" || document.getElementById(BASE_STYLE_ID)) {
    return
  }

  const style = document.createElement("style")
  style.id = BASE_STYLE_ID
  style.textContent = `
${SMOOTH_DIV_TAG} {
  display: block;
  box-sizing: border-box;
  overflow: hidden;
}

${SMOOTH_DIV_TAG}[hidden] {
  display: none;
}
`

  document.head.append(style)
}

export function supportsSmoothDivClipPath(): boolean {
  if (cachedClipPathSupport !== undefined) {
    return cachedClipPathSupport
  }

  if (typeof CSS === "undefined" || typeof CSS.supports !== "function") {
    cachedClipPathSupport = false
    return cachedClipPathSupport
  }

  cachedClipPathSupport =
    CSS.supports("clip-path", PATH_TEST_VALUE) ||
    CSS.supports("-webkit-clip-path", PATH_TEST_VALUE)

  return cachedClipPathSupport
}

export function normalizeSmoothness(value?: number): number {
  const smoothness = readNumber(value)
  return smoothness === undefined ? DEFAULT_SMOOTHNESS : clamp(smoothness, 0, 1)
}

export function normalizeMultiplier(value?: number): number {
  const multiplier = readNumber(value)
  return multiplier === undefined ? DEFAULT_MULTIPLIER : Math.max(0, multiplier)
}

export function resolveRadius(width: number, height: number, options: SmoothDivOptions = {}): number {
  if (width <= 0 || height <= 0) {
    return 0
  }

  const minSide = Math.min(width, height)
  const maxRadius = minSide / 2
  const explicitRadius = readNumber(options.radius)

  if (explicitRadius !== undefined) {
    return clamp(explicitRadius, 0, maxRadius)
  }

  const autoRadius = normalizeMultiplier(options.multiplier) * Math.sqrt(minSide)
  return clamp(autoRadius, 0, maxRadius)
}

export function squirclePath(width: number, height: number, options: SmoothDivOptions = {}): string {
  if (width <= 0 || height <= 0) {
    return "M 0 0 Z"
  }

  const radius = resolveRadius(width, height, options)
  const smoothness = normalizeSmoothness(options.smoothness)
  const extent = radius * (1 + smoothness)
  const control = radius * smoothness

  const cx = Math.min(extent, width / 2)
  const cy = Math.min(extent, height / 2)
  const px = extent === 0 ? 0 : control * (cx / extent)
  const py = extent === 0 ? 0 : control * (cy / extent)

  return [
    `M ${round(width / 2)} 0`,
    `H ${round(width - cx)}`,
    `C ${round(width - px)} 0 ${round(width)} ${round(py)} ${round(width)} ${round(cy)}`,
    `V ${round(height - cy)}`,
    `C ${round(width)} ${round(height - py)} ${round(width - px)} ${round(height)} ${round(width - cx)} ${round(height)}`,
    `H ${round(cx)}`,
    `C ${round(px)} ${round(height)} 0 ${round(height - py)} 0 ${round(height - cy)}`,
    `V ${round(cy)}`,
    `C 0 ${round(py)} ${round(px)} 0 ${round(cx)} 0`,
    "Z",
  ].join(" ")
}

function setClipPath(style: CSSStyleDeclaration, path: string): void {
  const value = `path("${path}")`
  style.clipPath = value
  ;(style as CSSStyleDeclaration & { webkitClipPath?: string }).webkitClipPath = value
}

function clearClipPath(style: CSSStyleDeclaration): void {
  style.removeProperty("clip-path")
  style.removeProperty("-webkit-clip-path")
}

export class SmoothDivElement extends HTMLElement {
  static observedAttributes = ["radius", "smoothness", "multiplier"]

  #frame = 0
  #resizeObserver?: ResizeObserver
  #handleWindowResize = () => this.scheduleUpdate()

  get radius(): number | undefined {
    return readNumberAttribute(this, "radius")
  }

  set radius(value: number | undefined) {
    writeNumberAttribute(this, "radius", value)
  }

  get smoothness(): number | undefined {
    return readNumberAttribute(this, "smoothness")
  }

  set smoothness(value: number | undefined) {
    writeNumberAttribute(this, "smoothness", value)
  }

  get multiplier(): number | undefined {
    return readNumberAttribute(this, "multiplier")
  }

  set multiplier(value: number | undefined) {
    writeNumberAttribute(this, "multiplier", value)
  }

  connectedCallback(): void {
    ensureBaseStyles()

    if (typeof ResizeObserver !== "undefined") {
      this.#resizeObserver ??= new ResizeObserver(() => this.scheduleUpdate())
      this.#resizeObserver.observe(this)
    } else if (typeof window !== "undefined") {
      window.addEventListener("resize", this.#handleWindowResize)
    }

    this.scheduleUpdate()
  }

  disconnectedCallback(): void {
    this.#resizeObserver?.disconnect()

    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.#handleWindowResize)
      window.cancelAnimationFrame(this.#frame)
    }

    this.#frame = 0
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (name && oldValue !== newValue) {
      this.scheduleUpdate()
    }
  }

  updateShape(): void {
    const width = this.getBoundingClientRect().width
    const height = this.getBoundingClientRect().height
    const radius = resolveRadius(width, height, {
      radius: this.radius,
      smoothness: this.smoothness,
      multiplier: this.multiplier,
    })

    this.style.borderRadius = `${round(radius)}px`
    this.style.setProperty("--smooth-div-radius", `${round(radius)}px`)
    this.style.setProperty("--smooth-div-smoothness", String(normalizeSmoothness(this.smoothness)))
    this.style.setProperty("--smooth-div-multiplier", String(normalizeMultiplier(this.multiplier)))

    if (width <= 0 || height <= 0 || !supportsSmoothDivClipPath()) {
      clearClipPath(this.style)
      return
    }

    setClipPath(
      this.style,
      squirclePath(width, height, {
        radius: this.radius,
        smoothness: this.smoothness,
        multiplier: this.multiplier,
      }),
    )
  }

  private scheduleUpdate(): void {
    if (typeof window === "undefined" || this.#frame !== 0) {
      return
    }

    this.#frame = window.requestAnimationFrame(() => {
      this.#frame = 0
      this.updateShape()
    })
  }
}

export function registerSmoothDiv(tagName = SMOOTH_DIV_TAG): CustomElementConstructor | undefined {
  if (typeof customElements === "undefined") {
    return undefined
  }

  const existing = customElements.get(tagName)

  if (existing) {
    return existing
  }

  ensureBaseStyles()
  customElements.define(tagName, SmoothDivElement)
  return SmoothDivElement
}

if (typeof window !== "undefined") {
  registerSmoothDiv()
}

declare global {
  interface HTMLElementTagNameMap {
    "smooth-div": SmoothDivElement
  }
}
