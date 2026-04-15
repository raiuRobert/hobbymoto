"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { contactInfo } from "@/lib/data";

interface CtaBannerProps { locale: Locale; }

export default function CtaBanner({ locale }: CtaBannerProps) {
  const t = useTranslations("cta");

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-zinc-950">
      {/* Background motorcycle silhouette */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Image src="/bikes/ducati-v4rally.jpg" alt="" fill className="object-cover object-center" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-zinc-950" />

      {/* Red glow blobs */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-700/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-red-900/15 blur-[80px] rounded-full pointer-events-none" />

      {/* Top/bottom accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-600/60" />
            <span className="text-red-500 text-xs font-bold uppercase tracking-widest">HobbyMoto</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-600/60" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            {t("title")}
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-12">
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-9 py-4 rounded-sm uppercase tracking-wide text-sm transition-all duration-200 shadow-xl shadow-red-900/40 hover:shadow-red-900/60 hover:-translate-y-0.5"
            >
              {t("button")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <a
              href={`tel:${contactInfo.phone1}`}
              className="inline-flex items-center gap-2 border border-zinc-600 hover:border-zinc-400 text-zinc-300 hover:text-white font-bold px-9 py-4 rounded-sm uppercase tracking-wide text-sm transition-all duration-200 backdrop-blur-sm bg-zinc-900/30 hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              {contactInfo.phone1}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
