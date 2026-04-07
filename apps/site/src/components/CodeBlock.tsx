import { useState } from "react";

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export function CodeBlock({ code, lang }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex flex-col gap-2.5">
      <smooth-div
        className={`flex w-full items-center gap-4 bg-white px-4 py-2.5 shadow-sm md:px-5 ${lang ? "justify-between" : "justify-end"}`}
      >
        {lang ? (
          <span className="min-w-0 truncate font-mono text-xs font-medium uppercase tracking-wider text-[#a0a0a0]">
            {lang}
          </span>
        ) : null}
        <button
          type="button"
          onClick={copy}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 border-0 bg-transparent px-1 py-0.5 text-xs font-medium text-[#8a8a8a] transition-colors hover:text-black"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              Copy
            </>
          )}
        </button>
      </smooth-div>

      <smooth-div radius={12} className="block w-full bg-[#fafafa]">
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-black font-mono md:p-5">
          <code>{code}</code>
        </pre>
      </smooth-div>
    </div>
  );
}
