"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import BikeCard from "@/components/bikes/BikeCard";
import { type Locale } from "@/lib/i18n";
import { type SanityBike } from "@/sanity/client";

interface FeaturedBikesProps {
  bikes: SanityBike[];
  locale: Locale;
}

export default function FeaturedBikes({ bikes, locale }: FeaturedBikesProps) {
  const t = useTranslations("featured");

  if (bikes.length === 0) return null;

  return (
    <section className="bg-zinc-950 py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          index="01"
          eyebrow={t("sectionLabel")}
          title={t("title")}
          subtitle={t("subtitle")}
          action={{ href: `/${locale}/motociclete-rulate`, label: t("viewAll") }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {bikes.map((bike, i) => (
            <motion.div
              key={bike.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <BikeCard
                bike={bike}
                locale={locale}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                warrantyLabel={t("warrantyLabel")}
                priceOnRequestLabel={t("priceOnRequest")}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
