"use client";

import React, { useEffect, useState } from "react";

const css = `
.lh {
  --bg: #F9F3EA;
  --brown: #4a2a08;

  /* statue size + how far to pull it UP to remove the empty gap on top.
     Increase --lift to move the statue higher (stage gets shorter by the same amount) */
  --stage-h: 1180px;
  --lift: 250px;
  /* cuts the empty space under the statue's base. Increase to remove more */
  --trim: 280px;

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

/* Statue Stage (fixed height, the statue fills it) */
.lh .stage {
  position: relative;
  width: calc(100% + 48px);
  height: calc(var(--stage-h) - var(--lift) - var(--trim));
  margin: 12px -24px 0;
  overflow: hidden;
  background: var(--bg);
}

/* Big "LAWYER" word behind the statue (fades out toward the bottom) */
.lh .big {
  position: absolute;
  left: 50%;
  bottom: 3%;
  transform: translateX(-50%);
  z-index: 1;
  font-weight: 600;
  font-size: clamp(90px, 20vw, 380px);
  letter-spacing: .14em;
  line-height: 1;
  white-space: nowrap;
  text-transform: uppercase;
  user-select: none;
  pointer-events: none;
  color: transparent;
  background: linear-gradient(
    180deg,
    rgba(74, 42, 8, .13) 0%,
    rgba(74, 42, 8, .06) 55%,
    rgba(74, 42, 8, 0) 90%
  );
  -webkit-background-clip: text;
  background-clip: text;
  opacity: 0;
  animation: lh-appear 1.2s ease-out .6s forwards;
}

/* Custom backdrop under the video (no CSS border): a narrow panel whose
   edge lines are drawn with gradients and fade out toward the bottom */
.lh .frame {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: var(--frame-w, 28%);
  transform: translateX(-50%);
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(rgba(74, 42, 8, .12), rgba(74, 42, 8, .12)) top / 100% 1px no-repeat,
    linear-gradient(180deg, rgba(74, 42, 8, .12), rgba(74, 42, 8, 0) 80%) left / 1px 100% no-repeat,
    linear-gradient(180deg, rgba(74, 42, 8, .12), rgba(74, 42, 8, 0) 80%) right / 1px 100% no-repeat;
  opacity: 0;
  animation: lh-appear 1.2s ease-out .4s forwards;
}

/* ---------- Statue: rises from the bottom once, then stays still ---------- */
.lh .rise {
  position: absolute;
  inset: 0;
  z-index: 2;
  opacity: 0;
  transform: translateY(45%);
  pointer-events: none;
}

.lh .rise.in {
  animation: lh-statue-rise 1.8s cubic-bezier(.16, 1, .3, 1) forwards;
}

.lh .statue {
  display: block;
  width: 100%;
  height: var(--stage-h);
  margin-top: calc(var(--lift) * -1);
  object-fit: contain;
  object-position: 50% 0%;
  background: transparent;
  border: none;
  outline: none;
}

@keyframes lh-statue-rise {
  0%   { opacity: 0; transform: translateY(45%); }
  35%  { opacity: 1; }
  100% { opacity: 1; transform: translateY(0); }
}

/* Information Row - TOP of stage */
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

/* Bottom gradient: fades the statue base + word into the page background */
.lh .stage::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 28%;
  z-index: 3;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(249, 243, 234, 0) 0%,
    rgba(249, 243, 234, .75) 60%,
    #F9F3EA 100%
  );
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

/* ---------- Text entrance animation (runs once on load) ---------- */
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
  animation: lh-appear 1s ease-out 1.2s forwards;
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
  .lh .big,
  .lh .frame {
    animation: none;
    opacity: 1;
  }
  .lh .rise,
  .lh .rise.in {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

/* Tablet */
@media (max-width: 760px) {
  .lh {
    --frame-w: 34%;
    --stage-h: 810px;
    --lift: 170px;
    --trim: 190px;
    min-height: 0;
    padding: 32px 18px 0;
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
    height: calc(var(--stage-h) - var(--lift) - var(--trim));
    margin: 4px -18px 0;
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
    font-size: 20vw;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .lh {
    --frame-w: 40%;
    --stage-h: 650px;
    --lift: 130px;
    --trim: 150px;
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
    height: calc(var(--stage-h) - var(--lift) - var(--trim));
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
  /** Desktop statue video (transparent WebM), path inside /public */
  videoSrc?: string;
  /** Mobile statue video (transparent WebM), path inside /public */
  mobileVideoSrc?: string;
  /**
   * Optional Safari fallback (HEVC with alpha, .mov / .mp4).
   * Safari can't play VP9 alpha WebM, so without this it shows a black box.
   */
  safariVideoSrc?: string;
  mobileSafariVideoSrc?: string;
  /** Screens this wide or narrower (px) get the mobile video */
  mobileBreakpoint?: number;
}

export default function LawyerHero({
  videoSrc = "/hero/hero-main.webm",
  mobileVideoSrc = "/hero/hero-main.webm",
  safariVideoSrc,
  mobileSafariVideoSrc,
  mobileBreakpoint = 760,
}: LawyerHeroProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);

  // Pick one video only (desktop OR mobile)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [mobileBreakpoint]);

  const webmSrc = isMobile ? mobileVideoSrc : videoSrc;
  const altSrc = isMobile ? mobileSafariVideoSrc : safariVideoSrc;

  // restart the rise animation if the source swaps (desktop <-> mobile)
  useEffect(() => {
    setReady(false);
  }, [webmSrc]);

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
        {/* Big word behind the statue */}
        <div className="big" aria-hidden="true">
          Lawyer
        </div>

        {/* Framed box behind the statue */}
        <div className="frame" aria-hidden="true" />

        {isMobile !== null && (
          <div className={`rise${ready ? " in" : ""}`}>
            <video
              key={webmSrc}
              className="statue"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-label="Lady Justice statue"
              onLoadedData={() => setReady(true)}
            >
              {/* Safari first (it ignores the webm alpha, so it must see this one first) */}
              {altSrc && (
                <source src={altSrc} type='video/mp4; codecs="hvc1"' />
              )}
              <source src={webmSrc} type="video/webm" />
            </video>
          </div>
        )}

        {/* Information Row - overlapping TOP of stage */}
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