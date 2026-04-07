import { useState, useRef, type CSSProperties } from "react";

interface PlaygroundProps {
  onBack: () => void;
}

type Fill = "light" | "dark";

export function Playground({ onBack }: PlaygroundProps) {
  const [width, setWidth] = useState(280);
  const [height, setHeight] = useState(200);
  const [radiusAuto, setRadiusAuto] = useState(true);
  const [radius, setRadius] = useState(28);
  const [smoothness, setSmoothness] = useState(0.6);
  const [multiplier, setMultiplier] = useState(2.2);
  const [fill, setFill] = useState<Fill>("light");
  const [copied, setCopied] = useState(false);

  const effectiveRadius = radiusAuto ? undefined : radius;

  const codeSnippet = [
    "<smooth-div",
    ...(effectiveRadius !== undefined ? [`  radius="${effectiveRadius}"`] : []),
    `  smoothness="${smoothness.toFixed(2)}"`,
    `  multiplier="${multiplier.toFixed(1)}"`,
    ">",
  ].join("\n");

  function copyCode() {
    navigator.clipboard.writeText(codeSnippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  function onResizeDown(e: React.MouseEvent) {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = width;
    const startH = height;

    function onMove(ev: MouseEvent) {
      setWidth(Math.max(80, Math.min(620, startW + ev.clientX - startX)));
      setHeight(Math.max(60, Math.min(520, startH + ev.clientY - startY)));
    }

    function onUp() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  const fillClass = fill === "light" ? "bg-[#f1f1f1]" : "bg-[#111]";
  const innerTextColor = fill === "dark" ? "text-[#444]" : "text-[#c8c8c8]";

  return (
    <div className="flex h-screen flex-col bg-white overflow-hidden select-none">
      {/* Header */}
      <header className="flex h-12 shrink-0 items-center gap-4 border-b border-[#f0f0f0] px-5">
        <smooth-div
          radius={6}
          className="inline-block transition-colors hover:bg-[#f1f1f1] active:scale-95"
        >
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 border-0 bg-transparent px-2.5 py-1.5 font-mono text-xs text-[#8a8a8a] hover:text-black cursor-pointer"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
            </svg>
            Back
          </button>
        </smooth-div>

        <span className="font-mono text-sm font-medium text-black">
          smooth-div
        </span>
        <span className="font-mono text-sm text-[#c0c0c0]">/</span>
        <span className="font-mono text-sm text-[#8a8a8a]">playground</span>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Canvas */}
        <div
          className="flex flex-1 items-center justify-center overflow-hidden"
          style={{
            backgroundColor: "#fafafa",
            backgroundImage:
              "radial-gradient(circle, #d4d4d4 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <div
            className="relative"
            style={{ width, height }}
          >
            <smooth-div
              radius={effectiveRadius}
              smoothness={smoothness}
              multiplier={multiplier}
              className={`w-full h-full ${fillClass} flex items-center justify-center`}
            >
              <span className={`font-mono text-[11px] ${innerTextColor}`}>
                {width} × {height}
              </span>
            </smooth-div>

            {/* Resize handle — sibling so clip-path doesn't eat it */}
            <div
              onMouseDown={onResizeDown}
              className="absolute -bottom-1 -right-1 flex h-5 w-5 cursor-se-resize items-end justify-end pb-0.5 pr-0.5"
              title="Drag to resize"
            >
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <rect x="0" y="6" width="3" height="3" fill="#999" />
                <rect x="3" y="3" width="3" height="3" fill="#bbb" />
                <rect x="6" y="0" width="3" height="3" fill="#d8d8d8" />
              </svg>
            </div>
          </div>
        </div>

        {/* Controls panel */}
        <aside className="w-68 shrink-0 overflow-y-auto border-l border-[#f0f0f0] bg-white">
          <div className="flex flex-col gap-0 divide-y divide-[#f0f0f0]">
            {/* Code snippet */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#b0b0b0]">
                  Output
                </span>
                <smooth-div
                  radius={4}
                  className="inline-block transition-colors hover:bg-[#f1f1f1] active:scale-95"
                >
                  <button
                    type="button"
                    onClick={copyCode}
                    className="border-0 bg-transparent px-2 py-1 font-mono text-[10px] text-[#a0a0a0] hover:text-black cursor-pointer"
                  >
                    {copied ? "copied!" : "copy"}
                  </button>
                </smooth-div>
              </div>
              <smooth-div radius={6} className="bg-[#f8f8f8]">
                <pre className="m-0 p-3 font-mono text-[11px] leading-relaxed text-[#555] whitespace-pre">
                  {codeSnippet}
                </pre>
              </smooth-div>
            </div>

            {/* Size */}
            <div className="p-4">
              <SectionLabel>Size</SectionLabel>
              <div className="flex flex-col gap-3.5 mt-3">
                <SliderRow
                  label="W"
                  value={width}
                  min={80}
                  max={620}
                  step={1}
                  onChange={setWidth}
                  display={`${width}px`}
                />
                <SliderRow
                  label="H"
                  value={height}
                  min={60}
                  max={520}
                  step={1}
                  onChange={setHeight}
                  display={`${height}px`}
                />
              </div>
            </div>

            {/* Radius */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <SectionLabel>Radius</SectionLabel>
                <smooth-div
                  radius={4}
                  className={`inline-block transition-colors ${radiusAuto ? "bg-black" : "bg-[#f1f1f1]"}`}
                >
                  <button
                    type="button"
                    onClick={() => setRadiusAuto((v) => !v)}
                    className={`border-0 bg-transparent px-2.5 py-1 font-mono text-[10px] cursor-pointer transition-colors ${radiusAuto ? "text-white" : "text-[#8a8a8a]"}`}
                  >
                    auto
                  </button>
                </smooth-div>
              </div>
              {!radiusAuto && (
                <div className="mt-3">
                  <SliderRow
                    label="R"
                    value={radius}
                    min={0}
                    max={300}
                    step={1}
                    onChange={setRadius}
                    display={`${radius}px`}
                  />
                </div>
              )}
            </div>

            {/* Smoothness */}
            <div className="p-4">
              <SectionLabel>Smoothness</SectionLabel>
              <div className="mt-3">
                <SliderRow
                  label="S"
                  value={smoothness}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={setSmoothness}
                  display={smoothness.toFixed(2)}
                />
              </div>
            </div>

            {/* Multiplier */}
            <div className="p-4">
              <SectionLabel>Multiplier</SectionLabel>
              <div className="mt-3">
                <SliderRow
                  label="M"
                  value={multiplier}
                  min={0.5}
                  max={5}
                  step={0.1}
                  onChange={setMultiplier}
                  display={multiplier.toFixed(1)}
                />
              </div>
            </div>

            {/* Fill */}
            <div className="p-4">
              <SectionLabel>Fill</SectionLabel>
              <div className="mt-3 flex gap-2">
                {(["light", "dark"] as const).map((f) => (
                  <smooth-div
                    key={f}
                    radius={4}
                    className={`inline-block transition-colors ${fill === f ? "bg-black" : "bg-[#f1f1f1]"}`}
                  >
                    <button
                      type="button"
                      onClick={() => setFill(f)}
                      className={`border-0 bg-transparent px-3 py-1.5 font-mono text-[11px] cursor-pointer capitalize transition-colors ${fill === f ? "text-white" : "text-[#8a8a8a]"}`}
                    >
                      {f}
                    </button>
                  </smooth-div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-wider text-[#b0b0b0]">
      {children}
    </span>
  );
}

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}

function SliderRow({ label, value, min, max, step, onChange, display }: SliderRowProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex items-center gap-3">
      <span className="w-3 shrink-0 font-mono text-[10px] text-[#c0c0c0]">
        {label}
      </span>
      <div className="relative flex-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="sd-slider w-full"
          style={{ "--pct": `${pct}%` } as CSSProperties}
        />
      </div>
      <span className="w-12 shrink-0 text-right font-mono text-[11px] text-[#555]">
        {display}
      </span>
    </div>
  );
}
