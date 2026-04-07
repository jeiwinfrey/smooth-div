import { useEffect, useState } from "react";
import { InlineCode } from "./InlineCode";

/** One comparison per shape slide */
const squareCompare = {
  radius: 16,
  size: "h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36",
};

const rectangleCompare = {
  radius: 16,
  size: "h-[4.25rem] w-32 sm:h-24 sm:w-48 md:h-28 md:w-56",
};

const SLIDE_COUNT = 5;

/** Stage height tracks content scale; panel min-height keeps slide swaps stable */
const STAGE_MIN_H = "min-h-[18rem] sm:min-h-[20rem] md:min-h-[22rem]";

const OVERLAP_EASE = "transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]";

export function ShowcaseGrid() {
  const [slide, setSlide] = useState(0);
  const [galleryOverlapped, setGalleryOverlapped] = useState(false);

  /** Overlay only on squares & rectangles (slides 1–2); not on buttons, borders, or smoothness */
  const overlapNavDisabled = slide >= 2;

  useEffect(() => {
    setGalleryOverlapped(false);
  }, [slide]);

  function go(delta: number) {
    setSlide((s) => Math.min(SLIDE_COUNT - 1, Math.max(0, s + delta)));
  }

  function toggleGalleryOverlap() {
    if (overlapNavDisabled) return;
    setGalleryOverlapped((v) => !v);
  }

  const isFirst = slide === 0;
  const isLast = slide === SLIDE_COUNT - 1;

  return (
    <section id="showcase" className="flex min-h-0 flex-col gap-5 md:gap-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-serif text-2xl text-black">Shape Gallery</h2>
        <p className="max-w-2xl text-xs leading-relaxed text-[#7e7e7e] sm:text-sm">
          Step through: squares, rectangles, buttons, outlines, and <InlineCode>smoothness</InlineCode>.{" "}
          Compares <InlineCode>border-radius</InlineCode> with <InlineCode>&lt;smooth-div&gt;</InlineCode>.
        </p>
      </div>

      <div className="flex w-full flex-col items-center gap-4">
        <smooth-div
          radius={20}
          className="flex max-h-[min(85vh,36rem)] w-full flex-col gap-3 overflow-y-auto bg-[#fafafa] p-4 sm:min-h-[29rem] sm:max-h-[min(88vh,38rem)] sm:gap-4 sm:p-6 md:min-h-[31rem] md:max-h-[min(90vh,40rem)]"
        >
          <div className="flex w-full shrink-0 flex-col gap-0.5 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#a0a0a0] sm:text-xs">
              {slide + 1} / {SLIDE_COUNT}
            </span>
            <h3 className="font-serif text-base text-black md:text-lg">
              {slide === 0 && "Squares"}
              {slide === 1 && "Rectangles"}
              {slide === 2 && "Buttons"}
              {slide === 3 && "Borders & strokes"}
              {slide === 4 && "Radius & smoothness"}
            </h3>
            <p className="mx-auto min-h-[2.5rem] max-w-md text-[10px] leading-snug text-[#7e7e7e] sm:min-h-[2.75rem] sm:text-xs">
              {slide === 0 &&
                "Equal width and height — same pixel radius on CSS vs smooth-div, side by side."}
              {slide === 1 &&
                "Wider containers — corner treatment is easier to see when the shape has room to breathe."}
              {slide === 2 &&
                "Rounded CSS button vs smooth-div wrapping the same flat control and padding."}
              {slide === 3 &&
                "CSS border on a rounded rect vs squircle stroke overlay."}
              {slide === 4 &&
                "Same radius — lower smoothness is tighter; higher is more superellipse (default 0.6)."}
            </p>
          </div>

          <div
            className={`flex w-full flex-1 flex-col items-center justify-center ${STAGE_MIN_H} sm:flex-1`}
          >
            {slide === 0 && (
              <div className="flex w-full max-w-3xl flex-col items-center gap-3">
                <div className="relative flex min-h-[15rem] w-full items-center justify-center sm:min-h-[17rem]">
                  <div
                    className={`absolute ${OVERLAP_EASE} ${squareCompare.size} flex shrink-0 items-center justify-center ${
                      galleryOverlapped
                        ? "translate-x-0 bg-[#ffd6d6] mix-blend-multiply"
                        : "-translate-x-24 bg-[#f1f1f1] sm:-translate-x-32"
                    }`}
                    style={{ borderRadius: squareCompare.radius, zIndex: 10 }}
                  />
                  <smooth-div
                    radius={squareCompare.radius}
                    className={`absolute ${OVERLAP_EASE} ${squareCompare.size} flex shrink-0 items-center justify-center ${
                      galleryOverlapped
                        ? "translate-x-0 bg-[#d6f0ff] mix-blend-multiply"
                        : "translate-x-24 bg-[#f1f1f1] sm:translate-x-32"
                    }`}
                    style={{ zIndex: 20 }}
                  />
                </div>
                <div
                  className={`flex justify-center gap-16 transition-opacity duration-500 sm:gap-28 md:gap-32 ${
                    galleryOverlapped ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#b0b0b0] sm:text-xs">
                    css {squareCompare.radius}px
                  </span>
                  <span className="font-mono text-[10px] text-[#b0b0b0] sm:text-xs">
                    sd {squareCompare.radius}px
                  </span>
                </div>
                <p
                  className={`max-w-sm px-2 text-center text-[10px] font-medium text-[#a0a0a0] transition-opacity duration-500 sm:text-xs ${
                    galleryOverlapped ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  Stacked — edge mismatch shows the squircle on top
                </p>
              </div>
            )}

            {slide === 1 && (
              <div className="flex w-full max-w-3xl flex-col items-center gap-3">
                <div className="relative flex min-h-[14rem] w-full items-center justify-center sm:min-h-[16rem]">
                  <div
                    className={`absolute ${OVERLAP_EASE} ${rectangleCompare.size} flex shrink-0 items-center justify-center ${
                      galleryOverlapped
                        ? "translate-x-0 bg-[#ffd6d6] mix-blend-multiply"
                        : "-translate-x-24 bg-[#f1f1f1] sm:-translate-x-28 md:-translate-x-32"
                    }`}
                    style={{ borderRadius: rectangleCompare.radius, zIndex: 10 }}
                  />
                  <smooth-div
                    radius={rectangleCompare.radius}
                    className={`absolute ${OVERLAP_EASE} ${rectangleCompare.size} flex shrink-0 items-center justify-center ${
                      galleryOverlapped
                        ? "translate-x-0 bg-[#d6f0ff] mix-blend-multiply"
                        : "translate-x-24 bg-[#f1f1f1] sm:translate-x-28 md:translate-x-32"
                    }`}
                    style={{ zIndex: 20 }}
                  />
                </div>
                <div
                  className={`flex justify-center gap-14 transition-opacity duration-500 sm:gap-24 md:gap-28 ${
                    galleryOverlapped ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#b0b0b0] sm:text-xs">
                    css {rectangleCompare.radius}px
                  </span>
                  <span className="font-mono text-[10px] text-[#b0b0b0] sm:text-xs">
                    sd {rectangleCompare.radius}px
                  </span>
                </div>
                <p
                  className={`max-w-sm px-2 text-center text-[10px] font-medium text-[#a0a0a0] transition-opacity duration-500 sm:text-xs ${
                    galleryOverlapped ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  Stacked — edge mismatch shows the squircle on top
                </p>
              </div>
            )}

            {slide === 2 && (
              <div className="flex w-full max-w-3xl flex-col items-center gap-3">
                <div className="flex w-full items-end justify-center gap-6 sm:gap-10 md:gap-12">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <button
                      type="button"
                      className="rounded-xl border-0 bg-[#f1f1f1] px-8 py-2.5 text-sm font-medium text-black transition-colors hover:bg-black/[0.06] sm:px-9 sm:py-3 sm:text-base"
                    >
                      Continue
                    </button>
                    <span className="font-mono text-[10px] text-[#b0b0b0] sm:text-xs">
                      CSS border-radius
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <smooth-div
                      radius={12}
                      className="inline-block bg-[#f1f1f1] transition-colors hover:bg-black/[0.06]"
                    >
                      <button
                        type="button"
                        className="grid cursor-default place-items-center border-0 bg-transparent px-8 py-2.5 text-sm font-medium text-black sm:px-9 sm:py-3 sm:text-base [&>span]:col-start-1 [&>span]:row-start-1"
                      >
                        <span className="pointer-events-none invisible whitespace-nowrap" aria-hidden>
                          Continue
                        </span>
                        <span className="whitespace-nowrap">Continue</span>
                      </button>
                    </smooth-div>
                    <span className="font-mono text-[10px] text-[#b0b0b0] sm:text-xs">
                      smooth-div · same padding
                    </span>
                  </div>
                </div>
              </div>
            )}

            {slide === 3 && (
              <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-12">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="flex h-[6.5rem] w-44 items-center justify-center bg-white text-xs font-medium text-[#8a8a8a] sm:h-32 sm:w-48 sm:text-sm"
                    style={{ borderRadius: 22, border: "2px solid rgba(0,0,0,0.14)" }}
                  >
                    CSS border
                  </div>
                  <span className="max-w-[12rem] text-center font-mono text-[10px] leading-tight text-[#b0b0b0] sm:text-xs">
                    border + radius
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <smooth-div
                    radius={22}
                    className="flex h-[6.5rem] w-44 items-center justify-center bg-white text-xs font-medium text-[#8a8a8a] sm:h-32 sm:w-48 sm:text-sm"
                    style={{
                      "--smooth-div-stroke-width": "2",
                      "--smooth-div-stroke-color": "rgba(0,0,0,0.14)",
                    }}
                  >
                    Stroke
                  </smooth-div>
                  <span className="max-w-[12rem] text-center font-mono text-[10px] leading-tight text-[#b0b0b0] sm:text-xs">
                    --smooth-div-stroke-*
                  </span>
                </div>
              </div>
            )}

            {slide === 4 && (
              <div className="flex w-full max-w-xl flex-wrap justify-center gap-6 sm:gap-10">
                {[
                  { s: 0.15, label: "0.15" },
                  { s: 0.6, label: "0.6" },
                  { s: 1, label: "1" },
                ].map(({ s, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <smooth-div
                      radius={18}
                      smoothness={s}
                      className="flex h-[4.25rem] w-[4.25rem] items-center justify-center bg-[#f1f1f1] text-[10px] font-medium text-[#8a8a8a] sm:h-20 sm:w-20 sm:text-xs"
                    >
                      {label}
                    </smooth-div>
                    <span className="font-mono text-[10px] text-[#b0b0b0] sm:text-xs">
                      smooth {label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </smooth-div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <smooth-div className="inline-block bg-[#f1f1f1] transition-colors hover:bg-black/[0.06] active:scale-95">
            <button
              type="button"
              disabled={isFirst}
              onClick={() => go(-1)}
              className="cursor-pointer border-0 bg-transparent px-8 py-2.5 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>
          </smooth-div>
          <smooth-div
            className={`inline-block bg-[#f1f1f1] transition-colors hover:bg-black/[0.06] active:scale-95 ${
              overlapNavDisabled ? "pointer-events-none opacity-40" : ""
            }`}
          >
            <button
              type="button"
              disabled={overlapNavDisabled}
              onClick={toggleGalleryOverlap}
              aria-pressed={slide < 2 && galleryOverlapped}
              className="grid cursor-pointer place-items-center border-0 bg-transparent px-8 py-2.5 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-40 [&>span]:col-start-1 [&>span]:row-start-1"
            >
              <span className="pointer-events-none invisible whitespace-nowrap" aria-hidden>
                Separate
              </span>
              <span className="whitespace-nowrap">
                {overlapNavDisabled ? "Overlay" : galleryOverlapped ? "Separate" : "Overlay"}
              </span>
            </button>
          </smooth-div>
          <smooth-div className="inline-block bg-[#f1f1f1] transition-colors hover:bg-black/[0.06] active:scale-95">
            <button
              type="button"
              disabled={isLast}
              onClick={() => go(1)}
              className="cursor-pointer border-0 bg-transparent px-8 py-2.5 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </smooth-div>
        </div>
      </div>
    </section>
  );
}
