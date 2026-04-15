"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { contactInfo } from "@/lib/data";

interface HeroProps {
  locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Background image with Ken Burns zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        <Image
          src="/hero-bg.jpg"
          alt="HobbyMoto showroom"
          fill
          className="object-cover object-center opacity-55"
          priority
        />
      </motion.div>

      {/* Gradients — stronger on left where text sits */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-zinc-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/80" />

      {/* Motorcycle image on right side (desktop only) */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[60%] pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src="/bikes/mtsv4.jpg"
            alt=""
            fill
            className="object-cover object-right"
            priority
          />
          {/* Heavy fade-to-black on the left to merge with text area */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
          {/* Top/bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-zinc-950/50" />
        </motion.div>
      </div>

      {/* Top red accent line — thicker with glow */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_20px_2px_rgba(220,38,38,0.6)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/60 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold text-zinc-400 tracking-widest uppercase">
              {t("badge")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tight text-white mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
          >
            {t("title")}
            <br />
            <span className="text-red-500">{t("titleAccent")}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-300 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href={`/${locale}/motociclete-rulate`}
              className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-4 rounded-sm uppercase tracking-wide text-sm transition-all duration-200 shadow-lg shadow-red-900/40 hover:shadow-red-900/60 hover:-translate-y-0.5"
            >
              {t("cta")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={`tel:${contactInfo.phone1}`}
              className="inline-flex items-center gap-2 border border-zinc-600 hover:border-white text-zinc-300 hover:text-white font-bold px-8 py-4 rounded-sm uppercase tracking-wide text-sm transition-all duration-200 backdrop-blur-sm bg-zinc-900/30"
            >
              <Phone className="w-4 h-4" />
              {contactInfo.phone1}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 flex flex-wrap gap-10 border-t border-zinc-800/60 pt-10"
          >
            {[
              { value: "1999", label: "Înființat" },
              { value: "6", label: "Mărci premium" },
              { value: "200m²", label: "Showroom" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-black text-white">{stat.value}</div>
                <div className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-zinc-500"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}
