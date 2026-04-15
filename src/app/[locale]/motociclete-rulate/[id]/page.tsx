"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, ArrowLeft, Gauge, Calendar, Zap, Weight,
  CheckCircle, Shield, X, ChevronLeft, ChevronRight, Maximize2, ArrowRight
} from "lucide-react";
import { bikes, contactInfo } from "@/lib/data";
import { formatKm } from "@/lib/utils";
import { type Locale } from "@/lib/i18n";

export default function BikeDetailPage() {
  const params = useParams();
  const locale = (params.locale as Locale) ?? "ro";
  const id = params.id as string;

  const bike = bikes.find((b) => b.id === id);
  if (!bike) notFound();

  const images = bike.gallery.length > 0 ? bike.gallery : [bike.image];
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  // Similar bikes: same category, different id, max 3
  const similar = bikes
    .filter((b) => b.id !== bike.id && b.type === "used" && b.category === bike.category)
    .slice(0, 3);

  const openLightbox = (i: number) => { setLightboxIdx(i); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);
  const prevLb = useCallback(() => setLightboxIdx((p) => (p - 1 + images.length) % images.length), [images.length]);
  const nextLb = useCallback(() => setLightboxIdx((p) => (p + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLb();
      if (e.key === "ArrowRight") nextLb();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, prevLb, nextLb]);

  const whatsappMsg = encodeURIComponent(
    `Bună ziua! Sunt interesat de ${bike.brand} ${bike.model} ${bike.year} (${formatKm(bike.km)} km)${bike.price ? ` — ${bike.price.toLocaleString("de-DE")} €` : ""}. Puteți oferi mai multe detalii?`
  );

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 pb-24">

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-zinc-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-zinc-400 text-sm font-bold">
              {lightboxIdx + 1} / {images.length}
            </div>

            {/* Prev / Next */}
            <button
              onClick={(e) => { e.stopPropagation(); prevLb(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-zinc-800/80 hover:bg-zinc-700 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextLb(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-zinc-800/80 hover:bg-zinc-700 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl max-h-[85vh] aspect-[16/9] mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={images[lightboxIdx]} alt={`${bike.brand} ${bike.model}`} fill className="object-contain" />
            </motion.div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-2" onClick={(e) => e.stopPropagation()}>
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIdx(i)}
                    className={`relative flex-shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all ${i === lightboxIdx ? "border-red-500" : "border-zinc-700 opacity-50 hover:opacity-80"}`}
                  >
                    <Image src={src} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <Link href={`/${locale}/motociclete-rulate`}
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Înapoi la motociclete rulate
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ── LEFT: Gallery (col 1-7) ── */}
          <div className="lg:col-span-7">
            {/* Main image */}
            <motion.div
              key={activeImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-zinc-900 mb-3 cursor-zoom-in"
              onClick={() => openLightbox(activeImg)}
            >
              <Image
                src={images[activeImg]}
                alt={`${bike.brand} ${bike.model}`}
                fill
                className="object-cover"
                priority
              />
              <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-black uppercase tracking-widest rounded-sm ${
                bike.type === "new" ? "bg-red-600 text-white" : "bg-zinc-800/90 text-zinc-200 border border-zinc-700/60"
              }`}>
                {bike.type === "new" ? "NOU" : "RULAT"}
              </div>
              {/* Expand hint */}
              <div className="absolute top-4 right-4 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </motion.div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="grid grid-cols-7 gap-1.5">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative aspect-square rounded-sm overflow-hidden border-2 transition-all duration-200 ${
                      i === activeImg ? "border-red-500 scale-105 shadow-lg shadow-red-900/30" : "border-transparent hover:border-zinc-600 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={src} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Details (col 8-12) ── */}
          <div className="lg:col-span-5">
            {/* Title */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">{bike.brand}</p>
              <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-2">
                {bike.model}
              </h1>
              <p className="text-zinc-500 text-sm mb-6">
                {bike.year} · {formatKm(bike.km)} km · {bike.color}
              </p>

              {/* Price card */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6 mb-6">
                {bike.price > 0 ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white leading-none">
                      {bike.price.toLocaleString("de-DE")}
                    </span>
                    <span className="text-5xl font-black text-red-500 leading-none">€</span>
                    {bike.type === "used" && (
                      <span className="text-zinc-500 text-sm ml-1">+ TVA</span>
                    )}
                  </div>
                ) : (
                  <p className="text-2xl font-black text-zinc-300">Preț la cerere</p>
                )}
                {bike.warranty && (
                  <div className="flex items-center gap-2 mt-3 text-emerald-400 text-sm font-medium">
                    <Shield className="w-4 h-4 flex-shrink-0" />
                    <span>{bike.warranty}</span>
                  </div>
                )}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-3 mb-6">
                <a href={`tel:${contactInfo.phone1}`}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-sm uppercase tracking-wide text-sm transition-all duration-200 shadow-xl shadow-red-900/30 hover:-translate-y-0.5 active:translate-y-0">
                  <Phone className="w-4 h-4" />
                  {contactInfo.phone1}
                </a>
                <a
                  href={`https://wa.me/${contactInfo.phone1.replace(/[^0-9]/g, "")}?text=${whatsappMsg}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-sm uppercase tracking-wide text-sm transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <a href={`mailto:${contactInfo.email}?subject=${encodeURIComponent(`Interes: ${bike.brand} ${bike.model} ${bike.year}`)}`}
                  className="flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-bold py-3.5 rounded-sm uppercase tracking-wide text-sm transition-all duration-200 hover:-translate-y-0.5">
                  <Mail className="w-4 h-4" />
                  Trimite email
                </a>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {[
                  { icon: Calendar, label: "An fabricație", value: bike.year.toString() },
                  { icon: Gauge,    label: "Kilometri",     value: `${formatKm(bike.km)} km` },
                  { icon: Zap,      label: "Motor",         value: bike.engine },
                  { icon: Zap,      label: "Putere",        value: bike.power },
                  ...(bike.torque ? [{ icon: Zap,    label: "Cuplu",    value: bike.torque }] : []),
                  ...(bike.weight ? [{ icon: Weight, label: "Greutate", value: bike.weight }] : []),
                ].map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div key={spec.label} className="flex items-center gap-3 p-3.5 bg-zinc-900 border border-zinc-800/80 rounded-sm">
                      <div className="flex-shrink-0 w-9 h-9 rounded bg-zinc-800 border border-zinc-700/60 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-red-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-zinc-500 text-[10px] uppercase tracking-wider">{spec.label}</p>
                        <p className="text-white font-bold text-sm truncate">{spec.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Description + Extras — full width below */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 border-t border-zinc-800/60 pt-10">
          {/* Description */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-sm p-7 relative overflow-hidden">
            {/* Accent corner */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-600 via-red-600/40 to-transparent rounded-l-sm" />
            <h2 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-5 flex items-center gap-3">
              <span className="text-red-500 text-lg">&#9632;</span>
              Descriere
            </h2>
            <p className="text-zinc-300 leading-relaxed text-[15px]">{bike.description}</p>
          </div>

          {/* Extras */}
          {bike.extras && bike.extras.length > 0 && (
            <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-sm p-7 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-600 via-red-600/40 to-transparent rounded-l-sm" />
              <h2 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-5 flex items-center gap-3">
                <span className="text-red-500 text-lg">&#9632;</span>
                Dotări & accesorii
              </h2>
              <ul className="space-y-2">
                {bike.extras.map((extra) => (
                  <li key={extra} className="flex items-start gap-3 group">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-600/15 border border-red-600/30 flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-3 h-3 text-red-400" />
                    </span>
                    <span className="text-zinc-300 text-sm leading-relaxed group-hover:text-white transition-colors">{extra}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Similar bikes */}
        {similar.length > 0 && (
          <div className="mt-16 border-t border-zinc-800/60 pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-1">Mai vezi și</p>
                <h2 className="text-2xl font-black text-white">Motociclete similare</h2>
              </div>
              <Link href={`/${locale}/motociclete-rulate`}
                className="group inline-flex items-center gap-1.5 text-zinc-500 hover:text-white text-sm transition-colors">
                Toate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similar.map((sb, i) => (
                <motion.div
                  key={sb.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link href={`/${locale}/motociclete-rulate/${sb.id}`}
                    className="group block bg-zinc-900 border border-zinc-800 hover:border-red-600/40 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-950/20">
                    <div className="relative h-44 bg-zinc-800 overflow-hidden">
                      <Image src={sb.image} alt={`${sb.brand} ${sb.model}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent" />
                    </div>
                    <div className="p-4">
                      <p className="text-red-500 text-[11px] font-bold uppercase tracking-widest mb-1">{sb.brand}</p>
                      <h3 className="text-white font-black text-base mb-2">{sb.model}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-white font-black">{sb.price?.toLocaleString("de-DE")} <span className="text-red-500 text-sm">€</span></p>
                        <span className="text-zinc-500 text-xs">{sb.year} · {formatKm(sb.km)} km</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
