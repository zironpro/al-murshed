"use client";

import React, { useEffect, useState } from "react";

const css = `
.lh {
  --bg: #F9F3EA;
  --brown: #4a2a08;

  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: var(--bg);
  border: none;
  text-align: center;
  padding: 64px 24px 0;
  font-family: var(--font-outfit), 'Helvetica Neue', Arial, sans-serif;
  color: #3b3226;
  box-sizing: border-box;
}

.lh * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Hero Heading */
.lh h1 {
  font-weight: 600;
  font-size: clamp(34px, 5.4vw, 60px);
  line-height: 1.12;
  letter-spacing: .01em;
  text-transform: uppercase;
  color: var(--brown);
  max-width: 850px;
  margin: 0 auto;
}

.lh .sub {
  font-size: clamp(14px, 1.15vw, 18px);
  line-height: 1.7;
  text-transform: capitalize;
  max-width: 520px;
  margin: 22px auto 0;
  color: #5a4d3d;
}

/* Consultation Button */
.lh .btn {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  margin-top: 20px;
  background: var(--brown);
  color: #fff;
  font-weight: 500;
  font-size: clamp(13px, 1vw, 16px);
  padding: 13px 24px;
  border-radius: 2px;
  text-decoration: none;
  transition: background .3s ease;
}

.lh .btn:hover {
  background: #684018;
}

/* Statue Stage */
.lh .stage {
  position: relative;
  width: calc(100% + 48px);
  min-height: 650px;
  margin: 12px -24px 0;
  overflow: hidden;
  background: var(--bg);
  border: none;
  outline: none;
}

/* Background Typography */
.lh .big {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  font-weight: 600;
  font-size: clamp(120px, 22vw, 250px);
  letter-spacing: .02em;
  color: rgba(74, 42, 8, .10);
  white-space: nowrap;
  line-height: .8;
  user-select: none;
}

/* Statue Video */
.lh .statue {
  position: relative;
  z-index: 2;
  display: block;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  background: var(--bg);
  border: none;
  outline: none;

  -webkit-mask-image: linear-gradient(
    180deg,
    transparent 0%,
    #000 15%,
    #000 90%,
    transparent 100%
  );

  mask-image: linear-gradient(
    180deg,
    transparent 0%,
    #000 15%,
    #000 90%,
    transparent 100%
  );
}

/* Information Row - TOP of Video */
.lh .info-row {
  position: absolute;
  top: 55px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;

  width: 100%;
  max-width: 1250px;
  padding: 0 55px;
}

/* Left Information */
.lh .left {
  width: 340px;
  text-align: left;
  font-size: 17px;
  line-height: 1.8;
  color: #4a3f33;
}

.lh .left b {
  color: var(--brown);
  font-weight: 600;
}

/* Right Badges */
.lh .badges {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 35px;
}

.lh .badge {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--brown);
  font-size: 14px;
  text-align: center;
  line-height: 1.5;
}

.lh .badge svg {
  width: 28px;
  height: 50px;
  flex-shrink: 0;
  fill: none;
  stroke: var(--brown);
  stroke-width: 1.2;
}

.lh .badge span {
  display: block;
  width: 85px;
  font-weight: 500;
}

/* Bottom Decorative Bar */
.lh .bar {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 46px;
  height: 3px;
  background: var(--brown);
  border-radius: 2px;
  z-index: 4;
}

/* ---------- Entrance animation (runs once on load) ---------- */
.lh .line {
  display: block;
  overflow: hidden;
  padding-bottom: .06em;
}

.lh .line > span {
  display: block;
  transform: translateY(110%);
  animation: lh-rise .9s cubic-bezier(.22, 1, .36, 1) forwards;
}

.lh .line:nth-child(2) > span {
  animation-delay: .14s;
}

.lh .sub,
.lh .btn {
  opacity: 0;
  animation: lh-fade .8s cubic-bezier(.22, 1, .36, 1) forwards;
}

.lh .sub { animation-delay: .5s; }
.lh .btn { animation-delay: .65s; }

.lh .info-row {
  opacity: 0;
  animation: lh-appear 1s ease-out .95s forwards;
}

@keyframes lh-rise {
  to { transform: translateY(0); }
}

@keyframes lh-fade {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes lh-appear {
  to { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .lh .line > span,
  .lh .sub,
  .lh .btn,
  .lh .info-row {
    animation: none;
    opacity: 1;
    transform: none;
  }
  .lh .info-row {
    transform: translateX(-50%);
  }
}

/* Tablet */
@media (max-width: 760px) {
  .lh {
    min-height: 0;            /* no forced full-screen height */
    padding: 32px 18px 0;
    background: #F9F3EA;
  }

  .lh h1 {
    font-size: clamp(30px, 8vw, 44px);
  }

  .lh .sub {
    font-size: 14px;
    max-width: 420px;
    margin-top: 14px;
  }

  .lh .btn {
    font-size: 14px;
    padding: 12px 22px;
    margin-top: 16px;
  }

  .lh .stage {
    width: calc(100% + 36px);
    min-height: 0;            /* let the video set the height */
    margin: 4px -18px 0;
    background: #F9F3EA;
  }

  /* shorter fade so less empty space at the video's top and bottom */
  .lh .statue {
    -webkit-mask-image: linear-gradient(
      180deg,
      transparent 0%,
      #000 8%,
      #000 95%,
      transparent 100%
    );
    mask-image: linear-gradient(
      180deg,
      transparent 0%,
      #000 8%,
      #000 95%,
      transparent 100%
    );
  }

  .lh .info-row {
    top: 12px;
    padding: 0 20px;
    gap: 20px;
  }

  .lh .left {
    width: 42%;
    font-size: 13px;
    line-height: 1.6;
  }

  .lh .badges {
    gap: 12px;
  }

  .lh .badge {
    font-size: 10px;
  }

  .lh .badge svg {
    width: 18px;
    height: 35px;
  }

  .lh .badge span {
    width: 58px;
  }

  .lh .big {
    font-size: 22vw;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .lh {
    padding-top: 28px;
  }

  .lh .sub {
    font-size: 13px;
    max-width: 320px;
    margin-top: 12px;
  }

  .lh .btn {
    font-size: 13px;
    padding: 12px 20px;
    margin-top: 14px;
  }

  .lh .stage {
    min-height: 0;
    margin-top: 0;
  }

  .lh .info-row {
    top: 6px;
    padding: 0 10px;
    gap: 8px;
  }

  .lh .left {
    width: 38%;
    font-size: 10px;
    line-height: 1.5;
  }

  .lh .badges {
    gap: 5px;
  }

  .lh .badge {
    font-size: 8px;
    gap: 1px;
  }

  .lh .badge svg {
    width: 12px;
    height: 28px;
  }

  .lh .badge span {
    width: 43px;
  }

  .lh .bar {
    width: 36px;
  }
}
`;

