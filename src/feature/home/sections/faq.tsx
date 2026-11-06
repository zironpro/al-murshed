"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  heading?: string;
  intro?: string;
  items?: FaqItem[];
  /** Index of the item that starts open. Use -1 to start with all closed. */
  defaultOpen?: number;
}

// Sample questions. Replace with Al Murshed's real FAQs.
const defaultItems: FaqItem[] = [
  {
    question: "What happens in the first consultation?",
    answer:
      "We listen to the facts of your matter, review any documents you bring, and explain your options and likely next steps in plain language. You decide whether to go ahead with us.",
  },
  {
    question: "How are your fees structured?",
    answer:
      "Fees depend on the type and complexity of the matter. After the first consultation we give you a clear explanation of how we will charge before any work begins.",
  },
  {
    question: "Is what I tell you kept confidential?",
    answer:
      "Yes. Conversations with our legal team are treated as confidential from the first contact, whether or not you later instruct us.",
  },
  {
    question: "How long will my case take?",
    answer:
      "It varies widely. A contract review may take days, while a dispute can take months. We give you a realistic timeline once we understand your matter and keep you updated as it moves.",
  },
  {
    question: "Which areas of law do you cover?",
    answer:
      "We advise on arbitration, banking and finance, commercial matters, criminal defense, family law, intellectual property and more. See our Services page for the full list.",
  },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4a2a08]";

const css = `
/* ---------- Entrance animation (plays once when seen) ---------- */
.fq-up {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity .8s cubic-bezier(.22, 1, .36, 1) var(--d, 0s),
    transform .8s cubic-bezier(.22, 1, .36, 1) var(--d, 0s);
}
.fq-seen .fq-up {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .fq-up {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
`;

const d = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

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

export default function FaqSection({
  heading = "Frequently asked questions",
  intro = "Quick answers to what clients ask us most often.",
  items = defaultItems,
  defaultOpen = 0,
}: FaqSectionProps) {
  // Only one item can be open: opening another replaces this value,
  // which closes the previous one.
  const [openIndex, setOpenIndex] = useState<number>(defaultOpen);
  const baseId = useId();
  const [ref, seen] = useSeen<HTMLDivElement>(0.15);

  if (!items.length) return null;

  return (
    <section
      aria-labelledby={`${baseId}-title`}
      className="bg-[#F9F3EA] px-5 py-16 text-[#4a2a08] md:px-10 md:py-24 lg:px-14 xl:py-28 2xl:px-20"
    >
      <style>{css}</style>

      <div
        ref={ref}
        className={`mx-auto max-w-3xl xl:max-w-4xl 2xl:max-w-5xl ${seen ? "fq-seen" : ""}`}
      >
        <div className="text-center">
          <h2
            id={`${baseId}-title`}
            style={d(0)}
            className="fq-up text-[clamp(28px,3.2vw,48px)] font-medium leading-[1.1] tracking-tight [text-wrap:balance]"
          >
            {heading}
          </h2>
          <p
            style={d(0.12)}
            className="fq-up mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#5a4d3d] md:text-base"
          >
            {intro}
          </p>
        </div>

        <ul className="mt-10 border-b border-[#4a2a08]/20 md:mt-14">
          {items.map(({ question, answer }, i) => {
            const open = openIndex === i;
            const buttonId = `${baseId}-btn-${i}`;
            const panelId = `${baseId}-panel-${i}`;

            return (
              <li
                key={question}
                style={d(0.25 + Math.min(i, 6) * 0.08)}
                className="fq-up border-t border-[#4a2a08]/20"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    className={`flex w-full items-center justify-between gap-6 py-5 text-left md:py-6 ${focusRing}`}
                  >
                    <span className="text-base font-medium md:text-lg xl:text-xl">
                      {question}
                    </span>

                    {/* Plus icon: fills with brown and turns white when open */}
                    <span
                      aria-hidden="true"
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 motion-reduce:transition-none md:h-10 md:w-10 ${
                        open
                          ? "border-[#4a2a08] bg-[#4a2a08] text-white"
                          : "border-[#4a2a08]/40 bg-transparent text-[#4a2a08]"
                      }`}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      >
                        <path d="M3 8h10" />
                        <path
                          d="M8 3v10"
                          className={`origin-center transition-transform duration-300 motion-reduce:transition-none ${
                            open ? "scale-y-0" : "scale-y-100"
                          }`}
                          style={{ transformBox: "fill-box" }}
                        />
                      </svg>
                    </span>
                  </button>
                </h3>

                {/* Answer: height animates between closed and open */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div
                    className={`min-h-0 overflow-hidden transition-[visibility] duration-0 ${
                      open ? "visible" : "invisible delay-300"
                    }`}
                  >
                    <p className="max-w-2xl pb-6 pr-14 text-sm leading-relaxed text-[#5a4d3d] md:text-base">
                      {answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}