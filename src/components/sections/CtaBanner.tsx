"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { contactInfo } from "@/lib/data";

interface CtaBannerProps { locale: Locale; }

export default function CtaBanner({ locale }: CtaBannerProps) {
  const t = useTranslations("cta");

  return (
    <section className="relative overflow-hidden bg-zinc-950 border-t border-zinc-800">
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/bikes/ducati-v4rally.jpg" alt="" fill sizes="100vw" className="object-cover object-center opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end"
      >
        <div>
          <p className="eyebrow mb-7">HobbyMoto · Constanța</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.04] max-w-3xl">
            {t("title")}
          </h2>
        </div>

        <div className="lg:border-l lg:border-zinc-700 lg:pl-10">
          <p className="text-zinc-300 leading-relaxed mb-7 max-w-md">{t("subtitle")}</p>
          <a
            href={`tel:${contactInfo.phone1}`}
            className="font-display block text-3xl sm:text-4xl font-extrabold text-white hover:text-red-500 transition-colors mb-7"
          >
            {contactInfo.phone1}
          </a>
          <Link href={`/${locale}/contact`} className="btn btn-primary group px-8 py-4">
            {t("button")}
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