const Laurel: React.FC<{ flip?: boolean }> = ({ flip }) => (
  <svg
    viewBox="0 0 16 34"
    style={flip ? { transform: "scaleX(-1)" } : undefined}
    aria-hidden="true"
  >
    <path d="M13 3C5 7 3 17 8 31M10 8c-3 1-4 3-4 5M9 14c-3 1-4 3-3 6M9 21c-2 1-3 2-2 5" />
  </svg>
);

const Badge: React.FC<{ title: string; years: string }> = ({
  title,
  years,
}) => (
  <div className="badge">
    <Laurel />
    <span>
      {title}
      <br />
      {years}
    </span>
    <Laurel flip />
  </div>
);

export interface LawyerHeroProps {
  /** Desktop statue video, path inside /public */
  videoSrc?: string;
  /** Mobile statue video, path inside /public */
  mobileVideoSrc?: string;
  /** Screens this wide or narrower (px) get the mobile video */
  mobileBreakpoint?: number;
}

export default function LawyerHero({
  videoSrc = "/hero/main-hero.mp4",
  mobileVideoSrc = "/hero/mobile-hero.mp4",
  mobileBreakpoint = 760,
}: LawyerHeroProps) {
  // null until the browser tells us the screen size, so only ONE video is
  // ever downloaded (desktop or mobile), never both.
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [mobileBreakpoint]);

  const activeSrc = isMobile ? mobileVideoSrc : videoSrc;

  return (
    <section className="lh">
      <style>{css}</style>

      {/* Hero Heading */}
      <h1>
        <span className="line">
          <span>Your legal partner</span>
        </span>
        <span className="line">
          <span>in every situation</span>
        </span>
      </h1>

      <p className="sub">
        From complex disputes to everyday legal matters, we deliver
        strategic solutions with a client first approach.
        We stand by you to protect what matters most.
      </p>

      {/* Consultation Button */}
      <a className="btn" href="#consultation">
        Book a Free Consultation
        <span aria-hidden="true">↗</span>
      </a>

      {/* Statue Stage */}
      <div className="stage">
        {/* Statue Video */}
        {isMobile !== null && (
          <video
            key={activeSrc}
            className="statue"
            src={activeSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="Lady Justice statue"
          />
        )}

        {/* Information Row - Overlapping TOP of Video */}
        <div className="info-row">
          <p className="left">
            Our legal team brings <b>30+ years</b> of combined expertise,
            having represented clients in over{" "}
            <b>12,000 Criminal</b> matters.
          </p>

          <div className="badges">
            <Badge title="Top Advocate" years="2022-2023" />
            <Badge title="Trusted Lawyer" years="2022-2023" />
          </div>
        </div>

        {/* Bottom Decorative Bar */}
        <div className="bar" />
      </div>
    </section>
  );
}