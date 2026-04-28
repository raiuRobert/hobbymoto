"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Tag } from "lucide-react";
import { type SanityEvent } from "@/sanity/client";

interface Props {
  events: SanityEvent[];
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
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isUpcoming(iso: string) {
  return new Date(iso) >= new Date();
}

type Tab = "toate" | "viitoare" | "trecute";

export default function EventsClient({ events, locale }: Props) {
  const [tab, setTab] = useState<Tab>("toate");

  const filtered = useMemo(() => {
    if (tab === "viitoare")
      return events
        .filter((e) => isUpcoming(e.date))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    if (tab === "trecute")
      return events.filter((e) => !isUpcoming(e.date));
    return events;
  }, [events, tab]);

  const tabs: { key: Tab; label: string }[] = [
    { key: "toate", label: "Toate" },
    { key: "viitoare", label: "Viitoare" },
    { key: "trecute", label: "Trecute" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <p className="text-red-500 text-xs font-bold uppercase tracking-[0.25em] mb-3">
          HobbyMoto
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Evenimente
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl">
          Test ride-uri, expoziții, meetup-uri și altele. Fii la curent cu tot ce se întâmplă la HobbyMoto.
        </p>

        {/* Tabs */}
        <div className="flex gap-1 mt-8 bg-zinc-900 rounded-sm p-1 w-fit">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2 text-sm font-semibold rounded-sm transition-all duration-200 ${
                tab === t.key
                  ? "bg-red-600 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <p className="text-zinc-500 text-center py-20">
            Niciun eveniment găsit.
          </p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Link href={`/${locale}/evenimente/${event.id}`} className="group block h-full">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:border-zinc-600 group-hover:shadow-xl group-hover:shadow-black/40">
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-zinc-800">
                      {event.image ? (
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Calendar className="w-12 h-12 text-zinc-700" />
                        </div>
                      )}
                      {/* Upcoming badge */}
                      {isUpcoming(event.date) && (
                        <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
                          Urmează
                        </span>
                      )}
                      {/* Category badge */}
                      {event.category && (
                        <span className="absolute top-3 right-3 bg-zinc-900/80 backdrop-blur text-zinc-300 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                          {CATEGORY_LABELS[event.category] ?? event.category}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5 gap-3">
                      {/* Date & Location */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        <span className="flex items-center gap-1.5 text-red-500 text-xs font-semibold">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(event.date)}
                        </span>
                        {event.location && (
                          <span className="flex items-center gap-1.5 text-zinc-500 text-xs">
                            <MapPin className="w-3.5 h-3.5" />
                            {event.location}
                          </span>
                        )}
                      </div>

                      <h2 className="text-white font-bold text-lg leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
                        {event.title}
                      </h2>

                      {event.excerpt && (
                        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 flex-1">
                          {event.excerpt}
                        </p>
                      )}

                      <span className="text-red-500 text-sm font-semibold mt-auto pt-1 group-hover:underline">
                        Citește mai mult →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
