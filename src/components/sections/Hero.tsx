"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import { useRef } from "react";
import { type Locale } from "@/lib/i18n";
import { contactInfo } from "@/lib/data";

interface HeroProps { locale: Locale; }

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

export default function Hero({ locale }: HeroProps) {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 noise-overlay">

      {/* Parallax background */}
      {/* Full-screen background — racetrack bike */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: 1.06 }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        >
          <Image
            src="/hero-bike-4k.jpg"
            alt="Ducati Panigale V4 racetrack"
            fill
            className="object-cover object-center scale-x-[-1]"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Overlays — heavy left dark for text legibility, lighter on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-zinc-950/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50" />
      {/* Overall dimmer so image doesn't overpower */}
      <div className="absolute inset-0 bg-zinc-950/30" />


      {/* Top red accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_24px_3px_rgba(220,38,38,0.55)]" />

      {/* Content */}
      <motion.div style={{ y: textY }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-red-500" />
            <span className="text-red-500 text-[11px] font-bold uppercase tracking-[0.22em]">
              {t("badgeDealer")}
            </span>
            <div className="w-px h-3.5 bg-zinc-600" />
            <span className="text-zinc-400 text-[11px] font-medium uppercase tracking-[0.18em]">
              Ducati · Indian · Benelli
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black leading-[0.92] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
            >
              {t("title")}
              <br />
              <span className="text-red-500 relative">
                {t("titleAccent")}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-red-500/60 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p {...fadeUp(0.25)} className="text-zinc-300 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10 mt-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {t("subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.35)} className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/motociclete-rulate`}
              className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-4 rounded-sm uppercase tracking-wide text-sm transition-all duration-200 shadow-lg shadow-red-900/50 hover:shadow-red-900/70 hover:-translate-y-0.5 active:translate-y-0"
            >
              {t("cta")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </Link>
            <a
              href={`tel:${contactInfo.phone1}`}
              className="inline-flex items-center gap-2 border border-zinc-600 hover:border-white text-zinc-300 hover:text-white font-bold px-8 py-4 rounded-sm uppercase tracking-wide text-sm transition-all duration-200 backdrop-blur-sm bg-zinc-900/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone className="w-4 h-4" />
              {contactInfo.phone1}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-20 flex flex-wrap gap-10 border-t border-zinc-800/60 pt-10"
          >
            {[
              { value: "1999", label: t("statFounded") },
              { value: "6+", label: t("statBrands") },
              { value: "200m²", label: t("statShowroom") },
              { value: "★ 4.9", label: t("statReviews") },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              >
                <div className="text-3xl sm:text-4xl font-black text-white">{stat.value}</div>
                <div className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-zinc-500"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}
