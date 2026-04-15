"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="relative bg-zinc-900/30 border-y border-zinc-800/50 py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-950/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header with Google badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">Reviews</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">{t("title")}</h2>
          <p className="text-zinc-500 mt-2 mb-5 text-sm">{t("subtitle")}</p>

          {/* Google rating badge */}
          <div className="inline-flex items-center gap-3 bg-zinc-900 border border-zinc-700/60 rounded-full px-5 py-2.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white font-black text-sm">4.9</span>
            <span className="text-zinc-500 text-xs">pe Google</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-sm p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
            >
              {/* Large quote mark */}
              <span className="absolute top-4 right-5 text-6xl font-black text-zinc-800 leading-none select-none group-hover:text-zinc-700 transition-colors">&ldquo;</span>

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-zinc-400 text-sm leading-relaxed flex-grow relative z-10">
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-zinc-800">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-600/30 to-red-900/20 border border-red-600/30 flex items-center justify-center text-red-400 text-xs font-black flex-shrink-0">
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
