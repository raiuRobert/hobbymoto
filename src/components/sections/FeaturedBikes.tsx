"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Gauge, Calendar, Zap } from "lucide-react";
import { bikes } from "@/lib/data";
import { formatPrice, formatKm } from "@/lib/utils";
import { type Locale } from "@/lib/i18n";

interface FeaturedBikesProps {
  locale: Locale;
}

export default function FeaturedBikes({ locale }: FeaturedBikesProps) {
  const t = useTranslations("featured");
  const featured = bikes.filter((b) => b.featured);

  return (
    <section className="bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">
              Inventar
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {t("title")}
            </h2>
            <p className="text-zinc-500 mt-2">{t("subtitle")}</p>
          </div>
          <Link
            href={`/${locale}/motociclete-rulate`}
            className="group inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold text-sm uppercase tracking-wide transition-colors"
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((bike, i) => (
            <motion.div
              key={bike.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <BikeCard bike={bike} locale={locale} t={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BikeCard({
  bike,
  locale,
  t,
}: {
  bike: (typeof bikes)[0];
  locale: Locale;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 hover:border-red-600/50 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/20">
      {/* Image placeholder */}
      <div className="relative h-52 bg-zinc-800 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-1">🏍️</div>
            <span className="text-zinc-600 text-xs">{bike.brand}</span>
          </div>
        </div>
        {/* Badge */}
        <div
          className={`absolute top-3 left-3 px-2 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm ${
            bike.type === "new"
              ? "bg-red-600 text-white"
              : "bg-zinc-700 text-zinc-300"
          }`}
        >
          {bike.type === "new" ? t("new") : t("used")}
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/5 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-1">
          {bike.brand}
        </p>
        <h3 className="text-white font-black text-lg leading-tight mb-3">
          {bike.model}
        </h3>

        {/* Specs row */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
            <Calendar className="w-3 h-3" />
            {bike.year}
          </div>
          {bike.km > 0 && (
            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
              <Gauge className="w-3 h-3" />
              {formatKm(bike.km)} km
            </div>
          )}
          <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
            <Zap className="w-3 h-3" />
            {bike.power}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-600 uppercase tracking-wider">
              {t("price")}
            </p>
            <p className="text-white font-black text-lg">
              {formatPrice(bike.price, bike.currency)}
            </p>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white text-xs font-bold px-4 py-2 rounded-sm uppercase tracking-wide transition-all duration-200"
          >
            {t("contact")}
          </Link>
        </div>
      </div>
    </div>
  );
}
