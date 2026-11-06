"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

export interface ImageCard {
  src: string;
  alt: string;
  title: string;
  text?: string;
}

export interface AboutPageProps {
  heading?: string;
  intro?: string;
  featureCards?: ImageCard[];
}

const defaultFeatureCards: ImageCard[] = [
  {
    src: "/images/litigation.png",
    alt: "Lawyer reviewing legal documents",
    title: "Litigation",
    text: "Representing clients in court and before tribunals.",
  },
  {
    src: "/images/corporate.png",
    alt: "Corporate legal professional",
    title: "Corporate",
    text: "Advice on company law, contracts and transactions.",
  },
  {
    src: "/images/family-law.png",
    alt: "Legal consultant",
    title: "Family Law",
    text: "Guidance on family matters, handled with care.",
  },
];

const css = `
/* ---------- Entrance animations (play once when seen) ---------- */

/* Heading: each word rises out of a hidden edge */
.ab-w {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  padding-bottom: .12em;
  margin-bottom: -.12em;
}
.ab-w > span {
  display: inline-block;
  transform: translateY(110%);
  transition: transform .9s cubic-bezier(.22, 1, .36, 1) var(--d, 0s);
}
.ab-seen .ab-w > span {
  transform: none;
}

/* Generic fade-up */
.ab-up {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity .8s cubic-bezier(.22, 1, .36, 1) var(--d, 0s),
    transform .8s cubic-bezier(.22, 1, .36, 1) var(--d, 0s);
}
.ab-seen .ab-up {
  opacity: 1;
  transform: none;
}

/* Divider line draws from the left */
.ab-line {
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1.2s cubic-bezier(.22, 1, .36, 1) var(--d, 0s);
}
.ab-seen .ab-line {
  transform: none;
}

/* Image cards: unveiled upward, image settles from a slight zoom */
.ab-card {
  clip-path: inset(100% 0 0 0 round .5rem);
  transition: clip-path 1.1s cubic-bezier(.22, 1, .36, 1) var(--d, 0s);
}
.ab-seen .ab-card {
  clip-path: inset(0 0 0 0 round .5rem);
}
.ab-card img {
  transform: scale(1.18);
  transition: transform 1.6s cubic-bezier(.22, 1, .36, 1) var(--d, 0s);
}
.ab-seen .ab-card img {
  transform: none;
}
/* hover zoom once the reveal is done */
.ab-seen .ab-card:hover img {
  transform: scale(1.05);
  transition-delay: 0s;
  transition-duration: .7s;
}
.ab-cap {
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity .7s ease calc(var(--d, 0s) + .6s),
    transform .7s cubic-bezier(.22, 1, .36, 1) calc(var(--d, 0s) + .6s);
}
.ab-seen .ab-cap {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .ab-w > span,
  .ab-up,
  .ab-line,
  .ab-card,
  .ab-card img,
  .ab-cap {
    transform: none !important;
    opacity: 1 !important;
    clip-path: none !important;
    transition: none !important;
  }
}
`;

const d = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

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

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="ab-w">
            <span style={d(i * 0.06)}>{word}</span>
          </span>{" "}
        </span>
      ))}
    </>
  );
}

export default function AboutPage({
  heading = "Legal advice built on trust, experience and clear communication",
  intro = "Al Murshed is a legal consultancy in Abu Dhabi. We advise businesses and individuals with bespoke, seamless service, and we stand by our clients at every step.",
  featureCards = defaultFeatureCards,
}: AboutPageProps) {
  const [introRef, introSeen] = useSeen<HTMLDivElement>(0.2);
  const [featRef, featSeen] = useSeen<HTMLDivElement>(0.15);

  // Gentle wave: the middle card sits a little lower on large screens
  const offsets = ["0px", "40px", "0px"];

  return (
    <div className="min-h-screen bg-[#f7f1e6] text-[#3c2907]">
      <style>{css}</style>

      <main className="mx-auto max-w-[1250px] px-5 md:px-10 lg:px-14 xl:max-w-[1440px] 2xl:max-w-[1640px] 2xl:px-20">
        {/* Intro: centered heading with the description under it */}
        <section
          ref={introRef}
          className={`pb-12 pt-14 md:pb-16 md:pt-20 ${introSeen ? "ab-seen" : ""}`}
        >
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-[clamp(28px,3.8vw,54px)] font-medium leading-[1.08] tracking-tight [text-wrap:balance]">
              <Words text={heading} />
            </h1>

            <p
              style={d(0.5)}
              className="ab-up mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#6f6a52] md:text-base"
            >
              {intro}
            </p>
          </div>

          <div
            style={d(0.4)}
            className="ab-line mt-10 h-px w-full bg-[#3c2907]/25 md:mt-14"
          />
        </section>

        {/* Feature cards: three images, middle one slightly lower */}
        <section
          ref={featRef}
          aria-label="Areas of work"
          className={`pb-20 md:pb-28 ${featSeen ? "ab-seen" : ""}`}
        >
          <div className="grid gap-4 sm:grid-cols-3 lg:items-start lg:gap-6">
            {featureCards.map(({ src, alt, title, text }, i) => (
              <figure
                key={title}
                style={{ ...d(i * 0.15), ["--mt" as string]: offsets[i] ?? "0px" }}
                className="ab-card group relative h-56 overflow-hidden rounded-lg bg-[#3c2907] sm:h-[300px] lg:h-[340px] xl:h-[400px] 2xl:h-[460px] lg:mt-[var(--mt)]"
              >
                <img
                  src={src}
                  alt={alt}
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#3c2907]/85 via-[#3c2907]/10 to-transparent"
                />
                <figcaption
                  style={d(i * 0.15)}
                  className="ab-cap absolute inset-x-0 bottom-0 p-5 text-[#f7f1e6] md:p-6"
                >
                  <span className="block text-lg font-medium md:text-xl">
                    {title}
                  </span>
                  {text && (
                    <span className="mt-1.5 block max-w-[28ch] text-xs leading-snug text-[#f7f1e6]/80 md:text-sm">
                      {text}
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}