"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { brands } from "@/lib/data";

export default function Brands() {
  const t = useTranslations("brands");

  return (
    <section className="bg-zinc-900/50 border-y border-zinc-800/60 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">
            Partners
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {t("title")}
          </h2>
          <p className="text-zinc-500 mt-2 max-w-lg mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-zinc-800/40 border border-zinc-800/40 overflow-hidden rounded-sm">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative bg-zinc-900 hover:bg-zinc-800/80 transition-colors duration-300 aspect-[3/2] flex items-center justify-center p-6 cursor-default"
            >
              <div className="relative w-full h-full flex items-center justify-center grayscale brightness-200 opacity-60 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-contain"
                  unoptimized={brand.logo.endsWith(".svg")}
                />
              </div>
              <span className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 group-hover:text-red-500 transition-colors duration-300">
                {brand.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
