"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ContactButton } from "@/components/contact-modal";

const links = [
  { href: "#advisory", label: "Advisory" },
  { href: "#approach", label: "Approach" },
  { href: "#work", label: "Work" },
  { href: "#thinking", label: "Thinking" }
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.menuOpen = open ? "true" : "false";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      delete document.body.dataset.menuOpen;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <a className="brand" href="#top" aria-label="Marc Paul, home">
          <span className="brand-mark" aria-hidden="true">
            MP
          </span>
          <span className="brand-name">Marc Paul</span>
        </a>

        <nav
          id="primary-navigation"
          className={`primary-nav ${open ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <ContactButton
            className="nav-cta"
            label="Start a conversation"
            location="navigation"
            onClick={() => setOpen(false)}
          />
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
