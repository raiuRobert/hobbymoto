"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { type Locale } from "@/lib/i18n";

interface ServicesProps { locale: Locale; }

const services = [
  {
    titleKey: "dealerTitle" as const,
    descKey: "dealerDesc" as const,
    href: (locale: string) => `/${locale}/motociclete-noi/ducati`,
    image: "/bikes/ducati-panigale-v4s.jpg",
    accentColor: "from-red-900/70",
    label: "Dealer Autorizat",
  },
  {
    titleKey: "hotelTitle" as const,
    descKey: "hotelDesc" as const,
    href: (locale: string) => `/${locale}/moto-hotel`,
    image: "/about/mag1.jpg",
    accentColor: "from-zinc-900/80",
    label: "Moto Hotel",
  },
  {
    titleKey: "rentalTitle" as const,
    descKey: "rentalDesc" as const,
    href: (locale: string) => `/${locale}/inchirieri`,
    image: "/bikes/ducati-scrambler.jpg",
    accentColor: "from-orange-950/70",
    label: "Închirieri",
  },
];

export default function Services({ locale }: ServicesProps) {
  const t = useTranslations("services");

  return (
    <section className="bg-zinc-950 py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">Services</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">{t("title")}</h2>
          <p className="text-zinc-500 mt-3 max-w-xl mx-auto text-sm">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={service.href(locale)}
                className="group relative flex flex-col h-72 sm:h-80 rounded-sm overflow-hidden border border-zinc-800 hover:border-red-600/50 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/60"
              >
                {/* Background image */}
                <Image
                  src={service.image}
                  alt={t(service.titleKey)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Base dark overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${service.accentColor} to-transparent opacity-90`} />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/50 to-transparent" />

                {/* Shimmer border on hover */}
                <div className="absolute inset-0 border border-red-600/0 group-hover:border-red-600/30 rounded-sm transition-all duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest text-red-400 mb-3 bg-red-950/50 border border-red-800/40 px-2.5 py-1 rounded-full">
                    {service.label}
                  </span>
                  <h3 className="text-white font-black text-2xl mb-2 leading-tight">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-5 line-clamp-2">
                    {t(service.descKey)}
                  </p>
                  <div className="flex items-center gap-2 text-red-400 group-hover:text-red-300 text-sm font-bold uppercase tracking-widest transition-colors">
                    <span>Află mai mult</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
