"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, Calendar, Zap, SlidersHorizontal, Phone, Shield, ArrowRight, X } from "lucide-react";
import { bikes, contactInfo } from "@/lib/data";
import { formatKm } from "@/lib/utils";
import { type Locale } from "@/lib/i18n";

const usedBikes = bikes.filter((b) => b.type === "used");
const allBrands = ["Toate", ...Array.from(new Set(usedBikes.map((b) => b.brand))).sort()];
const allCategories = ["Toate", ...Array.from(new Set(usedBikes.map((b) => b.category))).sort()];

const categoryLabels: Record<string, string> = {
  sport: "Sport", touring: "Touring", naked: "Naked",
  adventure: "Adventure", cruiser: "Cruiser", scooter: "Scooter", standard: "Standard",
};

export default function MotocicleteSH() {
  const params = useParams();
  const locale = (params.locale as Locale) ?? "ro";

  const [brand, setBrand] = useState("Toate");
  const [category, setCategory] = useState("Toate");
  const [sort, setSort] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = usedBikes;
    if (brand !== "Toate") list = list.filter((b) => b.brand === brand);
    if (category !== "Toate") list = list.filter((b) => b.category === category);
    if (sort === "price-low")  list = [...list].sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sort === "price-high") list = [...list].sort((a, b) => (b.price || 0) - (a.price || 0));
    if (sort === "km-low")     list = [...list].sort((a, b) => a.km - b.km);
    if (sort === "km-high")    list = [...list].sort((a, b) => b.km - a.km);
    if (sort === "newest")     list = [...list].sort((a, b) => b.year - a.year);
    return list;
  }, [brand, category, sort]);

  const activeFilterCount = (brand !== "Toate" ? 1 : 0) + (category !== "Toate" ? 1 : 0);

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* Hero header */}
      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Image src="/bikes/ducati-panigale-v4s.jpg" alt="" fill className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/70 to-zinc-950" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">Inventar</p>
            <h1 className="text-4xl sm:text-6xl font-black text-white mb-3 leading-none">Motociclete Rulate</h1>
            <p className="text-zinc-400 text-lg">
              <span className="text-white font-bold">{usedBikes.length}</span> motociclete disponibile
              <span className="text-zinc-600 mx-2">·</span>Garanție inclusă
              <span className="text-zinc-600 mx-2">·</span>Transport gratuit în România
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/60 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">

          {/* Left: result count + filter toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-sm border transition-all duration-200 ${
                showFilters || activeFilterCount > 0
                  ? "bg-red-600 border-red-600 text-white"
                  : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtre
              {activeFilterCount > 0 && (
                <span className="bg-white text-red-600 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <span className="text-zinc-500 text-sm hidden sm:block">
              {filtered.length} rezultate
            </span>
          </div>

          {/* Right: sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-sm px-3 py-2 rounded-sm outline-none focus:border-red-600 transition-colors cursor-pointer"
          >
            <option value="newest">An: cel mai nou</option>
            <option value="price-low">Preț: crescător</option>
            <option value="price-high">Preț: descrescător</option>
            <option value="km-low">Km: crescător</option>
            <option value="km-high">Km: descrescător</option>
          </select>
        </div>

        {/* Expandable filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="max-w-7xl mx-auto pt-3 pb-1 space-y-3">
                {/* Brand filter */}
                <div>
                  <p className="text-zinc-600 text-xs uppercase tracking-widest mb-2">Marcă</p>
                  <div className="flex flex-wrap gap-2">
                    {allBrands.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBrand(b)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
                          brand === b
                            ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
                            : "bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Category filter */}
                <div>
                  <p className="text-zinc-600 text-xs uppercase tracking-widest mb-2">Categorie</p>
                  <div className="flex flex-wrap gap-2">
                    {allCategories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
                          category === c
                            ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
                            : "bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500"
                        }`}
                      >
                        {c === "Toate" ? "Toate" : categoryLabels[c] ?? c}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Clear */}
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => { setBrand("Toate"); setCategory("Toate"); }}
                    className="inline-flex items-center gap-1 text-zinc-500 hover:text-white text-xs transition-colors"
                  >
                    <X className="w-3 h-3" /> Resetează filtrele
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-zinc-500 text-xl mb-2">Niciun rezultat</p>
            <button onClick={() => { setBrand("Toate"); setCategory("Toate"); }} className="text-red-500 hover:text-red-400 text-sm transition-colors">
              Resetează filtrele
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((bike, i) => (
                <motion.div
                  key={bike.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.3) }}
                >
                  <Link
                    href={`/${locale}/motociclete-rulate/${bike.id}`}
                    className="group block bg-zinc-900 border border-zinc-800 hover:border-red-600/50 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-red-950/30"
                  >
                    {/* Image */}
                    <div className="relative h-56 bg-zinc-800 overflow-hidden">
                      <Image
                        src={bike.gallery[0] ?? bike.image}
                        alt={`${bike.brand} ${bike.model}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={90}
                        className="object-cover group-hover:scale-107 transition-transform duration-600 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-zinc-900/80 backdrop-blur-sm text-zinc-200 text-[10px] font-black uppercase tracking-widest rounded-sm border border-zinc-700/40">
                        RULAT
                      </div>
                      {bike.warranty && (
                        <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 bg-red-600/90 text-white text-[10px] font-black uppercase tracking-widest rounded-sm">
                          <Shield className="w-3 h-3" /> Garanție
                        </div>
                      )}

                      {/* Hover arrow */}
                      <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-red-500 text-[11px] font-bold uppercase tracking-widest mb-1">{bike.brand}</p>
                      <h3 className="text-white font-black text-xl mb-4 leading-tight">{bike.model}</h3>

                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                          { icon: Calendar, value: bike.year },
                          { icon: Gauge, value: `${formatKm(bike.km)} km` },
                          { icon: Zap, value: bike.engine.split(" ")[0] },
                        ].map(({ icon: Icon, value }) => (
                          <div key={String(value)} className="flex flex-col items-center gap-1.5 bg-zinc-800/70 rounded-sm p-2.5 border border-zinc-700/40">
                            <Icon className="w-3.5 h-3.5 text-zinc-500" />
                            <span className="text-white text-xs font-bold">{value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-zinc-800/80 pt-4 flex items-center justify-between">
                        {bike.price ? (
                          <div>
                            <p className="text-zinc-600 text-[10px] uppercase tracking-widest mb-0.5">Preț</p>
                            <p className="text-white font-black text-2xl leading-none">
                              {bike.price.toLocaleString("de-DE")} <span className="text-red-500 text-lg">€</span>
                            </p>
                          </div>
                        ) : (
                          <p className="text-zinc-300 font-bold text-sm">Preț la cerere</p>
                        )}
                        <span className="inline-flex items-center gap-1.5 text-red-500 group-hover:text-red-400 text-xs font-black uppercase tracking-widest transition-colors">
                          Detalii <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-10 bg-zinc-900/60 border border-zinc-800 rounded-sm text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 to-transparent pointer-events-none" />
          <div className="relative">
            <p className="text-zinc-400 mb-2 text-sm">Nu ai găsit ce cauți?</p>
            <h3 className="text-white font-black text-2xl sm:text-3xl mb-6 leading-tight">
              Contactează-ne — găsim motocicleta dorită.
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`tel:${contactInfo.phone1}`}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-7 py-3.5 rounded-sm uppercase tracking-wide text-sm transition-all duration-200 shadow-lg shadow-red-900/30 hover:-translate-y-0.5">
                <Phone className="w-4 h-4" />
                {contactInfo.phone1}
              </a>
              <Link href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-bold px-7 py-3.5 rounded-sm uppercase tracking-wide text-sm transition-all duration-200 hover:-translate-y-0.5">
                Trimite mesaj
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
