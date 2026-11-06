"use client";

import { useEffect, useRef, useState } from "react";

export interface Stat {
  value: string;
  label: string;
}

export interface IntroSectionProps {
  /** Text before the highlighted phrase */
  lead?: string;
  /** Highlighted phrase (shown in dark brown) */
  highlight?: string;
  /** Text after the highlighted phrase */
  tail?: string;
  stats?: Stat[];
  /** Photo shown under the curved badge, e.g. "/hero.jpg" */
  imageSrc?: string;
  imageAlt?: string;
  /** Where the round badge scrolls to */
  scrollTargetHref?: string;
  visitHref?: string;
  visitLabel?: string;
}

// Placeholder figures taken from the design reference. Replace with Al Murshed's real numbers.
const defaultStats: Stat[] = [
  { value: "18+", label: "Years in Practice" },
  { value: "100+", label: "Legal Matters Resolved" },
  { value: "95%", label: "Client Approval" },
  { value: "6K+", label: "Clients Worldwide" },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3c2907]";

const css = `
/* ---------- Scroll-in animation: plays once when the block is seen ---------- */
.im-rv {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity .8s cubic-bezier(.22, 1, .36, 1) var(--d, 0s),
    transform .8s cubic-bezier(.22, 1, .36, 1) var(--d, 0s);
}

.im-seen .im-rv {
  opacity: 1;
  transform: none;
}

/* Highlighted phrase settles from muted to dark brown */
.im-hl {
  color: #6f6a52;
  transition: color .9s ease .7s;
}

.im-seen .im-hl {
  color: #3c2907;
}

/* Round badge pops in */
.im-pop {
  opacity: 0;
  transform: scale(.6);
  transition:
    opacity .7s ease .5s,
    transform .9s cubic-bezier(.34, 1.4, .64, 1) .5s;
}

.im-seen .im-pop {
  opacity: 1;
  transform: none;
}

/* Photo fades in while settling from a slight zoom */
.im-photo {
  opacity: 0;
  transform: scale(1.06);
  transition:
    opacity 1s ease,
    transform 1.6s cubic-bezier(.22, 1, .36, 1);
}

.im-seen .im-photo {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .im-rv,
  .im-pop,
  .im-photo,
  .im-hl {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .im-hl { color: #3c2907; }
}
`;

/** Becomes true the first time the element scrolls into view. */
function useSeen<T extends HTMLElement>(threshold = 0.2) {
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

/** Counts "18+", "95%", "6K+" up from 0 once `start` is true. */
function CountUp({ value, start }: { value: string; start: boolean }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!match || !start) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }

    const duration = 1400;
    const t0 = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, target]);

  // Not a number (e.g. "N/A"): show as is
  if (!match) return <>{value}</>;

  return (
    <>
      {n}
      {suffix}
    </>
  );
}

export default function IntroSection({
  lead = "At Al Murshed, We Deliver Smart Legal Solutions Through Expertise, Precision, And A Client",
  highlight = "Focused Mindset.",
  tail = "Backed By Integrity And Results, We Support You Every Step Of The Way.",
  stats = defaultStats,
  imageSrc = "/images/lawyer.png",
  imageAlt = "Al Murshed legal consultants in Abu Dhabi",
  scrollTargetHref = "#practices",
}: IntroSectionProps) {
  const [textRef, textSeen] = useSeen<HTMLDivElement>(0.25);
  const [photoRef, photoSeen] = useSeen<HTMLDivElement>(0.2);

  return (
    <section aria-label="Introduction" className="w-full bg-[#f7f1e6] text-[#3c2907]">
      <style>{css}</style>

      {/* Text + stats. z-10 lets the round badge overlap the photo below. */}
      <div
        ref={textRef}
        className={`relative z-10 bg-[#f7f1e6] px-5 pb-20 pt-10 md:px-10 md:pb-28 md:pt-16 lg:px-14 ${
          textSeen ? "im-seen" : ""
        }`}
      >
        <h2 className="im-rv mx-auto max-w-4xl text-center text-xl font-normal leading-snug text-[#6f6a52] [text-wrap:balance] md:text-3xl md:leading-snug lg:text-4xl lg:leading-snug">
          {lead} <span className="im-hl font-medium">{highlight}</span> {tail}
        </h2>

        <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-y-6 md:mt-12 md:grid-cols-4 md:gap-y-0">
          {stats.map(({ value, label }, i) => (
            <li
              key={label}
              style={{ ["--d" as string]: `${0.25 + i * 0.12}s` }}
              className={`im-rv border-l border-[#3c2907]/25 px-4 md:px-6 ${
                i === stats.length - 1 ? "md:border-r" : ""
              } ${i % 2 === 1 ? "max-md:border-r" : ""}`}
            >
              <p className="text-lg font-medium leading-none tabular-nums md:text-2xl">
                <CountUp value={value} start={textSeen} />
              </p>
              <p className="mt-1.5 text-[10px] leading-tight text-[#6f6a52] md:text-xs">
                {label}
              </p>
            </li>
          ))}
        </ul>

        {/* Round scroll badge sitting on the seam between text and photo */}
        <a
          href={scrollTargetHref}
          aria-label="Scroll to the next section"
          className={`absolute bottom-0 left-1/2 flex h-32 w-32 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-[#f7f1e6] md:h-44 md:w-44 ${focusRing}`}
        >
          <span className="im-pop relative flex h-24 w-24 items-center justify-center rounded-full bg-[#3c2907] text-[#f7f1e6] md:h-32 md:w-32">
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full animate-spin [animation-duration:24s] motion-reduce:animate-none"
            >
              <defs>
                <path
                  id="scroll-ring"
                  d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
                />
              </defs>
              <text
                fill="currentColor"
                fontSize="8.5"
                fontWeight="500"
                letterSpacing="0.5"
              >
                <textPath
                  href="#scroll-ring"
                  textLength="236"
                  lengthAdjust="spacing"
                >
                  SCROLL DOWN • AL MURSHED • LEGAL CONSULTANCY •
                </textPath>
              </text>
            </svg>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-7 w-7 md:h-9 md:w-9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v17M6 14.5l6 6 6-6" />
            </svg>
          </span>
        </a>
      </div>

      {/* Photo */}
      <div
        ref={photoRef}
        className={`relative overflow-hidden ${photoSeen ? "im-seen" : ""}`}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="im-photo h-[360px] w-full object-cover object-top md:h-[560px] lg:h-[680px]"
        />
      </div>
    </section>
  );
}