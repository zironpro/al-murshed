"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

export interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string; // e.g. "12 Oct 2026"
  readTime?: string; // e.g. "5 min read"
  href: string;
  image: string; // cover image path, e.g. "/blog/first-24-hours.jpg"
  imageAlt?: string; // leave empty if the image is purely decorative
}

export interface BlogSectionProps {
  heading?: string;
  intro?: string;
  posts?: BlogPost[];
  viewAll?: { label: string; href: string };
}

// Sample posts. Replace the titles, text and images with the real articles.
const defaultPosts: BlogPost[] = [
  {
    title: "What to do in the first 24 hours after a commercial dispute begins",
    excerpt:
      "The steps you take early decide how strong your position is later. Here is what to document, who to notify and what to avoid saying.",
    category: "Dispute Resolution",
    date: "28 Oct 2026",
    readTime: "6 min read",
    href: "/insights/articles/first-24-hours-commercial-dispute",
    image: "/blogs/commercial-dispute.png",
  },
  {
    title: "Arbitration or litigation: choosing the right forum",
    excerpt:
      "Cost, speed, confidentiality and enforcement all point in different directions. A plain comparison for business owners.",
    category: "Arbitration",
    date: "14 Oct 2026",
    readTime: "5 min read",
    href: "/insights/articles/arbitration-or-litigation",
    image: "/blogs/arbitration-litigation.png",
  },
  {
    title: "Understanding your rights during a financial crime investigation",
    excerpt:
      "What authorities can request, what you can refuse, and when to bring in counsel.",
    category: "Financial Crime",
    date: "02 Oct 2026",
    readTime: "4 min read",
    href: "/insights/articles/rights-financial-crime-investigation",
    image: "/blogs/financial-crime.png",
  },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4a2a08]";

