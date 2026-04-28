import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { client, EVENTS_QUERY, type SanityEvent } from "@/sanity/client";

const LOCALE_MAP: Record<string, string> = { ro: "ro-RO", en: "en-US" };

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(LOCALE_MAP[locale] ?? locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isUpcoming(iso: string) {
  return new Date(iso) >= new Date();
}

interface Props {
  locale: string;
}

export default async function EventsPreview({ locale }: Props) {
  const t = await getTranslations("events");

  const categoryLabels: Record<string, string> = {
    "test-ride": t("catTestRide"),
    expozitie: t("catExpozitie"),
    meetup: t("catMeetup"),
    promotie: t("catPromotie"),
    circuit: t("catCircuit"),
    altele: t("catAltele"),
  };

  let events: SanityEvent[] = [];
  try {
    events = await client.fetch(EVENTS_QUERY, { locale });
  } catch {
    events = [];
  }

  const upcoming = events
    .filter((e) => isUpcoming(e.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const displayed = upcoming.length > 0 ? upcoming.slice(0, 3) : events.slice(0, 3);

  if (displayed.length === 0) return null;

  return (
    <section className="bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">
              {t("sectionLabel")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              {upcoming.length > 0 ? t("sectionTitleUpcoming") : t("sectionTitleRecent")}
            </h2>
            <p className="text-zinc-500 mt-2 text-sm">
              {t("sectionSubtitle")}
            </p>
          </div>
          <Link
            href={`/${locale}/evenimente`}
            className="group inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold text-sm uppercase tracking-wide transition-colors shrink-0"
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((event) => (
            <Link
              key={event.id}
              href={`/${locale}/evenimente/${event.id}`}
              className="group block"
            >
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
                      <Calendar className="w-10 h-10 text-zinc-700" />
                    </div>
                  )}
                  {isUpcoming(event.date) && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
                      {t("upcoming")}
                    </span>
                  )}
                  {event.category && (
                    <span className="absolute top-3 right-3 bg-zinc-900/80 backdrop-blur text-zinc-300 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                      {categoryLabels[event.category] ?? event.category}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <span className="flex items-center gap-1.5 text-red-500 text-xs font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(event.date, locale)}
                    </span>
                    {event.location && (
                      <span className="flex items-center gap-1.5 text-zinc-500 text-xs">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.location}
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-lg leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  {event.excerpt && (
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 flex-1">
                      {event.excerpt}
                    </p>
                  )}
                  <span className="text-red-500 text-sm font-semibold mt-auto pt-1 group-hover:underline">
                    {t("readMore")} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
