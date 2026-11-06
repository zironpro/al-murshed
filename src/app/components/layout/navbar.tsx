"use client";

import { useEffect, useId, useRef, useState } from "react";

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface NavbarProps {
  logoSrc?: string;
  logoAlt?: string;
  links?: NavLink[];
  cta?: NavLink;
  activeHref?: string;
}

const defaultLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "About", href: "/about" },
      { label: "Our Team", href: "/about/our-team" },
      { label: "Gallery", href: "/about/gallery" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Arbitration", href: "https://almursheduae.com/arbitration/" },
      { label: "Banking & Finance", href: "https://almursheduae.com/banking-finance/" },
      { label: "Capital Market", href: "https://almursheduae.com/capital-market/" },
      { label: "Commercial Matters", href: "https://almursheduae.com/commercial/" },
      {
        label: "Construction and Infrastructure",
        href: "https://almursheduae.com/construction-and-infrastructure/",
      },
      {
        label: "Corporate/ Mergers and Acquisitions",
        href: "https://almursheduae.com/corporate-mergers-and-acquisitions/",
      },
      { label: "Criminal Defense", href: "https://almursheduae.com/criminal-defense/" },
      {
        label: "Dispute Resolution and Litigation",
        href: "https://almursheduae.com/dispute-resolution-and-litigation/",
      },
      {
        label: "Employment and Incentives",
        href: "https://almursheduae.com/employment-and-incentives/",
      },
      { label: "Family Business", href: "https://almursheduae.com/family-business/" },
      { label: "Family Law", href: "https://almursheduae.com/family-law/" },
      { label: "Financial Crime", href: "https://almursheduae.com/financial-crime/" },
      { label: "Insurance Law", href: "https://almursheduae.com/insurance-law/" },
      {
        label: "Intellectual Property",
        href: "https://almursheduae.com/intellectual-property/",
      },
      {
        label: "International Law and Conflict of Laws",
        href: "https://almursheduae.com/international-law-and-conflict-of-laws/",
      },
      { label: "Mediation", href: "https://almursheduae.com/mediation/" },
      { label: "Private Notary", href: "https://almursheduae.com/private-notary/" },
    ],
  },
  {
    label: "Insights",
    href: "/insights",
    children: [
      { label: "Articles", href: "/insights/articles" },
      { label: "Publications", href: "/insights/publications" },
    ],
  },
];

// Underline that slides in from the left on hover (desktop only)
const linkHover =
  "md:relative md:after:absolute md:after:inset-x-0 md:after:bottom-1 md:after:h-px md:after:origin-left md:after:scale-x-0 md:after:bg-current md:after:transition-transform md:after:duration-300 md:after:ease-out md:hover:after:scale-x-100 motion-reduce:md:after:transition-none";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3c2907]";

