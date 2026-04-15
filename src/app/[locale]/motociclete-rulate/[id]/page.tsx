"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, Mail, ArrowLeft, Gauge, Calendar, Zap, Weight, CheckCircle, Shield } from "lucide-react";
import { bikes, contactInfo } from "@/lib/data";
import { formatKm } from "@/lib/utils";
import { type Locale } from "@/lib/i18n";

export default function BikeDetailPage() {
  const params = useParams();
  const locale = (params.locale as Locale) ?? "ro";
  const id = params.id as string;

  const bike = bikes.find((b) => b.id === id);
  if (!bike) notFound();

  const [activeImg, setActiveImg] = useState(0);
  const images = bike.gallery.length > 0 ? bike.gallery : [bike.image];

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 pb-20">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href={`/${locale}/motociclete-rulate`}
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Înapoi la motociclete rulate
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── LEFT: Image gallery ── */}
          <div>
            {/* Main image */}
            <motion.div
              key={activeImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="relative aspect-[4/3] rounded-sm overflow-hidden bg-zinc-800 mb-3"
            >
              <Image
                src={images[activeImg]}
                alt={`${bike.brand} ${bike.model}`}
                fill
                className="object-cover"
                priority
              />
              {/* Type badge */}
              <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-black uppercase tracking-widest rounded-sm ${
                bike.type === "new" ? "bg-red-600 text-white" : "bg-zinc-700/90 text-zinc-200"
              }`}>
                {bike.type === "new" ? "NOU" : "RULAT"}
              </div>
            </motion.div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="grid grid-cols-6 gap-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative aspect-square rounded-sm overflow-hidden bg-zinc-800 border-2 transition-all ${
                      i === activeImg ? "border-red-500" : "border-transparent hover:border-zinc-600"
                    }`}
                  >
                    <Image src={src} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Details ── */}
          <div>
            {/* Title */}
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">{bike.brand}</p>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-2">
              {bike.model}
            </h1>
            <p className="text-zinc-500 text-sm mb-6">{bike.year} · {formatKm(bike.km)} km · {bike.color}</p>

            {/* Price */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-6 mb-6">
              {bike.price > 0 ? (
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black text-white">
                    {bike.price.toLocaleString("de-DE")}
                  </span>
                  <span className="text-2xl font-bold text-red-500 mb-1">€</span>
                  {bike.type === "used" && (
                    <span className="text-zinc-500 text-sm mb-1 ml-1">+ TVA</span>
                  )}
                </div>
              ) : (
                <p className="text-2xl font-black text-zinc-300">Preț la cerere</p>
              )}
              {bike.warranty && (
                <div className="flex items-center gap-2 mt-3 text-green-400 text-sm">
                  <Shield className="w-4 h-4" />
                  <span>{bike.warranty}</span>
                </div>
              )}
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: Calendar, label: "An fabricație", value: bike.year.toString() },
                { icon: Gauge,    label: "Kilometri",     value: `${formatKm(bike.km)} km` },
                { icon: Zap,      label: "Motor",         value: bike.engine },
                { icon: Zap,      label: "Putere",        value: bike.power },
                ...(bike.torque ? [{ icon: Zap, label: "Cuplu", value: bike.torque }] : []),
                ...(bike.weight ? [{ icon: Weight, label: "Greutate", value: bike.weight }] : []),
              ].map((spec) => {
                const Icon = spec.icon;
                return (
                  <div key={spec.label} className="flex items-start gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-sm">
                    <Icon className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-zinc-600 text-xs uppercase tracking-wider">{spec.label}</p>
                      <p className="text-white font-bold text-sm">{spec.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-3">Descriere</h2>
              <p className="text-zinc-400 leading-relaxed">{bike.description}</p>
            </div>

            {/* Extras */}
            {bike.extras && bike.extras.length > 0 && (
              <div className="mb-8">
                <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-3">Dotări & accesorii</h2>
                <ul className="space-y-2">
                  {bike.extras.map((extra) => (
                    <li key={extra} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm">{extra}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${contactInfo.phone1}`}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-sm uppercase tracking-wide text-sm transition-colors shadow-lg shadow-red-900/30"
              >
                <Phone className="w-4 h-4" />
                {contactInfo.phone1}
              </a>
              <a
                href={`mailto:${contactInfo.email}?subject=${encodeURIComponent(`Interes: ${bike.brand} ${bike.model} ${bike.year}`)}`}
                className="flex-1 flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-bold py-4 rounded-sm uppercase tracking-wide text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                Trimite email
              </a>
            </div>

            <p className="text-zinc-600 text-xs text-center mt-3">
              Transport gratuit în toată România la cerere
            </p>
          </div>
        </div>

        {/* Related bikes */}
        <RelatedBikes current={bike} locale={locale} />
      </div>
    </div>
  );
}

function RelatedBikes({ current, locale }: { current: (typeof bikes)[0]; locale: Locale }) {
  const related = bikes
    .filter((b) => b.id !== current.id && b.type === "used")
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-20 pt-12 border-t border-zinc-800/60">
      <h2 className="text-2xl font-black text-white mb-8">Alte motociclete disponibile</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {related.map((bike) => (
          <Link
            key={bike.id}
            href={`/${locale}/motociclete-rulate/${bike.id}`}
            className="group bg-zinc-900 border border-zinc-800 hover:border-red-600/40 rounded-sm overflow-hidden transition-all hover:-translate-y-1"
          >
            <div className="relative h-40 bg-zinc-800">
              <Image src={bike.image} alt={`${bike.brand} ${bike.model}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4">
              <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-1">{bike.brand}</p>
              <h3 className="text-white font-black">{bike.model}</h3>
              <p className="text-zinc-500 text-xs mt-1">{bike.year} · {formatKm(bike.km)} km</p>
              <p className="text-white font-bold mt-2">{bike.price.toLocaleString("de-DE")} €</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
