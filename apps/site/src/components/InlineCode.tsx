import type { ReactNode } from "react";

interface InlineCodeProps {
  children: ReactNode;
  nowrap?: boolean;
}

export function InlineCode({ children, nowrap }: InlineCodeProps) {
  return (
    <span className="inline-flex align-baseline max-w-full">
      <smooth-div
        radius={4}
        className="bg-[#f1f1f1] px-1.5 py-0.5"
        style={{ display: "inline-block", verticalAlign: "baseline" }}
      >
        <code className={`font-mono text-xs text-black${nowrap ? " whitespace-nowrap" : ""}`}>
          {children}
        </code>
      </smooth-div>
    </span>
  );
}
