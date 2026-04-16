"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Gauge, Calendar, Zap, Shield } from "lucide-react";
import { bikes } from "@/lib/data";
import { formatKm } from "@/lib/utils";
import { type Locale } from "@/lib/i18n";

interface FeaturedBikesProps { locale: Locale; }

export default function FeaturedBikes({ locale }: FeaturedBikesProps) {
  const t = useTranslations("featured");
  const featured = bikes.filter((b) => b.featured).slice(0, 4);

  return (
    <section className="bg-zinc-950 py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">Inventar</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">{t("title")}</h2>
            <p className="text-zinc-500 mt-2 text-sm">{t("subtitle")}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href={`/${locale}/motociclete-rulate`}
              className="group inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold text-sm uppercase tracking-wide transition-colors"
            >
              {t("viewAll")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((bike, i) => (
            <motion.div
              key={bike.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/${locale}/motociclete-rulate/${bike.id}`}
                className="group flex flex-col bg-zinc-900 border border-zinc-800 hover:border-red-600/50 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-red-950/40"
              >
                {/* Image */}
                <div className="relative h-52 bg-zinc-800 overflow-hidden flex-shrink-0">
                  <Image
                    src={bike.gallery[0] ?? bike.image}
                    alt={`${bike.brand} ${bike.model}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={90}
                    className="object-cover group-hover:scale-107 transition-transform duration-700 ease-out"
                  />
                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm ${
                    bike.type === "new" ? "bg-red-600 text-white" : "bg-zinc-800/90 backdrop-blur-sm text-zinc-200 border border-zinc-700/60"
                  }`}>
                    {bike.type === "new" ? "NOU" : "RULAT"}
                  </div>
                  {bike.warranty && (
                    <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 bg-red-600/90 backdrop-blur-sm text-white text-[10px] font-black rounded-sm">
                      <Shield className="w-3 h-3" /> GAR.
                    </div>
                  )}

                  {/* Hover overlay arrow */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-red-500 text-[11px] font-bold uppercase tracking-widest mb-1">{bike.brand}</p>
                  <h3 className="text-white font-black text-lg leading-tight mb-4 flex-grow">{bike.model}</h3>

                  {/* Spec pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 bg-zinc-800 text-zinc-400 text-[11px] px-2.5 py-1 rounded-full">
                      <Calendar className="w-3 h-3" />{bike.year}
                    </span>
                    {bike.km > 0 && (
                      <span className="inline-flex items-center gap-1 bg-zinc-800 text-zinc-400 text-[11px] px-2.5 py-1 rounded-full">
                        <Gauge className="w-3 h-3" />{formatKm(bike.km)} km
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 bg-zinc-800 text-zinc-400 text-[11px] px-2.5 py-1 rounded-full">
                      <Zap className="w-3 h-3" />{bike.power.split(" ")[0]} CP
                    </span>
                  </div>

                  {/* Price row */}
                  <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4">
                    {bike.price ? (
                      <div>
                        <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-0.5">Preț</p>
                        <p className="text-white font-black text-xl leading-none">
                          {bike.price.toLocaleString("de-DE")} <span className="text-red-500">€</span>
                        </p>
                      </div>
                    ) : (
                      <p className="text-zinc-400 text-sm font-bold">Preț la cerere</p>
                    )}
                    <span className="text-red-500 group-hover:text-red-400 text-xs font-black uppercase tracking-widest transition-colors inline-flex items-center gap-1">
                      Detalii <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
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
