"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Phone, X } from "lucide-react";
import { contactInfo } from "@/lib/data";
import BikeCard from "@/components/bikes/BikeCard";
import { type SanityBike } from "@/sanity/client";

const categoryLabels: Record<string, string> = {
  sport: "Sport", touring: "Touring", naked: "Naked",
  adventure: "Adventure", cruiser: "Cruiser", scooter: "Scooter", standard: "Standard",
};

interface Props {
  bikes: SanityBike[];
  locale: string;
}

export default function RulateClient({ bikes, locale }: Props) {
  const allBrands = useMemo(
    () => ["Toate", ...Array.from(new Set(bikes.map((b) => b.brand))).sort()],
    [bikes],
  );
  const allCategories = useMemo(
    () => ["Toate", ...Array.from(new Set(bikes.map((b) => b.category))).sort()],
    [bikes],
  );

  const [brand, setBrand] = useState("Toate");
  const [category, setCategory] = useState("Toate");
  const [sort, setSort] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = bikes;
    if (brand !== "Toate") list = list.filter((b) => b.brand === brand);
    if (category !== "Toate") list = list.filter((b) => b.category === category);
    // "Price on request" bikes have no price; keep them at the end either way.
    const byPrice = (dir: 1 | -1) => (a: SanityBike, b: SanityBike) => {
      if (!a.price || !b.price) return (a.price ? 0 : 1) - (b.price ? 0 : 1);
      return dir * (a.price - b.price);
    };
    if (sort === "price-low")  list = [...list].sort(byPrice(1));
    if (sort === "price-high") list = [...list].sort(byPrice(-1));
    if (sort === "km-low")     list = [...list].sort((a, b) => a.km - b.km);
    if (sort === "km-high")    list = [...list].sort((a, b) => b.km - a.km);
    if (sort === "newest")     list = [...list].sort((a, b) => b.year - a.year);
    return list;
  }, [bikes, brand, category, sort]);

  const activeFilterCount = (brand !== "Toate" ? 1 : 0) + (category !== "Toate" ? 1 : 0);

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* Hero header */}
      <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
        >
          <div>
            <p className="eyebrow mb-6">Inventar</p>
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-[0.95]">Motociclete rulate</h1>
          </div>
          <dl className="flex gap-8 sm:gap-10">
            <div>
              <dt className="label mb-2">Disponibile</dt>
              <dd className="font-display text-3xl font-extrabold text-white leading-none">{bikes.length}</dd>
            </div>
            <div className="border-l border-zinc-800 pl-8 sm:pl-10">
              <dt className="label mb-2">Garanție</dt>
              <dd className="text-zinc-200 text-sm font-semibold">Inclusă</dd>
            </div>
            <div className="border-l border-zinc-800 pl-8 sm:pl-10">
              <dt className="label mb-2">Transport</dt>
              <dd className="text-zinc-200 text-sm font-semibold">Gratuit în România</dd>
            </div>
          </dl>
        </motion.div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/60 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
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
                  <BikeCard bike={bike} locale={locale} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
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
          className="mt-20 pt-10 border-t border-zinc-800 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <p className="eyebrow mb-5">Nu ai găsit ce cauți?</p>
            <h3 className="text-white font-black text-2xl sm:text-3xl leading-tight max-w-xl">
              Contactează-ne — găsim motocicleta dorită.
            </h3>
          </div>
          <div>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${contactInfo.phone1}`}
                className="btn btn-primary px-7 py-3.5 text-sm">
                <Phone className="w-4 h-4" />
                {contactInfo.phone1}
              </a>
              <Link href={`/${locale}/contact`}
                className="btn btn-ghost px-7 py-3.5 text-sm">
                Trimite mesaj
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
