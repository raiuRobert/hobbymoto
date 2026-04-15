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
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: 1.06 }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        >
          <Image
            src="/hero-bg.jpg"
            alt="HobbyMoto showroom"
            fill
            className="object-cover object-center opacity-50"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Layered gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/75 to-zinc-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/60" />

      {/* Right motorcycle image */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[58%] pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: 60, filter: "blur(20px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <Image src="/bikes/mtsv4.jpg" alt="" fill className="object-cover object-right" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950/60" />
        </motion.div>
      </div>

      {/* Decorative floating badge — top right */}
      <motion.div
        className="hidden xl:flex absolute right-[12%] top-[22%] items-center gap-2 bg-zinc-900/70 backdrop-blur-md border border-zinc-700/60 rounded-full px-4 py-2 animate-float"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-xs font-semibold text-zinc-300 tracking-wide">Stoc disponibil</span>
      </motion.div>

      {/* Top red accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_24px_3px_rgba(220,38,38,0.55)]" />

      {/* Content */}
      <motion.div style={{ y: textY }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/60 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold text-zinc-400 tracking-widest uppercase">{t("badge")}</span>
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
              { value: "1999", label: "Înființat" },
              { value: "6+", label: "Mărci premium" },
              { value: "200m²", label: "Showroom" },
              { value: "★ 4.9", label: "Google Reviews" },
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
