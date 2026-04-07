import { useCallback, useEffect, useState } from "react";
import { ComparisonOverlap } from "./components/ComparisonOverlap";
import { ShowcaseGrid } from "./components/ShowcaseGrid";
import { InstallSection } from "./components/InstallSection";
import { UsageSection } from "./components/UsageSection";
import { ApiSection } from "./components/ApiSection";
import { PromptsSection } from "./components/PromptsSection";
import { Footer } from "./components/Footer";
import { Playground } from "./components/Playground";

const NAV_ITEMS = [
  { id: "installation", label: "Installation" },
  { id: "demo", label: "Interactive Demo" },
  { id: "showcase", label: "Shape Gallery" },
  { id: "usage", label: "Usage" },
  { id: "api", label: "API Reference" },
  { id: "browser-support", label: "Browser Support" },
  { id: "borders", label: "Borders" },
  { id: "ssr", label: "SSR" },
  { id: "prompts", label: "Prompts" },
] as const;

function useActiveSection() {
  const [active, setActive] = useState<string>("installation");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

function normalizePathname(pathname: string) {
  let p = pathname;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

function useSitePath() {
  const [pathname, setPathname] = useState(() => normalizePathname(window.location.pathname));

  useEffect(() => {
    const onPop = () => setPathname(normalizePathname(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    const next = normalizePathname(to);
    window.history.pushState(null, "", next === "/" ? "/" : next);
    setPathname(next);
  }, []);

  return { pathname, navigate };
}

export default function App() {
  const active = useActiveSection();
  const { pathname, navigate } = useSitePath();
  const isPlayground = pathname === "/playground";

  if (isPlayground) {
    return <Playground onBack={() => navigate("/")} />;
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen hidden w-60 flex-shrink-0 flex-col py-14 pl-10 pr-6 md:flex">
        <div className="mb-10">
          <span className="font-mono text-sm font-medium text-black">smooth-div</span>
        </div>

        <nav className="flex flex-col gap-0.5 text-sm">
          {NAV_ITEMS.map(({ id, label }) => (
            <smooth-div
              key={id}
              radius={8}
              className={active === id ? "bg-[#f1f1f1]" : "transition-colors hover:bg-black/[0.04]"}
            >
              <button
                type="button"
                onClick={() => scrollTo(id)}
                className={`w-full cursor-pointer border-0 bg-transparent px-3 py-2 text-left text-sm transition-colors ${
                  active === id
                    ? "font-medium text-black"
                    : "text-[#8a8a8a] hover:text-black"
                }`}
              >
                {label}
              </button>
            </smooth-div>
          ))}
        </nav>

        {/* Bottom links */}
        <div className="mt-auto flex flex-col gap-3 pt-6">
          <a
            href="https://github.com/jeiwinfrey/smooth-div"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-[#a0a0a0] transition-colors hover:text-black"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/smooth-div"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-[#a0a0a0] transition-colors hover:text-black"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" />
            </svg>
            npm
          </a>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex justify-center px-6 py-14 md:pl-72 lg:py-16">
        <div className="w-full max-w-2xl">
          {/* Hero */}
          <header className="mb-20">
            <div className="mb-8">
              <div className="mb-6 font-mono text-sm font-medium text-black md:hidden">smooth-div</div>
              <div className="mb-3 flex items-center gap-3">
                <smooth-div radius={6} className="inline-block font-mono text-xs text-[#a0a0a0] bg-[#f1f1f1] px-2 py-1">
                  for better-looking web
                </smooth-div>
              </div>
              <h1 className="font-serif text-4xl text-black lg:text-5xl leading-tight">
                Squircle corners<br />for any framework.
              </h1>
            </div>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-[#7e7e7e]">
              A framework-agnostic custom element that applies iOS-style
              continuous squircle curves to any container. Automatic radius
              calculation, no Shadow DOM, graceful fallback.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <smooth-div className="inline-block bg-black shadow-sm transition-all hover:opacity-80 active:scale-95">
                  <a
                    href="/playground"
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                      e.preventDefault();
                      navigate("/playground");
                    }}
                    className="inline-flex cursor-pointer items-center border-0 bg-transparent px-6 py-2.5 text-sm font-medium text-white no-underline"
                  >
                    Playground
                  </a>
                </smooth-div>
                <smooth-div className="inline-block bg-[#f1f1f1] transition-colors hover:bg-black/[0.06] active:scale-95">
                  <a
                    href="https://github.com/jeiwinfrey/smooth-div"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent px-6 py-2.5 text-sm font-medium text-black no-underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="shrink-0 opacity-70"
                      aria-hidden
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                    </svg>
                    GitHub
                  </a>
                </smooth-div>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {["React", "Vue", "Svelte", "Solid", "HTML"].map((f) => (
                  <smooth-div
                    key={f}
                    radius={8}
                    smoothness={0.4}
                    className="inline-block bg-[#fafafa] px-3 py-1 text-xs text-[#7e7e7e] transition-colors hover:bg-[#f0f0f0]"
                  >
                    {f}
                  </smooth-div>
                ))}
              </div>
            </div>
          </header>

          {/* Sections */}
          <div className="flex flex-col gap-24">
            <InstallSection />
            <ComparisonOverlap />
            <ShowcaseGrid />
            <UsageSection />
            <ApiSection />
            <PromptsSection />
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}