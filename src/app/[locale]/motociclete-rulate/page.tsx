"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Gauge, Calendar, Zap, SlidersHorizontal, Phone } from "lucide-react";
import { bikes } from "@/lib/data";
import { formatKm } from "@/lib/utils";
import { contactInfo } from "@/lib/data";
import { type Locale } from "@/lib/i18n";

const usedBikes = bikes.filter((b) => b.type === "used");
const allBrands = ["Toate", ...Array.from(new Set(usedBikes.map((b) => b.brand))).sort()];

export default function MotocicleteSH() {
  const params = useParams();
  const locale = (params.locale as Locale) ?? "ro";
  const [brand, setBrand] = useState("Toate");
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    let list = brand === "Toate" ? usedBikes : usedBikes.filter((b) => b.brand === brand);
    if (sort === "km-low") list = [...list].sort((a, b) => a.km - b.km);
    if (sort === "km-high") list = [...list].sort((a, b) => b.km - a.km);
    if (sort === "newest") list = [...list].sort((a, b) => b.year - a.year);
    return list;
  }, [brand, sort]);

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">Inventar</p>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">Motociclete rulate</h1>
        <p className="text-zinc-500 text-lg">
          {usedBikes.length} motociclete disponibile · Garanție 12 luni · Transport gratuit în România
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 text-zinc-500 text-sm mr-2">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Marcă:</span>
            </div>
            {allBrands.map((b) => (
              <button
                key={b}
                onClick={() => setBrand(b)}
                className={`px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wide transition-all ${
                  brand === b
                    ? "bg-red-600 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm px-3 py-2 rounded-sm outline-none"
          >
            <option value="newest">An: cel mai nou</option>
            <option value="km-low">Kilometri: crescător</option>
            <option value="km-high">Kilometri: descrescător</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <p className="text-zinc-500 text-center py-20">Niciun rezultat.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((bike, i) => (
              <motion.div
                key={bike.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-zinc-900 border border-zinc-800 hover:border-red-600/40 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/10"
              >
                {/* Image */}
                <div className="relative h-52 bg-zinc-800 overflow-hidden">
                  <Image
                    src={bike.image}
                    alt={`${bike.brand} ${bike.model}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-zinc-700 text-zinc-300 text-[10px] font-black uppercase tracking-widest rounded-sm">
                    RULAT
                  </div>
                  {bike.warranty && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-red-600/90 text-white text-[10px] font-bold rounded-sm">
                      GAR. {bike.warranty}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-1">{bike.brand}</p>
                  <h3 className="text-white font-black text-xl mb-3 leading-tight">{bike.model}</h3>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex flex-col items-center gap-1 bg-zinc-800 rounded p-2">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="text-white text-xs font-bold">{bike.year}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 bg-zinc-800 rounded p-2">
                      <Gauge className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="text-white text-xs font-bold">{formatKm(bike.km)} km</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 bg-zinc-800 rounded p-2">
                      <Zap className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="text-white text-xs font-bold">{bike.engine}</span>
                    </div>
                  </div>

                  <div className="border-t border-zinc-800 pt-4 flex items-center justify-between">
                    <div>
                      {bike.price ? (
                        <p className="text-white font-black text-lg">{bike.price.toLocaleString()} €</p>
                      ) : (
                        <p className="text-zinc-400 text-sm">Preț la cerere</p>
                      )}
                    </div>
                    <a
                      href={`tel:${contactInfo.phone1}`}
                      className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-2.5 rounded-sm uppercase tracking-wide transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      Sună acum
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 p-8 bg-zinc-900 border border-zinc-800 rounded-sm text-center">
          <p className="text-zinc-400 mb-2">Nu ai găsit ce cauți?</p>
          <h3 className="text-white font-black text-2xl mb-4">Contactează-ne — putem găsi motocicleta dorită.</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${contactInfo.phone1}`} className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-sm uppercase tracking-wide text-sm transition-colors">
              <Phone className="w-4 h-4" />
              {contactInfo.phone1}
            </a>
            <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-bold px-6 py-3 rounded-sm uppercase tracking-wide text-sm transition-colors">
              Trimite mesaj
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
