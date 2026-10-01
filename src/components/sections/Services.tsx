"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { type Locale } from "@/lib/i18n";

interface ServicesProps { locale: Locale; }

const services = [
  {
    titleKey: "dealerTitle" as const,
    descKey: "dealerDesc" as const,
    href: (locale: string) => `/${locale}/motociclete-noi/ducati`,
    image: "/bikes/gallery/ducati-panigale-v4s/1.jpg",
  },
  {
    titleKey: "hotelTitle" as const,
    descKey: "hotelDesc" as const,
    href: (locale: string) => `/${locale}/moto-hotel`,
    image: "/hotel/storage-real.jpg",
  },
  {
    titleKey: "rentalTitle" as const,
    descKey: "rentalDesc" as const,
    href: (locale: string) => `/${locale}/inchirieri`,
    image: "/bikes/gallery/ducati-scrambler/1.jpg",
  },
];

export default function Services({ locale }: ServicesProps) {
  const t = useTranslations("services");

  return (
    <section className="bg-zinc-950 py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading index="03" eyebrow={t("sectionLabel")} title={t("title")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
          {services.map((service, i) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={service.href(locale)} className="group relative flex flex-col justify-between h-[26rem] overflow-hidden bg-zinc-950">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-55 transition-all duration-700 ease-out group-hover:opacity-75 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/10" />

                <div className="relative flex items-start justify-between p-6">
                  <span className="label text-zinc-300">0{i + 1}</span>
                  <ArrowUpRight className="w-5 h-5 text-zinc-400 transition-all duration-300 group-hover:text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div className="relative p-6">
                  <h3 className="text-white font-extrabold text-2xl leading-tight mb-3">{t(service.titleKey)}</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed max-w-xs">{t(service.descKey)}</p>
                  <span className="mt-5 block h-px w-10 bg-red-600 transition-all duration-500 group-hover:w-full" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
