import React from "react";

const footerLinks = {
  Features: [
    { label: "About Us", href: "/about/" },
    { label: "Our Services", href: "/services/" },
    { label: "Case Studies", href: "/case-study/" },
    { label: "Our Team", href: "/team/" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact/" },
    { label: "Consultation", href: "/contact/" },
    { label: "FAQs", href: "/faq/" },
    { label: "Location", href: "/contact/" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Terms of Service", href: "/terms/" },
    { label: "Disclaimer", href: "/disclaimer/" },
  ],
};

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-8 w-8 items-center justify-center rounded-full text-[#6f6250] transition-all duration-300 hover:bg-[#4a2a08] hover:text-[#faf5ed] sm:h-9 sm:w-9"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#4a2a08] px-3 py-6 text-[#4a2a08] sm:px-5 sm:py-8 lg:px-8 lg:py-10 2xl:px-12">

      <div className="mx-auto w-full max-w-[1800px] overflow-hidden rounded-xl bg-[#faf5ed] p-3 shadow-sm sm:rounded-2xl sm:p-5 md:p-6 lg:p-8 xl:p-10">

        {/* CTA Banner */}
        <section className="relative overflow-hidden rounded-lg bg-[#d2ba95] px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-11 lg:rounded-xl lg:px-12 lg:py-12 xl:px-14">

          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border border-[#4a2a08]/10" />
          <div className="pointer-events-none absolute -right-8 -top-16 h-48 w-48 rounded-full border border-[#4a2a08]/10" />

          <div className="relative z-10 flex flex-col items-center justify-between gap-7 md:flex-row">

            <div className="w-full max-w-2xl text-center md:text-left">

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#765a32] sm:text-[11px] lg:text-xs">
                Al Murshed Legal Consultancy
              </span>

              <h2 className="mt-3 text-[clamp(21px,2.5vw,40px)] font-semibold leading-tight text-[#3c2907]">
                Need Legal Assistance?
                <br />
                Let's Discuss Your Matter.
              </h2>

              <p className="mx-auto mt-3 max-w-md text-[clamp(11px,0.9vw,14px)] leading-relaxed text-[#5a4d3d] md:mx-0">
                Get in touch with our legal team for professional
                guidance and a clear path forward.
              </p>

            </div>

            <div className="shrink-0">
              <a
                href="/contact/"
                className="group inline-flex items-center gap-4 whitespace-nowrap bg-[#4a2a08] px-5 py-3 text-[clamp(11px,0.85vw,14px)] font-medium text-[#faf5ed] transition-all duration-300 hover:bg-[#684018] sm:px-6 sm:py-3.5"
              >
                Book a Consultation

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </div>

          </div>
        </section>

        {/* Footer Main Content
            Mobile: brand and contact are full width, the link columns sit two per row. */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 py-8 sm:grid-cols-2 sm:gap-8 sm:py-9 lg:grid-cols-3 lg:gap-8 lg:py-10 xl:grid-cols-[1.7fr_0.85fr_0.85fr_0.85fr_1.5fr] xl:gap-8 2xl:gap-10">

          {/* Brand Section */}
          <div className="w-full max-w-sm max-sm:col-span-2">

            <a href="/" className="inline-flex items-center">
              <img
                src="/logo/logo.svg"
                alt="Al Murshed Legal Consultancy"
                className="h-9 w-auto object-contain sm:h-10 lg:h-11 xl:h-12"
              />
            </a>

            <p className="mt-4 max-w-xs text-[clamp(11px,0.85vw,14px)] leading-relaxed text-[#756b5c]">
              Your trusted legal partner in every situation.
              Providing dedicated legal consultancy and strategic
              solutions to protect what matters most.
            </p>

            {/* Social Media */}
            <div className="mt-5 flex items-center gap-1">

              <SocialIcon href="#" label="Instagram">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1" fill="currentColor" />
                </svg>
              </SocialIcon>

              <SocialIcon href="#" label="LinkedIn">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M5 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 10h4v11H3zm6 0h4v1.5c.7-1.1 1.9-1.8 3.5-1.8 3.1 0 4.5 1.9 4.5 5.1V21h-4v-5.5c0-1.6-.5-2.6-1.9-2.6-1.5 0-2.1 1.1-2.1 2.8V21H9z" />
                </svg>
              </SocialIcon>

              <SocialIcon href="#" label="Facebook">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M13.5 21v-8h2.8l.4-3h-3.2V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.4-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.7v8z" />
                </svg>
              </SocialIcon>

              <SocialIcon href="#" label="YouTube">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M23 7a3 3 0 0 0-2.1-2.1C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7a31 31 0 0 0-.5 5 31 31 0 0 0 .5 5 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5A3 3 0 0 0 23 17a31 31 0 0 0 .5-5 31 31 0 0 0-.5-5ZM10 15.5v-7l6 3.5z" />
                </svg>
              </SocialIcon>

            </div>
          </div>

          {/* Navigation Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="w-full">

              <h3 className="mb-4 text-[clamp(11px,0.85vw,14px)] font-semibold text-[#3c2907] sm:mb-5">
                {heading}
              </h3>

              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[clamp(11px,0.8vw,13px)] text-[#756b5c] transition-colors duration-200 hover:text-[#4a2a08]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

            </div>
          ))}

          {/* Contact Information */}
          <div className="w-full max-sm:col-span-2">

            <h3 className="mb-4 text-[clamp(11px,0.85vw,14px)] font-semibold text-[#3c2907] sm:mb-5">
              Contact Information
            </h3>

            <ul className="flex flex-col gap-4">

              {/* Address */}
              <li>
                <a
                  href="https://maps.app.goo.gl/zxnQoaoArvLxN8u6A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-[clamp(11px,0.8vw,13px)] leading-relaxed text-[#756b5c] transition-colors hover:text-[#4a2a08]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="mt-0.5 h-4 w-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>

                  <span>
                    Hamdan Bin Mohammed Street, Floor 1,<br />
                    Al Danah, Abu Dhabi Emirate, UAE
                  </span>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:info@almursheduae.com"
                  className="flex items-start gap-2.5 break-all text-[clamp(11px,0.8vw,13px)] text-[#756b5c] transition-colors hover:text-[#4a2a08]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="mt-0.5 h-4 w-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>

                  <span>info@almursheduae.com</span>
                </a>
              </li>

              {/* Phone */}
              <li>
                <a
                  href="tel:+97126447891"
                  className="flex items-center gap-2.5 text-[clamp(11px,0.8vw,13px)] text-[#756b5c] transition-colors hover:text-[#4a2a08]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
                  </svg>

                  <span>+971 2 644 7891</span>
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-[#4a2a08]/15 pt-5 sm:flex-row sm:items-center">

          <p className="text-[10px] sm:text-[11px] lg:text-xs text-[#756b5c]">
            © 2026 Al Murshed Legal Consultancy.
            All rights reserved.
          </p>

          <p className="text-[10px] sm:text-[11px] lg:text-xs text-[#756b5c]">
            Abu Dhabi, United Arab Emirates
          </p>

        </div>

      </div>
    </footer>
  );
}