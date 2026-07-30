"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

type NavigationItem = {
  href: string;
  label: string;
  description: string;
  exact?: boolean;
};

type NavigationGroup = {
  id: string;
  label: string;
  items: readonly NavigationItem[];
};

const navigation = [
  {
    id: "reviews",
    label: "Reviews",
    items: [
      {
        href: "/reviews",
        label: "Reviews overview",
        description: "Compare the services, outputs and decision points.",
        exact: true,
      },
      {
        href: "/reviews/independent-initiative-review",
        label: "Independent Initiative Review",
        description: "Get an independent opinion before a material commitment.",
      },
      {
        href: "/reviews/decision-case-reconstruction",
        label: "Decision Case Reconstruction",
        description: "Rebuild an incomplete case before it returns for approval.",
      },
      {
        href: "/reviews/independent-continuation-review",
        label: "Independent Continuation Review",
        description: "Reassess an active initiative before the next commitment.",
      },
      {
        href: "/reviews/ai-initiative-review",
        label: "AI review areas",
        description: "Review capability, data, human work and model dependencies.",
      },
    ],
  },
  {
    id: "evidence",
    label: "Evidence",
    items: [
      {
        href: "/situations",
        label: "Situations",
        description: "Find the review point for the decision now due.",
      },
      {
        href: "/cases",
        label: "Cases",
        description: "Read public reconstructions and sample records.",
      },
      {
        href: "/blog",
        label: "Decision notes",
        description: "Analysis of AI, software and investment decisions.",
      },
    ],
  },
  {
    id: "practice",
    label: "Practice",
    items: [
      {
        href: "/about",
        label: "About",
        description: "My product, technical and advisory experience.",
      },
      {
        href: "/approach",
        label: "Approach",
        description: "How I handle evidence, limits and independence.",
      },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    items: [
      {
        href: "/contact",
        label: "Contact me",
        description: "Send me a short general question.",
      },
      {
        href: "/request-a-review",
        label: "Request a review",
        description: "Use the full form for a defined initiative.",
      },
    ],
  },
] as const satisfies readonly NavigationGroup[];

type NavigationGroupId = (typeof navigation)[number]["id"];

const desktopNavigation = "(min-width: 780px)";

function itemMatchesRoute(
  pathname: string,
  item: (typeof navigation)[number]["items"][number],
) {
  if ("exact" in item && item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<
    Partial<Record<NavigationGroupId, HTMLButtonElement | null>>
  >({});
  const previousPathnameRef = useRef(pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [openGroup, setOpenGroup] = useState<NavigationGroupId | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(desktopNavigation);
    const updateViewport = () => {
      setIsDesktop(mediaQuery.matches);
      setOpenGroup(null);

      if (mediaQuery.matches) setIsOpen(false);
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenGroup(null);

    if (previousPathnameRef.current !== pathname) {
      previousPathnameRef.current = pathname;
      window.requestAnimationFrame(() => {
        const main = document.getElementById("main-content");
        if (!main) return;
        main.setAttribute("tabindex", "-1");
        main.focus({ preventScroll: true });
      });
    }
  }, [pathname]);

  useEffect(() => {
    const main = document.getElementById("main-content");
    const footer = document.querySelector<HTMLElement>(".site-footer");

    if (isOpen) {
      document.body.dataset.menuOpen = "true";
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
    } else {
      delete document.body.dataset.menuOpen;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    }

    return () => {
      delete document.body.dataset.menuOpen;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && openGroup === null) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (openGroup !== null) {
        event.preventDefault();
        const trigger = triggerRefs.current[openGroup];
        setOpenGroup(null);
        window.requestAnimationFrame(() => trigger?.focus());
        return;
      }

      if (isOpen) {
        event.preventDefault();
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, openGroup]);

  useEffect(() => {
    if (!isDesktop || openGroup === null) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return;
      if (navRef.current?.contains(event.target)) return;
      setOpenGroup(null);
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [isDesktop, openGroup]);

  const navigationIsAvailable = isDesktop || isOpen;

  const closeNavigation = () => {
    setIsOpen(false);
    setOpenGroup(null);
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeNavigation();
      return;
    }

    setOpenGroup(null);
    setIsOpen(true);
    window.requestAnimationFrame(() => triggerRefs.current.reviews?.focus());
  };

  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link
          className="brand"
          href="/"
          aria-label="Marc Paul / Decision Integrity Practice, home"
          onClick={closeNavigation}
        >
          <img className="brand-mark" aria-hidden="true" src="/logo/logo-compact-black-small.png" alt="Marc Paul logo" />
          <span className="brand-name">
            <span>Marc Paul</span>
            <span className="brand-divider" aria-hidden="true">
              /
            </span>
            <span className="brand-practice">Decision Integrity Practice</span>
          </span>
        </Link>

        <nav
          ref={navRef}
          id="primary-navigation"
          className={`primary-nav${isOpen ? " is-open" : ""}`}
          aria-label="Primary navigation"
          aria-hidden={!navigationIsAvailable}
        >
          {navigation.map((group) => {
            const groupIsOpen = openGroup === group.id;
            const groupIsActive = group.items.some((item) =>
              itemMatchesRoute(pathname, item),
            );
            const triggerId = `navigation-${group.id}-trigger`;
            const panelId = `navigation-${group.id}-panel`;

            return (
              <div
                className={`nav-disclosure${groupIsOpen ? " is-open" : ""}`}
                key={group.id}
              >
                <button
                  ref={(element) => {
                    triggerRefs.current[group.id] = element;
                  }}
                  id={triggerId}
                  className={`nav-disclosure-trigger${groupIsActive ? " is-active" : ""
                    }`}
                  type="button"
                  aria-expanded={groupIsOpen}
                  aria-controls={panelId}
                  tabIndex={navigationIsAvailable ? undefined : -1}
                  onClick={() =>
                    setOpenGroup((current) =>
                      current === group.id ? null : group.id,
                    )
                  }
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className="nav-disclosure-chevron"
                    size={15}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </button>

                <div
                  id={panelId}
                  className="nav-submenu"
                  role="group"
                  aria-labelledby={triggerId}
                  hidden={!groupIsOpen}
                >
                  {group.items.map((item) => {
                    const isCurrent = itemMatchesRoute(pathname, item);
                    const isExactCurrent = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-submenu-link${isCurrent ? " is-active" : ""
                          }`}
                        aria-current={isExactCurrent ? "page" : undefined}
                        tabIndex={
                          navigationIsAvailable && groupIsOpen ? undefined : -1
                        }
                        onClick={closeNavigation}
                      >
                        <span className="nav-submenu-label">{item.label}</span>
                        <span className="nav-submenu-description">
                          {item.description}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-label={isOpen ? "Close main menu" : "Open main menu"}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  );
}
