'use client';

import { useEffect, useId, useRef, useState } from "react";

export interface Practice {
  label: string;
  href: string;
}

export interface PracticesSectionProps {
  title?: string;
  tagline?: string;
  practices?: Practice[];
  /** How many practices show before "Show more" */
  initialCount?: number;
}

// Practice areas and links from almursheduae.com
const defaultPractices: Practice[] = [
  { label: "Arbitration", href: "/arbitration/" },
  { label: "Banking & Finance", href: "/banking-finance/" },
  { label: "Capital Market", href: "/capital-market/" },
  { label: "Commercial Matters", href: "/commercial/" },
  { label: "Construction and Infrastructure", href: "/construction-and-infrastructure/" },
  { label: "Corporate / Mergers and Acquisitions", href: "/corporate-mergers-and-acquisitions/" },
  { label: "Criminal Defense", href: "/criminal-defense/" },
  { label: "Dispute Resolution and Litigation", href: "/dispute-resolution-and-litigation/" },
  { label: "Employment and Incentives", href: "/employment-and-incentives/" },
  { label: "Family Business", href: "/family-business/" },
  { label: "Family Law", href: "/family-law/" },
  { label: "Financial Crime", href: "/financial-crime/" },
  { label: "Insurance Law", href: "/insurance-law/" },
  { label: "Intellectual Property", href: "/intellectual-property/" },
  { label: "International Law and Conflict of Laws", href: "/international-law-and-conflict-of-laws/" },
  { label: "Mediation", href: "/mediation/" },
  { label: "Private Notary", href: "/private-notary/" },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3c2907]";

const css = `
/* ---------- Scroll-in animation: plays once when the section is seen ---------- */
.pr-head {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity .8s cubic-bezier(.22, 1, .36, 1) var(--d, 0s),
    transform .8s cubic-bezier(.22, 1, .36, 1) var(--d, 0s);
}

.pr-seen .pr-head {
  opacity: 1;
  transform: none;
}

/* List rows: hidden until seen, then slide up one after another.
   Uses a keyframe animation so rows added by "Show more" animate too. */
.pr-row {
  opacity: 0;
}

.pr-seen .pr-row {
  animation: pr-in .7s cubic-bezier(.22, 1, .36, 1) var(--d, 0s) both;
}

/* The button fades in after the list */
.pr-seen .pr-btn {
  animation: pr-in .7s cubic-bezier(.22, 1, .36, 1) var(--d, 0s) both;
}
.pr-btn {
  opacity: 0;
}

@keyframes pr-in {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .pr-head,
  .pr-row,
  .pr-btn {
    opacity: 1;
    transform: none;
    transition: none;
    animation: none !important;
  }
}
`;

/** Becomes true the first time the element scrolls into view. */
function useSeen<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, seen] as const;
}

export default function PracticesSection({
  title = "Practices",
  tagline = "Crafting solutions and empowering success. It’s more than just law.",
  practices = defaultPractices,
  initialCount = 8,
}: PracticesSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const [gridRef, seen] = useSeen<HTMLDivElement>(0.15);
  const visible = expanded ? practices : practices.slice(0, initialCount);
  const canToggle = practices.length > initialCount;

  return (
    <section
      id="practices"
      aria-labelledby={`${listId}-title`}
      className="scroll-mt-[72px] bg-[#f7f1e6] px-5 pb-16 pt-28 text-[#3c2907] md:px-10 md:pb-24 md:pt-40 lg:px-14"
    >
      <style>{css}</style>

      <div
        ref={gridRef}
        className={`grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 ${
          seen ? "pr-seen" : ""
        }`}
      >
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2
            id={`${listId}-title`}
            className="pr-head text-4xl font-medium leading-none tracking-tight md:text-6xl"
          >
            {title}
          </h2>
          <p
            style={{ ["--d" as string]: ".15s" }}
            className="pr-head mt-5 max-w-sm text-base leading-relaxed text-[#6f6a52] md:text-lg"
          >
            {tagline}
          </p>
        </div>

        <div>
          <ul id={listId} className="border-b border-[#3c2907]/20">
            {visible.map(({ label, href }, i) => {
              // First batch staggers from the start; rows added by
              // "Show more" stagger from zero so they don't wait.
              const step = i < initialCount ? i : i - initialCount;
              const base = i < initialCount ? 0.25 : 0;
              return (
                <li
                  key={href}
                  style={{ ["--d" as string]: `${base + step * 0.07}s` }}
                  className="pr-row border-t border-[#3c2907]/20"
                >
                  <a
                    href={href}
                    className={`group flex items-center justify-between gap-6 py-5 text-lg font-medium md:py-6 md:text-2xl ${focusRing}`}
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-2 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                      {label}
                    </span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 12 12"
                      className="h-4 w-4 shrink-0 opacity-50 transition-opacity group-hover:opacity-100 motion-reduce:transition-none md:h-5 md:w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 9l6-6M4 3h5v5" />
                    </svg>
                  </a>
                </li>
              );
            })}
          </ul>

          {canToggle && (
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={listId}
              onClick={() => setExpanded((e) => !e)}
              style={{ ["--d" as string]: `${0.25 + initialCount * 0.07}s` }}
              className={`pr-btn mt-8 inline-flex items-center gap-2 bg-[#3c2907] px-5 py-3 text-sm font-medium text-[#f7f1e6] transition-colors hover:bg-[#523a0d] ${focusRing}`}
            >
              {expanded ? "Show less" : "Show more"}
              <svg
                aria-hidden="true"
                viewBox="0 0 12 12"
                className={`h-3 w-3 transition-transform motion-reduce:transition-none ${
                  expanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 4.5L6 8l3.5-3.5" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}