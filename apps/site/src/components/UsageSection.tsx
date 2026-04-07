import { useState } from "react";
import { CodeBlock } from "./CodeBlock";

const frameworks = ["React", "Solid", "Preact", "Vue", "Svelte", "HTML"] as const;
type Framework = (typeof frameworks)[number];

const snippets: Record<Framework, string> = {
  React: `import "smooth-div/react"

function Card() {
  return (
    <smooth-div radius={24} className="p-6 bg-white shadow">
      Hello, squircle!
    </smooth-div>
  )
}`,
  Solid: `import "smooth-div/solid"

function Card() {
  return (
    <smooth-div radius={24} class="p-6 bg-white shadow">
      Hello, squircle!
    </smooth-div>
  )
}`,
  Preact: `import "smooth-div/preact"

function Card() {
  return (
    <smooth-div radius={24} class="p-6 bg-white shadow">
      Hello, squircle!
    </smooth-div>
  )
}`,
  Vue: `<script setup>
import "smooth-div"
<\/script>

<template>
  <smooth-div :radius="24" class="p-6 bg-white shadow">
    Hello, squircle!
  </smooth-div>
</template>`,
  Svelte: `<script>
  import "smooth-div"
</script>

<smooth-div radius={24} class="p-6 bg-white shadow">
  Hello, squircle!
</smooth-div>`,
  HTML: `<script type="module">
  import "https://esm.sh/smooth-div"
</script>

<smooth-div radius="24" class="p-6 bg-white shadow">
  Hello, squircle!
</smooth-div>`,
};

export function UsageSection() {
  const [active, setActive] = useState<Framework>("React");

  return (
    <section id="usage" className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-2xl text-black">Usage</h2>
        <p className="text-sm leading-relaxed text-[#7e7e7e]">
          Works with any framework. Import once, use everywhere — no wrappers,
          no re-exports.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-0.5">
          {frameworks.map((f) => (
            <smooth-div
              key={f}
              radius={8}
              className={
                active === f ? "bg-[#f1f1f1]" : "transition-colors hover:bg-black/[0.04]"
              }
            >
              <button
                type="button"
                onClick={() => setActive(f)}
                className={`cursor-pointer border-0 bg-transparent px-3 py-2 text-sm transition-colors ${
                  active === f
                    ? "font-medium text-black"
                    : "text-[#8a8a8a] hover:text-black"
                }`}
              >
                {f}
              </button>
            </smooth-div>
          ))}
        </div>
        <CodeBlock lang="jsx" code={snippets[active]} />
      </div>
    </section>
  );
}
