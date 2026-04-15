"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { type Locale } from "@/lib/i18n";

interface CtaBannerProps {
  locale: Locale;
}

export default function CtaBanner({ locale }: CtaBannerProps) {
  const t = useTranslations("cta");

  return (
    <section className="relative bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Red glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[300px] bg-red-700/15 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Accent line */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16 bg-red-600/60" />
            <span className="text-red-500 text-xs font-bold uppercase tracking-widest">
              HobbyMoto
            </span>
            <div className="h-px w-16 bg-red-600/60" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            {t("title")}
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-4 rounded-sm uppercase tracking-wide text-sm transition-all shadow-lg shadow-red-900/30"
            >
              {t("button")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+40000000000"
              className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-bold px-8 py-4 rounded-sm uppercase tracking-wide text-sm transition-all"
            >
              <Phone className="w-4 h-4" />
              {t("phone")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
