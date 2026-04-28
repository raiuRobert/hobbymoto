"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { locales, type Locale } from "@/lib/i18n";

interface NavbarProps {
  locale: Locale;
}

type DropdownItem =
  | { type: "header"; label: string }
  | { type: "external"; label: string; href: string }
  | { type: "internal"; label: string; href: string }
  | { type: "divider" };

type NavLink =
  | { href: string; label: string; children?: never }
  | { href?: never; label: string; children: DropdownItem[] };

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bikesOpen, setBikesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const otherLocale = locales.find((l) => l !== locale) as Locale;
  const switchLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const navLinks: NavLink[] = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/despre-noi`, label: t("about") },
    {
      label: t("bikes"),
      children: [
        { type: "header", label: t("newBikes") },
        { type: "external", label: "Ducati",    href: "https://ducaticonstanta.ro/" },
        { type: "external", label: "Indian",    href: "https://ducaticonstanta.ro/" },
        { type: "external", label: "Benelli",   href: "https://www.benelli-moto.ro/" },
        { type: "external", label: "Italjet",   href: "https://www.italjet.com/en" },
        { type: "external", label: "Malaguti",  href: "https://ducaticonstanta.ro/" },
        { type: "external", label: "Lambretta", href: "https://ducaticonstanta.ro/" },
        { type: "divider" },
        { type: "internal", label: t("usedBikes"), href: `/${locale}/motociclete-rulate` },
      ],
    },
    { href: `/${locale}/evenimente`, label: t("events") },
    { href: `/${locale}/moto-hotel`, label: t("hotel") },
    { href: `/${locale}/inchirieri`, label: t("rental") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  function renderDropdownItem(item: DropdownItem, i: number) {
    if (item.type === "header") {
      return (
        <li key={i} className="px-4 pt-3 pb-1">
          <span className="text-sm font-bold text-white">
            {item.label}
          </span>
        </li>
      );
    }
    if (item.type === "divider") {
      return <li key={i} className="border-t border-zinc-800 my-1" />;
    }
    if (item.type === "external") {
      return (
        <li key={i}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between pl-6 pr-4 py-1.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors group/item"
          >
            <span>{item.label}</span>
            <ExternalLink className="w-3 h-3 text-zinc-600 group-hover/item:text-red-500 transition-colors" />
          </a>
        </li>
      );
    }
    // internal — same weight as header
    return (
      <li key={i}>
        <Link
          href={item.href}
          className={cn(
            "block px-4 py-2.5 text-sm font-bold transition-colors hover:bg-zinc-800",
            pathname === item.href ? "text-red-500" : "text-white hover:text-white"
          )}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  function renderMobileDropdownItem(item: DropdownItem, i: number) {
    if (item.type === "header") {
      return (
        <div key={i} className="text-sm font-bold text-white px-3 pt-3 pb-1">
          {item.label}
        </div>
      );
    }
    if (item.type === "divider") {
      return <div key={i} className="border-t border-zinc-800 my-1" />;
    }
    if (item.type === "external") {
      return (
        <a
          key={i}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="flex items-center justify-between pl-6 pr-3 py-1.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
        >
          <span>{item.label}</span>
          <ExternalLink className="w-3 h-3 text-zinc-600" />
        </a>
      );
    }
    // internal — bold, same level as header
    return (
      <Link
        key={i}
        href={item.href}
        onClick={() => setOpen(false)}
        className={cn(
          "block px-3 py-2.5 text-sm font-bold rounded transition-colors",
          pathname === item.href
            ? "text-red-500 bg-zinc-800"
            : "text-white hover:text-white hover:bg-zinc-800"
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/60 shadow-2xl"
          : "bg-gradient-to-b from-black/70 to-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">

        {/* Logo */}
        <Link href={`/${locale}`} className="relative flex items-center justify-center group w-[90px] h-[52px]">
          <Image
            src="/logo-silhouette.svg"
            alt="HobbyMoto"
            width={90}
            height={52}
            className="brightness-0 invert group-hover:opacity-20 transition-all duration-300"
            priority
          />
          <span
            className="absolute inset-0 flex items-center justify-center text-red-600 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 uppercase tracking-widest"
            style={{ fontFamily: "Bauhaus93, 'Josefin Sans', sans-serif", fontSize: 22 }}
          >
            Hobbymoto
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => setBikesOpen(true)}
                onMouseLeave={() => setBikesOpen(false)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-zinc-300 hover:text-white text-sm font-medium transition-colors">
                  {link.label}
                  <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", bikesOpen && "rotate-180")} />
                </button>
                <ul
                  className={cn(
                    "absolute top-full left-0 w-52 bg-zinc-900 border border-zinc-800 rounded-sm shadow-xl transition-all duration-200 py-1",
                    bikesOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  )}
                >
                  {link.children.map((item, i) => renderDropdownItem(item, i))}
                </ul>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors rounded",
                    pathname === link.href ? "text-white" : "text-zinc-400 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href={switchLocalePath}
            className="text-xs font-bold text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-2.5 py-1 rounded transition-colors uppercase tracking-widest"
          >
            {otherLocale}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="bg-red-600 hover:bg-red-500 text-white text-sm font-bold px-5 py-2.5 rounded-sm uppercase tracking-wide transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden bg-zinc-950 border-t border-zinc-800 transition-all duration-300 overflow-hidden",
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="px-4 py-4 space-y-1">
          {navLinks.map((link) =>
            link.children ? (
              <li key={link.label}>
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-3 pt-3 pb-1">
                  {link.label}
                </div>
                {link.children.map((item, i) => renderMobileDropdownItem(item, i))}
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-3 py-2.5 text-sm font-medium rounded transition-colors",
                    pathname === link.href
                      ? "text-white bg-zinc-800"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-800"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
          <li className="pt-2 flex gap-2">
            <Link
              href={switchLocalePath}
              onClick={() => setOpen(false)}
              className="text-xs font-bold text-zinc-400 border border-zinc-700 px-3 py-2 rounded uppercase tracking-widest"
            >
              {otherLocale}
            </Link>
            <Link
              href={`/${locale}/contact`}
              onClick={() => setOpen(false)}
              className="flex-1 text-center bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-sm uppercase"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
