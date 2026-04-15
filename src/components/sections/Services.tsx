"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ShoppingCart, Hotel, Key, ArrowRight } from "lucide-react";
import { type Locale } from "@/lib/i18n";

interface ServicesProps {
  locale: Locale;
}

const services = [
  {
    icon: ShoppingCart,
    titleKey: "dealerTitle" as const,
    descKey: "dealerDesc" as const,
    href: (locale: string) => `/${locale}/motociclete-noi/ducati`,
    gradient: "from-red-900/30 to-transparent",
  },
  {
    icon: Hotel,
    titleKey: "hotelTitle" as const,
    descKey: "hotelDesc" as const,
    href: (locale: string) => `/${locale}/moto-hotel`,
    gradient: "from-zinc-700/30 to-transparent",
  },
  {
    icon: Key,
    titleKey: "rentalTitle" as const,
    descKey: "rentalDesc" as const,
    href: (locale: string) => `/${locale}/inchirieri`,
    gradient: "from-orange-900/20 to-transparent",
  },
];

export default function Services({ locale }: ServicesProps) {
  const t = useTranslations("services");

  return (
    <section className="bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {t("title")}
          </h2>
          <p className="text-zinc-500 mt-3 max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Link
                  href={service.href(locale)}
                  className="group relative flex flex-col h-full bg-zinc-900 border border-zinc-800 hover:border-red-600/40 rounded-sm p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-900/10"
                >
                  {/* Gradient bg */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div className="relative">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-zinc-800 group-hover:bg-red-600/20 border border-zinc-700 group-hover:border-red-600/40 rounded flex items-center justify-center mb-6 transition-all duration-300">
                      <Icon className="w-5 h-5 text-red-500" />
                    </div>

                    <h3 className="text-white font-black text-xl mb-3">
                      {t(service.titleKey)}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-8 flex-grow">
                      {t(service.descKey)}
                    </p>

                    <div className="flex items-center gap-2 text-red-500 group-hover:text-red-400 text-sm font-semibold uppercase tracking-wide">
                      <span>Află mai mult</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
