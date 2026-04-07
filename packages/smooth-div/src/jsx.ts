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

// Augment React.CSSProperties so --smooth-div-* custom properties get
// IntelliSense when passed via style={{ ... }} in React/TSX.
declare module "react" {
  interface CSSProperties {
    "--smooth-div-stroke-width"?: string | number
    "--smooth-div-stroke-color"?: string
  }
}

export {}
