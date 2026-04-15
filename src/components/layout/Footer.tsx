import Link from "next/link";
import { useTranslations } from "next-intl";
import { Camera, Share2, Phone, Mail, MapPin } from "lucide-react";
import { type Locale } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
                <span className="text-white font-black text-sm">HM</span>
              </div>
              <span className="text-white font-black text-lg tracking-tight">
                Hobby<span className="text-red-500">Moto</span>
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              {t("tagline")}
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/hobbymoto"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-zinc-800 hover:bg-red-600 rounded flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Camera className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://facebook.com/hobbymoto"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-zinc-800 hover:bg-red-600 rounded flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Share2 className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">
              {t("links")}
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: `/${locale}`, label: tNav("home") },
                { href: `/${locale}/despre-noi`, label: tNav("about") },
                { href: `/${locale}/motociclete-rulate`, label: tNav("usedBikes") },
                { href: `/${locale}/motociclete-noi/ducati`, label: "Ducati" },
                { href: `/${locale}/motociclete-noi/indian`, label: "Indian" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-500 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: `/${locale}/moto-hotel`, label: tNav("hotel") },
                { href: `/${locale}/inchirieri`, label: tNav("rental") },
                { href: `/${locale}/contact`, label: tNav("contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-500 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">
              {t("contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+40000000000"
                  className="text-zinc-400 hover:text-white text-sm transition-colors"
                >
                  +40 000 000 000
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:contact@hobbymoto.ro"
                  className="text-zinc-400 hover:text-white text-sm transition-colors"
                >
                  contact@hobbymoto.ro
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-zinc-400 text-sm">România</span>
              </li>
            </ul>
            <div className="mt-5">
              <p className="text-xs text-zinc-600 font-semibold uppercase tracking-widest mb-1">
                {t("hours")}
              </p>
              <p className="text-zinc-500 text-sm whitespace-pre-line">
                {t("hoursVal")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} HobbyMoto. {t("rights")}
          </p>
          <div className="flex gap-4">
            <Link
              href={`/${locale}/privacy`}
              className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href={`/${locale}/termeni`}
              className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors"
            >
              Termeni și condiții
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