const css = `
/* ---------- Entrance animations (play once when seen) ---------- */
.bl-up {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity .8s cubic-bezier(.22, 1, .36, 1) var(--d, 0s),
    transform .8s cubic-bezier(.22, 1, .36, 1) var(--d, 0s);
}
.bl-seen .bl-up {
  opacity: 1;
  transform: none;
}

/* Cover images are unveiled upward and settle from a slight zoom */
.bl-img {
  clip-path: inset(100% 0 0 0 round .5rem);
  transition: clip-path 1.1s cubic-bezier(.22, 1, .36, 1) var(--d, 0s);
}
.bl-seen .bl-img {
  clip-path: inset(0 0 0 0 round .5rem);
}
.bl-img img {
  transform: scale(1.18);
  transition: transform 1.6s cubic-bezier(.22, 1, .36, 1) var(--d, 0s);
}
.bl-seen .bl-img img {
  transform: none;
}
/* hover zoom once the reveal is done */
.bl-seen .bl-card:hover .bl-img img {
  transform: scale(1.05);
  transition-delay: 0s;
  transition-duration: .7s;
}

/* ---------- Interaction animations ---------- */

/* "View all" button: fill sweeps in from the left */
.bl-btn {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}
.bl-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: #4a2a08;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .5s cubic-bezier(.22, 1, .36, 1);
}
.bl-btn:hover::before,
.bl-btn:focus-visible::before {
  transform: scaleX(1);
}
.bl-btn-label {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  transition: color .35s ease;
}
.bl-btn:hover .bl-btn-label,
.bl-btn:focus-visible .bl-btn-label {
  color: #F9F3EA;
}

/* Card title: underline draws across, following wrapped lines */
.bl-title {
  background-image: linear-gradient(currentColor, currentColor);
  background-repeat: no-repeat;
  background-position: 0 100%;
  background-size: 0% 1px;
  padding-bottom: 2px;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  transition: background-size .6s cubic-bezier(.22, 1, .36, 1);
}
.bl-card:hover .bl-title,
.bl-card:focus-within .bl-title {
  background-size: 100% 1px;
}

/* "Read article" link: underline draws in from the left */
.bl-read {
  background-image: linear-gradient(currentColor, currentColor);
  background-repeat: no-repeat;
  background-position: 0 100%;
  background-size: 0% 1px;
  padding-bottom: 2px;
  transition: background-size .45s cubic-bezier(.22, 1, .36, 1);
}
.bl-card:hover .bl-read,
.bl-card:focus-within .bl-read {
  background-size: 100% 1px;
}

/* Category badge nudges up while its card is hovered */
.bl-badge {
  transition: transform .4s cubic-bezier(.22, 1, .36, 1);
}
.bl-card:hover .bl-badge,
.bl-card:focus-within .bl-badge {
  transform: translateY(-3px);
}

@media (prefers-reduced-motion: reduce) {
  .bl-up,
  .bl-img,
  .bl-img img {
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
    transition: none !important;
  }
  .bl-btn::before,
  .bl-btn-label,
  .bl-title,
  .bl-read,
  .bl-badge {
    transition: none !important;
  }
  .bl-badge {
    transform: none !important;
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

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l6-6M4 3h5v5" />
    </svg>
  );
}

export default function BlogSection({
  heading = "Legal insights from our team",
  intro = "Practical guidance on the matters our clients ask about most.",
  posts = defaultPosts,
  viewAll = { label: "View all articles", href: "/insights/articles" },
}: BlogSectionProps) {
  const [headRef, headSeen] = useSeen<HTMLDivElement>(0.3);
  const [gridRef, gridSeen] = useSeen<HTMLDivElement>(0.12);

  if (!posts.length) return null;

  return (
    <section
      aria-labelledby="blog-heading"
      className="bg-[#F9F3EA] px-5 py-16 text-[#4a2a08] md:px-10 md:py-24 lg:px-14 xl:py-28 2xl:px-20"
    >
      <style>{css}</style>

      <div className="mx-auto max-w-[1250px] xl:max-w-[1440px] 2xl:max-w-[1640px]">
        {/* Heading row */}
        <div
          ref={headRef}
          className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between ${
            headSeen ? "bl-seen" : ""
          }`}
        >
          <div className="max-w-2xl">
            <h2
              id="blog-heading"
              style={d(0)}
              className="bl-up text-[clamp(28px,3.2vw,48px)] font-medium leading-[1.1] tracking-tight [text-wrap:balance]"
            >
              {heading}
            </h2>
            <p
              style={d(0.12)}
              className="bl-up mt-4 text-sm leading-relaxed text-[#5a4d3d] md:text-base"
            >
              {intro}
            </p>
          </div>

          <a
            href={viewAll.href}
            style={d(0.24)}
            className={`bl-up bl-btn group inline-flex items-center border border-[#4a2a08] px-5 py-3 text-sm font-medium sm:self-auto self-start ${focusRing}`}
          >
            <span className="bl-btn-label">
              {viewAll.label}
              <Arrow />
            </span>
          </a>
        </div>

        {/* Posts: every card leads with its image */}
        <div
          ref={gridRef}
          className={`mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 md:mt-14 lg:grid-cols-3 lg:gap-x-8 xl:gap-x-10 ${
            gridSeen ? "bl-seen" : ""
          }`}
        >
          {posts.map((post, i) => {
            const delay = Math.min(i, 5) * 0.14;
            return (
              <article key={post.href} className="bl-card group">
                <a href={post.href} className={`block ${focusRing}`}>
                  <div
                    style={d(delay)}
                    className="bl-img relative aspect-[4/3] overflow-hidden rounded-lg bg-[#4a2a08]"
                  >
                    <img
                      src={post.image}
                      alt={post.imageAlt ?? ""}
                      className="h-full w-full object-cover"
                    />
                    <span className="bl-badge absolute left-4 top-4 rounded-full bg-[#F9F3EA] px-3 py-1 text-xs font-medium text-[#4a2a08]">
                      {post.category}
                    </span>
                  </div>

                  <div style={d(delay + 0.45)} className="bl-up mt-5">
                    <div className="flex items-center gap-4 text-xs text-[#5a4d3d] md:text-sm">
                      <span>{post.date}</span>
                      {post.readTime && <span>{post.readTime}</span>}
                    </div>

                    <h3 className="mt-3 text-lg font-medium leading-snug md:text-xl xl:text-2xl">
                      <span className="bl-title">{post.title}</span>
                    </h3>

                    <p className="mt-3 max-w-prose text-sm leading-relaxed text-[#5a4d3d] md:text-base">
                      {post.excerpt}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
                      <span className="bl-read">Read article</span>
                      <Arrow />
                    </span>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}