import { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import { InlineCode } from "./InlineCode";

const managers = ["npm", "pnpm", "yarn", "bun"] as const;
type Manager = (typeof managers)[number];

const installCommands: Record<Manager, string> = {
  npm: "npm install smooth-div",
  pnpm: "pnpm add smooth-div",
  yarn: "yarn add smooth-div",
  bun: "bun add smooth-div",
};

export function InstallSection() {
  const [active, setActive] = useState<Manager>("npm");

  return (
    <section id="installation" className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-2xl text-black">Installation</h2>
        <p className="text-sm leading-relaxed text-[#7e7e7e]">
          Install from npm. No bundler plugins or configuration required.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-0.5">
          {managers.map((m) => (
            <smooth-div
              key={m}
              radius={8}
              className={
                active === m ? "bg-[#f1f1f1]" : "transition-colors hover:bg-black/[0.04]"
              }
            >
              <button
                type="button"
                onClick={() => setActive(m)}
                className={`cursor-pointer border-0 bg-transparent px-3 py-2 text-sm transition-colors ${
                  active === m
                    ? "font-medium text-black"
                    : "text-[#8a8a8a] hover:text-black"
                }`}
              >
                {m}
              </button>
            </smooth-div>
          ))}
        </div>
        <CodeBlock lang="bash" code={installCommands[active]} />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-black">Quick start</h3>
        <p className="text-sm leading-relaxed text-[#7e7e7e]">
          Import the package once to register the custom element, then use{" "}
          <InlineCode>&lt;smooth-div&gt;</InlineCode>{" "}
          anywhere in your markup.
        </p>
        <CodeBlock
          lang="ts"
          code={`import "smooth-div"\n\n// React / JSX\nimport "smooth-div/react"   // adds React JSX typings\n\n// Preact / Solid\nimport "smooth-div/preact"\nimport "smooth-div/solid"`}
        />
      </div>
    </section>
  );
}
