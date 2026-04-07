export * from "./dist/index"

type SmoothDivFrameworkProps = {
  children?: unknown
  class?: string
  className?: string
  id?: string
  part?: string
  slot?: string
  style?: string | Record<string, string | number>
  radius?: number | string
  smoothness?: number | string
  multiplier?: number | string
  [name: string]: unknown
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "smooth-div": HTMLAttributes<HTMLElement> & SmoothDivFrameworkProps
    }

    interface CSSProperties {
      "--smooth-div-stroke-width"?: string | number
      "--smooth-div-stroke-color"?: string
    }
  }
}
