"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="bg-zinc-900/40 border-y border-zinc-800/60 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">
            Reviews
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {t("title")}
          </h2>
          <p className="text-zinc-500 mt-2">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-sm p-6 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-red-500 text-red-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-zinc-400 text-sm leading-relaxed flex-grow">
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
                <div className="w-9 h-9 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center text-red-400 text-xs font-black">
                  {item.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-bold">{item.name}</p>
                  <p className="text-zinc-600 text-xs">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
