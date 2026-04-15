"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { locales, type Locale } from "@/lib/i18n";

interface NavbarProps {
  locale: Locale;
}

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

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/despre-noi`, label: t("about") },
    {
      label: t("newBikes"),
      children: [
        { href: `/${locale}/motociclete-noi/ducati`, label: "Ducati" },
        { href: `/${locale}/motociclete-noi/indian`, label: "Indian" },
        { href: `/${locale}/motociclete-noi/benelli`, label: "Benelli" },
        { href: `/${locale}/motociclete-noi/italjet`, label: "Italjet" },
      ],
    },
    { href: `/${locale}/motociclete-rulate`, label: t("usedBikes") },
    { href: `/${locale}/moto-hotel`, label: t("hotel") },
    { href: `/${locale}/inchirieri`, label: t("rental") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

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
        <Link href={`/${locale}`} className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
            <span className="text-white font-black text-sm">HM</span>
          </div>
          <span className="text-white font-black text-lg tracking-tight">
            Hobby<span className="text-red-500">Moto</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <li key={link.label} className="relative group">
                <button
                  className="flex items-center gap-1 px-3 py-2 text-zinc-300 hover:text-white text-sm font-medium transition-colors"
                  onMouseEnter={() => setBikesOpen(true)}
                  onMouseLeave={() => setBikesOpen(false)}
                >
                  {link.label}
                  <ChevronDown className="w-3 h-3" />
                </button>
                <ul
                  onMouseEnter={() => setBikesOpen(true)}
                  onMouseLeave={() => setBikesOpen(false)}
                  className={cn(
                    "absolute top-full left-0 mt-1 w-40 bg-zinc-900 border border-zinc-800 rounded shadow-xl transition-all duration-200",
                    bikesOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  )}
                >
                  {link.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href!}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors rounded",
                    pathname === link.href
                      ? "text-white"
                      : "text-zinc-400 hover:text-white"
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
          {/* Language switcher */}
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

        {/* Mobile menu toggle */}
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
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-3 pt-3 pb-1">
                  {link.label}
                </div>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href!}
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
