import { useState } from "react";
import { InlineCode } from "./InlineCode";

export function ComparisonOverlap() {
  const [isOverlapped, setIsOverlapped] = useState(false);

  return (
    <section id="demo" className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-2xl text-black">Interactive Demo</h2>
        <p className="text-sm leading-relaxed text-[#7e7e7e]">
          Overlap the shapes to see the continuous squircle curve versus
          standard CSS{" "}
          <InlineCode>border-radius</InlineCode>{" "}
          side by side.
        </p>
      </div>

      <div className="flex w-full flex-col items-center gap-6">
        <smooth-div
          radius={24}
          className="flex w-full flex-col items-center gap-12 bg-[#fafafa] p-10 lg:p-16"
        >
          {/* Labels */}
          <div
            className={`flex w-full max-w-md items-center justify-between px-1 text-xs font-medium text-[#a0a0a0] transition-opacity duration-500 ${
              isOverlapped ? "opacity-0" : "opacity-100"
            }`}
          >
            <span>border-radius</span>
            <span>smooth-div</span>
          </div>

          {/* Shape comparison area */}
          <div className="relative flex h-60 w-full max-w-md items-center justify-center">
            {/* Standard rounded div */}
            <div
              className={`absolute h-48 w-48 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-[40px] ${
                isOverlapped
                  ? "translate-x-0 bg-[#ffd6d6] mix-blend-multiply"
                  : "-translate-x-32 bg-[#ebebeb]"
              }`}
              style={{ zIndex: 10 }}
            />

            {/* smooth-div */}
            <smooth-div
              className={`absolute h-48 w-48 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                isOverlapped
                  ? "translate-x-0 bg-[#d6f0ff] mix-blend-multiply"
                  : "translate-x-32 bg-[#ebebeb]"
              }`}
              style={{ zIndex: 20 }}
              radius={40}
            />
          </div>

          {/* Overlap label */}
          <div
            className={`max-w-md px-2 text-center text-xs font-medium text-[#a0a0a0] transition-opacity duration-500 ${
              isOverlapped ? "opacity-100" : "opacity-0"
            }`}
          >
            Misalignment visible at edges → squircle on top
          </div>
        </smooth-div>

        <smooth-div className="inline-block bg-[#f1f1f1] transition-colors hover:bg-black/[0.06] active:scale-95">
          <button
            type="button"
            onClick={() => setIsOverlapped(!isOverlapped)}
            className="grid cursor-pointer place-items-center border-0 bg-transparent px-6 py-2.5 text-sm font-medium text-black [&>span]:col-start-1 [&>span]:row-start-1"
          >
            <span className="pointer-events-none invisible whitespace-nowrap" aria-hidden>
              Overlap shapes
            </span>
            <span className="whitespace-nowrap">{isOverlapped ? "Separate" : "Overlap shapes"}</span>
          </button>
        </smooth-div>
      </div>
    </section>
  );
}
