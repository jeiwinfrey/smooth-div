import { CodeBlock } from "./CodeBlock";
import { InlineCode } from "./InlineCode";

interface Row {
  name: string;
  type: string;
  default: string;
  description: string;
}

const attributes: Row[] = [
  {
    name: "radius",
    type: "number",
    default: "auto",
    description:
      "Corner radius in pixels. When omitted, radius is auto-computed as multiplier × √(minSide).",
  },
  {
    name: "smoothness",
    type: "number",
    default: "0.6",
    description:
      "How far the Bézier handles extend relative to the radius. 0 = sharp corners, 1 = maximum squircle.",
  },
  {
    name: "multiplier",
    type: "number",
    default: "2.2",
    description:
      "Scales the auto-radius formula. Larger values produce more aggressive rounding.",
  },
];

const cssVars = [
  { name: "--smooth-div-radius", description: "Resolved radius in px (read-only, set by the element)." },
  { name: "--smooth-div-smoothness", description: "Resolved smoothness value (read-only)." },
  { name: "--smooth-div-multiplier", description: "Resolved multiplier value (read-only)." },
  {
    name: "--smooth-div-stroke-width",
    description:
      "Border width in pixels (number, no unit). The element draws a squircle-shaped SVG stroke overlay. Use instead of CSS border, which cannot follow clip-path.",
  },
  {
    name: "--smooth-div-stroke-color",
    description:
      "Border color (any valid CSS color value). Must be set alongside --smooth-div-stroke-width to draw the border.",
  },
];

export function ApiSection() {
  return (
    <section id="api" className="flex flex-col gap-12">
      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-2xl text-black">API Reference</h2>
        <p className="text-sm leading-relaxed text-[#7e7e7e]">
          All attributes can be passed as strings in HTML or as numbers in JSX.
        </p>
      </div>

      {/* Browser support — high in API for visibility */}
      <div id="browser-support" className="scroll-mt-24">
        <smooth-div radius={12} className="bg-[#fafafa] p-6 shadow-sm md:p-8">
          <div className="mb-5 flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#a0a0a0]">
              Compatibility
            </p>
            <h3 className="font-serif text-2xl text-black leading-tight">Browser support</h3>
            <p className="text-base font-medium leading-snug text-black">
              Full squircle rendering in today&apos;s evergreen browsers. Where{" "}
              <InlineCode>clip-path: path()</InlineCode> isn&apos;t available, the element falls back to{" "}
              <InlineCode>border-radius</InlineCode>
              —same markup, same layout, no breakage.
            </p>
          </div>
          <div className="mb-6 flex flex-wrap gap-2">
            {["Chrome", "Firefox", "Safari", "Edge"].map((b) => (
              <smooth-div
                key={b}
                className="inline-block bg-white px-3 py-1.5 text-xs font-medium text-black shadow-sm"
              >
                {b}
              </smooth-div>
            ))}
            <span className="self-center text-xs text-[#7e7e7e]">+ other Chromium/WebKit-based browsers</span>
          </div>
          <div className="flex flex-col gap-3 text-sm leading-relaxed text-[#7e7e7e]">
            <p>
              Detection uses <InlineCode>CSS.supports()</InlineCode> for{" "}
              <InlineCode>clip-path</InlineCode> with an SVG path. When support is missing, squircle math is
              skipped and corners use standard CSS rounding only.
            </p>
            <p>
              Children stay in the light DOM, so utility classes, custom properties, and ordinary DOM queries
              keep working with zero extra setup.
            </p>
          </div>
        </smooth-div>
      </div>

      {/* Attributes table */}
      <div className="flex flex-col gap-6">
        <h3 className="text-sm font-semibold text-black">Attributes / Props</h3>
        <smooth-div radius={12} className="block overflow-x-auto bg-[#fafafa] shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f1f1f1]">
                <th className="px-4 py-3 text-left font-semibold text-[#555] text-xs uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-[#555] text-xs uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-[#555] text-xs uppercase tracking-wider">
                  Default
                </th>
                <th className="px-4 py-3 text-left font-semibold text-[#555] text-xs uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {attributes.map((row) => (
                <tr key={row.name} className="transition-colors hover:bg-black/[0.03]">
                  <td className="px-4 py-3">
                    <InlineCode>{row.name}</InlineCode>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[#7e7e7e]">{row.type}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#7e7e7e]">{row.default}</td>
                  <td className="px-4 py-3 text-xs leading-relaxed text-[#7e7e7e]">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </smooth-div>
      </div>

      {/* CSS Variables */}
      <div className="flex flex-col gap-6">
        <h3 className="text-sm font-semibold text-black">CSS Variables</h3>
        <p className="text-xs leading-relaxed text-[#7e7e7e]">
          The element exposes these read-only custom properties after each update, so you can build hover effects and transitions keyed to the resolved values.
        </p>
        <smooth-div radius={12} className="block overflow-x-auto bg-[#fafafa] shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f1f1f1]">
                <th className="px-4 py-3 text-left font-semibold text-[#555] text-xs uppercase tracking-wider">
                  Variable
                </th>
                <th className="px-4 py-3 text-left font-semibold text-[#555] text-xs uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {cssVars.map((v) => (
                <tr key={v.name} className="transition-colors hover:bg-black/[0.03]">
                  <td className="px-4 py-3">
                    <InlineCode nowrap>{v.name}</InlineCode>
                  </td>
                  <td className="px-4 py-3 text-xs leading-relaxed text-[#7e7e7e]">
                    {v.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </smooth-div>
      </div>

      {/* JS API */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-black">JavaScript API</h3>
        <CodeBlock
          lang="ts"
          code={`import { squirclePath, resolveRadius, registerSmoothDiv } from "smooth-div"

// Generate a raw SVG path string
const path = squirclePath(200, 100, { radius: 24, smoothness: 0.6 })

// Resolve the final radius for a known bounding box
const r = resolveRadius(200, 100, { multiplier: 2.2 })

// Manually register under a custom tag name
registerSmoothDiv("my-card")`}
        />
      </div>

      {/* Borders */}
      <div id="borders" className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-black">Borders</h3>
        <p className="text-sm leading-relaxed text-[#7e7e7e]">
          CSS{" "}
          <InlineCode>border</InlineCode>{" "}
          is painted on the rectangular box, then clipped by the squircle path
          — leaving an abrupt cut at the corners. Use the{" "}
          <InlineCode>--smooth-div-stroke-*</InlineCode>{" "}
          custom properties instead. The element injects an SVG overlay with a
          doubled stroke; the outer half is clipped by the squircle, leaving a
          pixel-perfect inner border.
        </p>
        <CodeBlock
          lang="css"
          code={`/* ✗ CSS border — corners get clipped as a straight line */
smooth-div {
  border: 1px solid #ddd;
}

/* ✓ Squircle border — follows the curve */
smooth-div {
  --smooth-div-stroke-width: 1;
  --smooth-div-stroke-color: #ddd;
}`}
        />
      </div>

      {/* SSR */}
      <div id="ssr" className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-black">SSR</h3>
        <p className="text-sm leading-relaxed text-[#7e7e7e]">
          Safe to import in SSR builds. Custom element registration and shape
          calculation only run in the browser. The element measures itself after
          hydration, so there is no FOUC or layout shift.
        </p>
      </div>
    </section>
  );
}
