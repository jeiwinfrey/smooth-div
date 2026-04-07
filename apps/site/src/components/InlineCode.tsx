import type { ReactNode } from "react";

interface InlineCodeProps {
  children: ReactNode;
  nowrap?: boolean;
}

export function InlineCode({ children, nowrap }: InlineCodeProps) {
  return (
    <smooth-div
      radius={4}
      className="inline-block max-w-full align-middle bg-[#f1f1f1] px-1.5 py-0.5"
    >
      <code className={`font-mono text-xs text-black${nowrap ? " whitespace-nowrap" : ""}`}>
        {children}
      </code>
    </smooth-div>
  );
}
