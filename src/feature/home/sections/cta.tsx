
import React from "react";

export default function CTAPage() {
  return (
    <section className="w-full bg-[#d2ba95] px-6 py-20 text-center md:py-28">

      <div className="mx-auto max-w-4xl">

        <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#765a32]">
          Al Murshed Legal Consultancy
        </span>

        <h2 className="mt-6 text-3xl font-medium leading-tight text-[#4a2a08] md:text-5xl lg:text-6xl">
          Need Legal Guidance?
          <br />
          <span className="font-serif italic text-[#765a32]">
            We're Here to Help.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#5a4d3d] md:text-base">
          Let our experienced legal team guide you through your
          legal matters with clarity, confidence and dedication.
        </p>

        <a
          href="/contact/"
          className="mt-9 inline-flex items-center gap-4 bg-[#4a2a08] px-8 py-4 text-sm font-medium text-[#faf5ed] transition-all duration-300 hover:bg-[#684018]"
        >
          Book a Consultation
          <span aria-hidden="true">↗</span>
        </a>

      </div>

    </section>
  );
}
