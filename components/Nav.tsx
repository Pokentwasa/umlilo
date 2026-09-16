"use client";

import { useState } from "react";
import { site } from "@/data/site";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group relative inline-block text-sm font-semibold uppercase tracking-[0.14em] text-bone/85 transition-colors hover:text-ember"
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ember transition-transform duration-300 ease-[--ease-fire] group-hover:scale-x-100" />
    </a>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-bone/10 bg-charcoal">
      <div className="container-edit flex items-center justify-between py-5">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-bone"
          aria-label={`${site.shortName} — home`}
        >
          UM-LILO
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={site.order.href}
            className="hidden border border-ember/70 px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-ember transition-colors hover:bg-ember hover:text-charcoal sm:inline-block"
          >
            {site.order.label}
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex flex-col gap-1.5 p-2 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className="block h-px w-6 bg-bone" />
            <span className="block h-px w-6 bg-bone" />
          </button>
        </div>
      </div>
    </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-charcoal">
          <div className="container-edit flex items-center justify-between py-5">
            <span className="font-display text-lg font-semibold text-bone">UM-LILO</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-2 text-3xl leading-none text-bone"
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>
          <nav
            className="flex flex-1 flex-col items-start justify-center gap-4 px-8"
            aria-label="Mobile"
          >
            {site.nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl font-medium text-bone"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.order.href}
              onClick={() => setOpen(false)}
              className="mt-6 border border-ember px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-ember"
            >
              {site.order.label}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
