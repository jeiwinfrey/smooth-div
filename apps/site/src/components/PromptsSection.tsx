import { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import { InlineCode } from "./InlineCode";

interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
}

const prompts: Prompt[] = [
  {
    id: "migrate-all",
    title: "Migrate all rounded containers",
    description:
      "Drop this into Cursor, Claude, or Copilot Chat to replace every rounded container div in a file with smooth-div.",
    prompt: `You are migrating React/JSX code to use the \`smooth-div\` custom element.

Rules:
- Replace \`<div className="... rounded-[Npx] ...">\` with \`<smooth-div radius={N} className="...">\`
- Replace \`<div className="... rounded-lg ...">\` with \`<smooth-div className="...">\` (let smooth-div auto-compute the radius)
- Replace \`<div className="... rounded-full ...">\` with \`<smooth-div className="...">\`
- Remove any \`rounded-*\` Tailwind classes from the className after replacing the tag
- Keep all other classes, props, children, and attributes unchanged
- Do NOT replace: \`<button>\`, \`<input>\`, \`<a>\`, \`<img>\`, or semantic elements
- Do NOT replace divs that have no visible background, border, or shadow (layout-only wrappers)
- Add \`import "smooth-div/react"\` at the top of the file if it is not already imported
- Preserve all existing TypeScript types, event handlers, and refs

Apply these rules to the file I paste below:`,
  },
  {
    id: "migrate-cards",
    title: "Migrate card components only",
    description:
      "Narrower prompt that only targets cards, panels, and widget containers — safer for partial migrations.",
    prompt: `Migrate card and panel components in this file to use \`smooth-div\`.

Only replace \`<div>\` elements that meet ALL of the following:
1. Have a background color (e.g. \`bg-white\`, \`bg-gray-100\`, \`bg-[#fff]\`)
2. Have rounded corners (e.g. \`rounded-xl\`, \`rounded-[24px]\`, \`rounded-2xl\`)
3. Appear to be a visible container (card, panel, chip, badge, avatar)

For each replacement:
- Use \`<smooth-div radius={N}>\` where N is the pixel value from the \`rounded-*\` class
  - \`rounded-sm\` → 4, \`rounded-md\` → 6, \`rounded-lg\` → 8, \`rounded-xl\` → 12,
    \`rounded-2xl\` → 16, \`rounded-3xl\` → 24, \`rounded-full\` → omit (auto)
- Remove the \`rounded-*\` class from className
- Keep everything else identical
- Add \`import "smooth-div/react"\` if missing

Leave all other elements unchanged. Apply to:`,
  },
  {
    id: "audit",
    title: "Audit a file for migration candidates",
    description:
      "Ask an AI to list all elements that are good candidates before making any changes.",
    prompt: `Review the following file and list every element that would benefit from being replaced with \`<smooth-div>\`.

For each candidate, output:
- Line number
- The element (e.g. \`<div className="...">\`)
- Reason it is a good candidate (has background + border-radius, is a visible container, etc.)
- Suggested \`smooth-div\` replacement with the correct \`radius\` prop

Do NOT make any code changes. Only output the audit list.

File:`,
  },
  {
    id: "global-codemod",
    title: "Codemod prompt (whole codebase)",
    description:
      "Give this to an AI with file-system access (e.g. Cursor Agent, Claude Projects) to run across your entire repo.",
    prompt: `You have access to my codebase. Migrate all applicable \`<div>\` elements to \`<smooth-div>\`.

Step 1 — Scan
Find every .tsx and .jsx file that contains a \`<div>\` with a \`rounded-*\` Tailwind class or an inline \`borderRadius\` style AND a visible background/border.

Step 2 — Migrate (file by file)
For each file found:
- Replace qualifying \`<div>\` elements with \`<smooth-div radius={N}>\`
- Extract N from the Tailwind class or inline style value
- Remove the \`rounded-*\` class from className (smooth-div handles clipping)
- Add \`import "smooth-div/react"\` if not already imported in that file

Step 3 — Skip list
Do NOT touch:
- Interactive elements: \`<button>\`, \`<a>\`, \`<input>\`, \`<select>\`
- Semantic elements: \`<article>\`, \`<section>\`, \`<nav>\`, etc.
- Divs with no background, no border, or that are purely layout/flex wrappers
- \`rounded-none\` (radius 0)

Step 4 — Report
After finishing, output a summary table:
| File | Elements replaced | Skipped |

Start now.`,
  },
];

export function PromptsSection() {
  const [activeId, setActiveId] = useState<string>(prompts[0].id);

  const active = prompts.find((p) => p.id === activeId) ?? prompts[0];

  return (
    <section id="prompts" className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-2xl text-black">Prompts</h2>
        <p className="text-sm leading-relaxed text-[#7e7e7e]">
          Copy-paste prompts for AI tools like Cursor, Claude, and Copilot to
          migrate an existing codebase from{" "}
          <InlineCode>&lt;div&gt;</InlineCode> to <InlineCode>&lt;smooth-div&gt;</InlineCode>
          .
        </p>
      </div>

      {/* Prompt picker */}
      <div className="flex flex-col gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {prompts.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              className={`group cursor-pointer text-left transition-all ${
                activeId === p.id ? "" : "opacity-60 hover:opacity-100"
              }`}
            >
              <smooth-div
                radius={12}
                className={`flex h-full flex-col gap-1.5 p-4 shadow-sm transition-shadow ${
                  activeId === p.id
                    ? "bg-[#fafafa] shadow-md"
                    : "bg-white group-hover:shadow"
                }`}
              >
                <span className="text-sm font-medium text-black">{p.title}</span>
                <span className="text-xs leading-relaxed text-[#7e7e7e]">
                  {p.description}
                </span>
              </smooth-div>
            </button>
          ))}
        </div>

        {/* Active prompt */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#a0a0a0]">
              {active.title}
            </span>
          </div>
          <CodeBlock lang="prompt" code={active.prompt} />
        </div>
      </div>

      {/* Tip */}
      <smooth-div radius={12} className="bg-[#fafafa] p-5 shadow-sm">
        <p className="text-xs leading-relaxed text-[#7e7e7e]">
          <span className="font-semibold text-black">Tip.</span> For best
          results, paste the prompt into a chat thread that already has your
          file as context, or use an agent mode with file access. Always review
          AI-generated diffs before committing.
        </p>
      </smooth-div>
    </section>
  );
}