export default function Navbar({
  logoSrc = "/logo/logo.svg",
  logoAlt = "Al Murshad Logo",
  links = defaultLinks,
  cta = { label: "Contact Us", href: "/contact" },
  activeHref = "/",
}: NavbarProps) {
  const [open, setOpen] = useState(false); // mobile menu
  const [openSub, setOpenSub] = useState<string | null>(null); // open dropdown
  const menuId = useId();
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeAll = () => {
    setOpen(false);
    setOpenSub(null);
  };

  // Escape closes everything; click outside closes dropdowns
  useEffect(() => {
    if (!open && !openSub) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenSub(null);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [open, openSub]);

  // Hover behaviour only applies to real mouse pointers on desktop widths
  const hoverOpen = (e: React.PointerEvent, label: string) => {
    if (e.pointerType !== "mouse" || !window.matchMedia("(min-width: 768px)").matches) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenSub(label);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !window.matchMedia("(min-width: 768px)").matches) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenSub(null), 120);
  };

  const bar =
    "absolute left-2.5 h-0.5 w-5 rounded-sm bg-current transition-all duration-200 motion-reduce:transition-none";

  const itemText = "text-[clamp(12px,0.8vw,14px)] font-medium";

  const focused = open || openSub !== null;

  return (
    <>
      {/* Dim + blur the page behind the navbar while a menu is open */}
      <div
        aria-hidden="true"
        onClick={closeAll}
        className={`fixed inset-x-0 bottom-0 top-[62px] z-40 bg-[#3c2907]/25 sm:top-[66px] md:top-[70px] backdrop-blur-sm transition-opacity duration-200 motion-reduce:transition-none ${
          focused ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

    <header
      className={`sticky top-0 z-50 w-full text-[#3c2907] shadow-none transition-colors duration-200 motion-reduce:transition-none ${
        focused ? "bg-[#fffaf1]" : "bg-[#f7f1e6]"
      }`}
    >
      <nav
        ref={navRef}
        aria-label="Main"
        className="flex h-[62px] w-full items-center justify-between px-4 sm:h-[66px] sm:px-6 md:h-[70px] md:grid md:grid-cols-[1fr_auto_1fr] md:px-8 lg:px-12 xl:px-14"
      >
        {/* Logo */}
        <a href="/" className={`justify-self-start ${focusRing}`}>
          <img
            src={logoSrc}
            alt={logoAlt}
            className="h-7 w-auto sm:h-8 md:h-9 lg:h-10 xl:h-11"
          />
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => {
            setOpen((o) => !o);
            setOpenSub(null);
          }}
          className={`relative h-10 w-10 md:hidden ${focusRing}`}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>

          <span
            aria-hidden="true"
            className={`${bar} top-3 ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            aria-hidden="true"
            className={`${bar} top-[19px] ${open ? "opacity-0" : ""}`}
          />
          <span
            aria-hidden="true"
            className={`${bar} top-[26px] ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>

        {/* Navigation Links and CTA */}
        <div
          id={menuId}
          className={`
            ${open ? "flex" : "hidden"}
            absolute inset-x-0 top-[62px]
            flex-col gap-4
            bg-[#fffaf1]
            px-5 pb-6 pt-3
            max-md:max-h-[calc(100dvh-62px)] max-md:overflow-y-auto
            sm:top-[66px]
            md:contents
          `}
        >
          {/* Navigation Links */}
          <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-5 lg:gap-7 xl:gap-9 md:justify-self-center">
            {links.map(({ label, href, children }) => {
              const hasChildren = !!children?.length;
              const active =
                href === activeHref || !!children?.some((c) => c.href === activeHref);
              const expanded = openSub === label;
              const subId = `${menuId}-${label.replace(/\s+/g, "-").toLowerCase()}`;
              const wide = (children?.length ?? 0) > 8;

              if (!hasChildren) {
                return (
                  <li key={label}>
                    <a
                      href={href}
                      aria-current={active ? "page" : undefined}
                      onClick={closeAll}
                      className={`inline-flex items-center gap-2 py-2 ${itemText} ${linkHover} transition-opacity motion-reduce:transition-none ${
                        active
                          ? "opacity-100 md:after:scale-x-100"
                          : "opacity-80 hover:opacity-100"
                      } ${focusRing}`}
                    >
                      {label}
                    </a>
                  </li>
                );
              }

              return (
                <li
                  key={label}
                  className="md:relative"
                  onPointerEnter={(e) => hoverOpen(e, label)}
                  onPointerLeave={hoverClose}
                >
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={subId}
                    onClick={() => setOpenSub(expanded ? null : label)}
                    className={`flex w-full items-center justify-between gap-2 py-2 md:w-auto md:justify-start ${itemText} ${linkHover} transition-opacity motion-reduce:transition-none ${
                      active || expanded
                        ? "opacity-100 md:after:scale-x-100"
                        : "opacity-80 hover:opacity-100"
                    } ${focusRing}`}
                  >
                    {label}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 12 12"
                      className={`h-3 w-3 transition-transform duration-200 motion-reduce:transition-none ${
                        expanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.5 4.5l3.5 3.5 3.5-3.5" />
                    </svg>
                  </button>

                  {/* Dropdown: inline accordion on mobile, floating card on desktop */}
                  <div
                    id={subId}
                    className={`
                      ${
                        expanded
                          ? "block md:visible md:translate-y-0 md:opacity-100"
                          : "hidden md:pointer-events-none md:invisible md:block md:translate-y-2 md:opacity-0"
                      }
                      md:absolute md:left-1/2 md:top-full md:-translate-x-1/2 md:pt-4
                      md:transition-[opacity,transform,visibility] md:duration-200 md:ease-out
                      motion-reduce:md:transition-none
                      ${wide ? "md:w-[min(46rem,92vw)]" : "md:w-60"}
                    `}
                  >
                    <div className="max-md:border-l-2 max-md:border-[#3c2907]/20 max-md:pl-3 md:overflow-hidden md:rounded-lg md:bg-[#fffaf1] md:ring-1 md:ring-[#3c2907]/10">
                      {wide && (
                        <p className="hidden px-5 pb-1 pt-4 text-xs font-medium opacity-60 md:block">
                          Practice areas
                        </p>
                      )}

                      <ul
                        className={`grid gap-0.5 md:p-2 ${
                          wide ? "md:grid-cols-2" : ""
                        }`}
                      >
                        {children!.map((child) => {
                          const childActive = child.href === activeHref;
                          return (
                            <li key={child.href}>
                              <a
                                href={child.href}
                                aria-current={childActive ? "page" : undefined}
                                onClick={closeAll}
                                className={`group/item flex items-center justify-between gap-3 rounded-md px-3 py-2.5 ${itemText} transition-colors motion-reduce:transition-none hover:bg-[#f1e7d3] ${
                                  childActive ? "bg-[#f1e7d3]" : ""
                                } ${focusRing}`}
                              >
                                <span>{child.label}</span>
                                <svg
                                  aria-hidden="true"
                                  viewBox="0 0 12 12"
                                  className="hidden h-3 w-3 shrink-0 -translate-x-1 opacity-0 transition-all duration-150 motion-reduce:transition-none group-hover/item:translate-x-0 group-hover/item:opacity-100 group-focus-visible/item:translate-x-0 group-focus-visible/item:opacity-100 md:block"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
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

                      {wide && (
                        <a
                          href={href}
                          onClick={closeAll}
                          className={`hidden items-center justify-between bg-[#f1e7d3] px-5 py-3 ${itemText} md:flex ${focusRing}`}
                        >
                          View all services
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 12 12"
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 9l6-6M4 3h5v5" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* CTA Button */}
          <a
            href={cta.href}
            onClick={closeAll}
            className={`
              inline-flex items-center justify-center gap-2
              bg-[#3c2907] text-[#f7f1e6]
              px-4 py-2.5 sm:px-5 sm:py-3
              text-[clamp(11px,0.8vw,14px)]
              font-medium
              transition-colors hover:bg-[#523a0d]
              md:justify-self-end
              ${focusRing}
            `}
          >
            {cta.label}

            <svg
              aria-hidden="true"
              viewBox="0 0 12 12"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l6-6M4 3h5v5" />
            </svg>
          </a>
        </div>
      </nav>
    </header>
    </>
  );
}