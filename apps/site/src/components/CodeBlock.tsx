import { useState, type ReactNode } from "react";
import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  lang?: string;
  actions?: ReactNode;
}

export function CodeBlock({ code, lang, actions }: CodeBlockProps) {
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
        radius={8}
        className="flex w-full items-center justify-between gap-4 bg-white px-2 py-1.5 shadow-sm md:px-3"
      >
        <div className="flex flex-1 items-center gap-0.5 overflow-x-auto no-scrollbar">
          {actions}
        </div>
        <button
          type="button"
          onClick={copy}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 border-0 bg-transparent px-2 py-1 text-xs font-medium text-[#8a8a8a] transition-colors hover:text-black"
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
        <Highlight
          theme={themes.github}
          code={code}
          language={(lang as any) || "tsx"}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`overflow-x-auto p-4 text-sm leading-relaxed font-mono md:p-5 ${className}`}
              style={{ ...style, backgroundColor: "transparent" }}
            >
              <code>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </smooth-div>
    </div>
  );
}
