"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useRef } from "react";
import { type Locale } from "@/lib/i18n";
import { contactInfo } from "@/lib/data";

interface HeroProps { locale: Locale; }

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function Hero({ locale }: HeroProps) {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const stats = [
    { value: "1999", label: t("statFounded") },
    { value: "6", label: t("statBrands") },
    { value: "200 m²", label: t("statShowroom") },
    { value: "4.9", label: t("statReviews") },
  ];

  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-zinc-950">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src="/hero-bike-4k.jpg"
          alt="Ducati Panigale V4"
          fill
          sizes="100vw"
          className="object-cover object-center scale-x-[-1]"
          priority
        />
      </motion.div>

      {/* Dark on the left and bottom where the type sits; the bike stays lit on the right. */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/65 to-zinc-950/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-zinc-950/60" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-36 pb-10">
        <motion.p {...rise(0)} className="eyebrow mb-7">
          {t("badgeDealer")}
          <span className="hidden sm:inline text-zinc-400">Ducati · Indian · Benelli</span>
        </motion.p>

        <motion.h1
          {...rise(0.08)}
          className="text-[clamp(2.5rem,7.4vw,6.75rem)] font-black leading-[0.9] text-white"
        >
          {t("title")}
          <br />
          <span className="text-red-500">{t("titleAccent")}</span>
        </motion.h1>

        <div className="mt-9 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <motion.p {...rise(0.18)} className="text-zinc-300 text-lg max-w-xl leading-relaxed">
            {t("subtitle")}
          </motion.p>

          <motion.div {...rise(0.26)} className="flex flex-wrap gap-3">
            <Link href={`/${locale}/motociclete-rulate`} className="btn btn-primary group px-8 py-4">
              {t("cta")}
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <a href={`tel:${contactInfo.phone1}`} className="btn btn-ghost px-8 py-4 bg-zinc-950/40 backdrop-blur-sm">
              <Phone className="w-4 h-4" />
              {contactInfo.phone1}
            </a>
          </motion.div>
        </div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 border-t border-zinc-700/70"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`pt-5 pb-1 pr-4 ${i > 0 ? "md:pl-6 md:border-l md:border-zinc-700/70" : ""} ${i % 2 === 1 ? "pl-6 border-l border-zinc-700/70" : ""} ${i > 1 ? "mt-5 md:mt-0" : ""}`}
            >
              <dt className="label mb-2">{stat.label}</dt>
              <dd className="font-display text-3xl sm:text-4xl font-extrabold text-white">{stat.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
