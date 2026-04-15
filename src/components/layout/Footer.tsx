import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { contactInfo } from "@/lib/data";

interface FooterProps { locale: Locale; }

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/60 relative">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={`/${locale}`} className="inline-block mb-5">
              <Image
                src="/logo.png"
                alt="HobbyMoto"
                width={130}
                height={44}
                className="h-10 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed mb-1">{t("tagline")}</p>
            <p className="text-zinc-600 text-xs mb-6">{contactInfo.companyName}</p>
            <div className="flex gap-3">
              <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-800/80 hover:bg-gradient-to-br hover:from-pink-600 hover:to-purple-600 border border-zinc-700/60 hover:border-transparent rounded-lg flex items-center justify-center transition-all duration-300 text-zinc-400 hover:text-white group">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-800/80 hover:bg-blue-600 border border-zinc-700/60 hover:border-transparent rounded-lg flex items-center justify-center transition-all duration-300 text-zinc-400 hover:text-white group">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">{t("links")}</h3>
            <ul className="space-y-2.5">
              {[
                { href: `/${locale}`, label: tNav("home") },
                { href: `/${locale}/despre-noi`, label: tNav("about") },
                { href: `/${locale}/motociclete-rulate`, label: tNav("usedBikes") },
                { href: `/${locale}/motociclete-noi/ducati`, label: "Ducati" },
                { href: `/${locale}/motociclete-noi/indian`, label: "Indian" },
                { href: `/${locale}/motociclete-noi/benelli`, label: "Benelli" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-zinc-500 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">Services</h3>
            <ul className="space-y-2.5">
              {[
                { href: `/${locale}/moto-hotel`, label: tNav("hotel") },
                { href: `/${locale}/inchirieri`, label: tNav("rental") },
                { href: `/${locale}/contact`, label: tNav("contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-zinc-500 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">{t("contact")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <a href={`tel:${contactInfo.phone1}`} className="block text-zinc-400 hover:text-white text-sm transition-colors">
                    {contactInfo.phone1}
                  </a>
                  <a href={`tel:${contactInfo.phone2}`} className="block text-zinc-400 hover:text-white text-sm transition-colors">
                    {contactInfo.phone2}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="text-zinc-400 hover:text-white text-sm transition-colors break-all">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <a href={contactInfo.googleMaps} target="_blank" rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white text-sm transition-colors leading-relaxed">
                  {contactInfo.address}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="text-zinc-400 text-sm leading-relaxed">
                  <p>{contactInfo.hours.weekdays}</p>
                  <p>{contactInfo.hours.saturday}</p>
                  <p>{contactInfo.hours.sunday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} HobbyMoto · {contactInfo.companyName}. {t("rights")}
          </p>
          <div className="flex gap-4">
            <Link href={`/${locale}/privacy`} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">Privacy</Link>
            <Link href={`/${locale}/termeni`} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">Termeni</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
