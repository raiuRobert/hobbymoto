"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ArrowLeft, X, ChevronLeft, ChevronRight, Tag, CalendarPlus } from "lucide-react";
import { type SanityEvent } from "@/sanity/client";

interface Props {
  event: SanityEvent;
  locale: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  "test-ride": "Test Ride",
  expozitie: "Expoziție",
  meetup: "Meetup",
  promotie: "Promoție",
  circuit: "Circuit",
  altele: "Altele",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ro-RO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("ro-RO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isUpcoming(iso: string) {
  return new Date(iso) >= new Date();
}

function googleCalendarUrl(event: SanityEvent) {
  const fmt = (iso: string) =>
    new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const start = fmt(event.date);
  const end = event.endDate ? fmt(event.endDate) : fmt(event.date);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    ...(event.location && { location: event.location }),
    ...(event.description && { details: event.description }),
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function EventDetailClient({ event, locale }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allImages = [
    ...(event.image ? [event.image] : []),
    ...(event.gallery ?? []),
  ];

  function prev() {
    setLightboxIndex((i) => (i === null ? 0 : (i - 1 + allImages.length) % allImages.length));
  }
  function next() {
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % allImages.length));
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-20">
      {/* Hero image */}
      {event.image && (
        <div className="relative h-[50vh] min-h-[320px] w-full overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back */}
        <Link
          href={`/${locale}/evenimente`}
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Înapoi la evenimente
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-4">
          {isUpcoming(event.date) && (
            <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
              Urmează
            </span>
          )}
          {event.category && (
            <span className="flex items-center gap-1.5 bg-zinc-800 text-zinc-300 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-sm">
              <Tag className="w-3 h-3" />
              {CATEGORY_LABELS[event.category] ?? event.category}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-6 leading-tight">
          {event.title}
        </h1>

        {/* Date / Location */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 p-5 bg-zinc-900 border border-zinc-800 rounded-sm items-start flex-wrap">
          <div className="flex items-start gap-3 flex-1">
            <Calendar className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-white font-semibold capitalize">{formatDate(event.date)}</p>
              <p className="text-zinc-400 text-sm">{formatTime(event.date)}
                {event.endDate && ` – ${formatTime(event.endDate)}`}
              </p>
            </div>
          </div>
          {event.location && (
            <div className="flex items-start gap-3 flex-1">
              <MapPin className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider mb-0.5">Locație</p>
                <p className="text-white font-semibold">{event.location}</p>
              </div>
            </div>
          )}
          {isUpcoming(event.date) && (
            <a
              href={googleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:ml-auto self-center bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-500 text-white text-sm font-semibold px-4 py-2.5 rounded-sm transition-all duration-200 shrink-0"
            >
              <CalendarPlus className="w-4 h-4 text-red-500" />
              Adaugă în Google Calendar
            </a>
          )}
        </div>

        {/* Description */}
        {event.description && (
          <div className="mb-12">
            <div className="w-8 h-1 bg-red-600 mb-4" />
            <p className="text-zinc-300 leading-relaxed whitespace-pre-line text-base">
              {event.description}
            </p>
          </div>
        )}

        {/* Gallery */}
        {allImages.length > 1 && (
          <div className="mb-12">
            <h2 className="text-white font-bold text-xl mb-4">Galerie foto</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {allImages.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className="relative aspect-video overflow-hidden rounded-sm bg-zinc-800 group cursor-zoom-in"
                >
                  <Image
                    src={src}
                    alt={`${event.title} foto ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
              onClick={() => setLightboxIndex(null)}
            >
              <X className="w-7 h-7" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            <div
              className="relative w-full max-w-4xl max-h-[85vh] aspect-video mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={allImages[lightboxIndex]}
                alt={event.title}
                fill
                className="object-contain"
                priority
              />
              <p className="absolute bottom-2 left-0 right-0 text-center text-zinc-400 text-sm">
                {lightboxIndex + 1} / {allImages.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
