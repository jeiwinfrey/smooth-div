type SmoothDivJSXProps = {
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

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "smooth-div": SmoothDivJSXProps
    }
  }

  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "smooth-div": SmoothDivJSXProps
      }
    }
  }
}

export {}
