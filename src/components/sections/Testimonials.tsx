"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="bg-zinc-950 py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          index="04"
          eyebrow="Reviews"
          title={t("title")}
          subtitle={t("subtitle")}
          aside={
            <div className="shrink-0 flex items-end gap-4">
              <span className="font-display text-5xl font-black text-white leading-none">4.9</span>
              <div className="pb-0.5">
                <div className="flex gap-0.5 mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  ))}
                </div>
                <p className="label">Google Reviews</p>
              </div>
            </div>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-zinc-800">
          {testimonials.map((item, i) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`flex flex-col gap-8 py-8 border-b border-zinc-800 lg:border-b-0 sm:px-7 first:sm:pl-0 ${
                i > 0 ? "lg:border-l lg:border-zinc-800" : ""
              } ${i % 2 === 1 ? "sm:border-l sm:border-zinc-800" : "sm:max-lg:pl-0"}`}
            >
              <blockquote className="text-zinc-200 leading-relaxed flex-grow">
                <span className="text-red-500 font-black mr-1">“</span>
                {item.text}
              </blockquote>
              <figcaption>
                <p className="text-white text-sm font-bold">{item.name}</p>
                <p className="label mt-1.5">{item.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
