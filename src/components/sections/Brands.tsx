"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { brands } from "@/lib/data";

export default function Brands() {
  const t = useTranslations("brands");
  // Double the list for seamless infinite loop
  const doubled = [...brands, ...brands];

  return (
    <section className="relative bg-zinc-900/40 border-y border-zinc-800/50 py-16 overflow-hidden">
      {/* Fade edges — same width both sides for symmetry */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">Partners</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">{t("title")}</h2>
          <p className="text-zinc-500 mt-2 max-w-lg mx-auto text-sm">{t("subtitle")}</p>
        </motion.div>
      </div>

      {/* Infinite marquee track — px-32 keeps first item clear of fade edges */}
      <div className="flex overflow-hidden">
        <div className="flex animate-marquee gap-12 items-center whitespace-nowrap px-6">
          {doubled.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="group relative flex-shrink-0 w-36 h-16 flex items-center justify-center px-4 py-3 rounded-sm bg-zinc-900/60 border border-zinc-800/60 hover:border-red-600/40 hover:bg-zinc-800/80 transition-all duration-300 cursor-default"
            >
              <div className="relative w-full h-full flex items-center justify-center grayscale brightness-150 opacity-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-400">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  sizes="144px"
                  className="object-contain"
                  unoptimized={brand.logo.endsWith(".svg")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
