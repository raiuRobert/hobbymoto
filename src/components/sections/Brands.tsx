"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
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

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-px bg-zinc-800/40 border border-zinc-800/40 overflow-hidden">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group bg-zinc-900 hover:bg-zinc-800 transition-colors duration-200 aspect-[3/2] flex flex-col items-center justify-center gap-2 cursor-default"
            >
              {/* Logo text fallback */}
              <span className="text-zinc-400 group-hover:text-white font-black text-sm tracking-tight transition-colors">
                {brand.name}
              </span>
              <span className="w-6 h-0.5 bg-zinc-700 group-hover:bg-red-600 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
