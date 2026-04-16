"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const photos = [
  { src: "/about/ducati-event.jpg",   label: "Ducati Open Day",           obj: "object-top" },
  { src: "/about/team-ducati.jpg",     label: "Echipa HobbyMoto",          obj: "object-top" },
  { src: "/about/kids-event.jpg",      label: "Tineri pasionați",          obj: "object-center" },
  { src: "/about/selfie-italjet.jpg",  label: "Italjet — noutăți 2025",   obj: "object-center" },
  { src: "/about/showroom-event.jpg",  label: "Lansare model nou",         obj: "object-center" },
  { src: "/about/storefront.jpg",      label: "Showroom Constanța",        obj: "object-center" },
];

export default function GalleryStrip() {
  return (
    <section className="bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">Comunitate</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Din inima showroom-ului
            </h2>
            <p className="text-zinc-500 mt-2 text-sm">Momente reale, oameni reali — familia HobbyMoto</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="/ro/despre-noi"
              className="group inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold text-sm uppercase tracking-wide transition-colors"
            >
              Despre noi
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {photos.map(({ src, label, obj }, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-sm bg-zinc-800 ${
                i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square"
              }`}
            >
              <Image
                src={src}
                alt={label}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
                quality={85}
                className={`object-cover ${obj} group-hover:scale-105 transition-transform duration-500`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="absolute bottom-2.5 left-3 text-white text-[11px] font-bold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
