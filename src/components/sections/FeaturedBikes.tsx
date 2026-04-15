"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Gauge, Calendar, Zap, Phone } from "lucide-react";
import { bikes, contactInfo } from "@/lib/data";
import { formatKm } from "@/lib/utils";
import { type Locale } from "@/lib/i18n";

interface FeaturedBikesProps { locale: Locale; }

export default function FeaturedBikes({ locale }: FeaturedBikesProps) {
  const t = useTranslations("featured");
  const featured = bikes.filter((b) => b.featured).slice(0, 4);

  return (
    <section className="bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">Inventar</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">{t("title")}</h2>
            <p className="text-zinc-500 mt-2">{t("subtitle")}</p>
          </div>
          <Link href={`/${locale}/motociclete-rulate`}
            className="group inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold text-sm uppercase tracking-wide transition-colors">
            {t("viewAll")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((bike, i) => (
            <motion.div key={bike.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-zinc-900 border border-zinc-800 hover:border-red-600/40 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/20"
            >
              {/* Image */}
              <div className="relative h-48 bg-zinc-800 overflow-hidden">
                <Image
                  src={bike.image}
                  alt={`${bike.brand} ${bike.model}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute top-3 left-3 px-2 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm ${
                  bike.type === "new" ? "bg-red-600 text-white" : "bg-zinc-700 text-zinc-300"
                }`}>
                  {bike.type === "new" ? t("new") : t("used")}
                </div>
                {bike.warranty && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 text-zinc-300 text-[9px] font-bold rounded-sm">
                    GAR. {bike.warranty}
                  </div>
                )}
              </div>

              <div className="p-4">
                <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-1">{bike.brand}</p>
                <h3 className="text-white font-black text-lg leading-tight mb-3">{bike.model}</h3>

                <div className="flex gap-3 mb-4 text-zinc-500 text-xs">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{bike.year}</span>
                  {bike.km > 0 && <span className="flex items-center gap-1"><Gauge className="w-3 h-3" />{formatKm(bike.km)} km</span>}
                  <span className="flex items-center gap-1"><Zap className="w-3 h-3" />{bike.power}</span>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
                  <div>
                    {bike.price ? (
                      <p className="text-white font-black text-lg">{bike.price.toLocaleString()} €</p>
                    ) : (
                      <p className="text-zinc-400 text-xs">Preț la cerere</p>
                    )}
                  </div>
                  <a href={`tel:${contactInfo.phone1}`}
                    className="flex items-center gap-1 bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white text-xs font-bold px-3 py-2 rounded-sm uppercase tracking-wide transition-all duration-200">
                    <Phone className="w-3 h-3" /> Sună
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
