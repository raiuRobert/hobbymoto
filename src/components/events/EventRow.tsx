import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { type SanityEvent } from "@/sanity/client";
import { SITE_TIME_ZONE } from "@/lib/utils";

const LOCALE_MAP: Record<string, string> = { ro: "ro-RO", en: "en-US" };

interface EventRowProps {
  event: SanityEvent;
  locale: string;
  upcomingLabel: string;
  categoryLabel?: string;
}

export default function EventRow({ event, locale, upcomingLabel, categoryLabel }: EventRowProps) {
  const date = new Date(event.date);
  const intlLocale = LOCALE_MAP[locale] ?? locale;
  const day = date.toLocaleDateString(intlLocale, { day: "2-digit", timeZone: SITE_TIME_ZONE });
  const monthYear = date.toLocaleDateString(intlLocale, { month: "short", year: "numeric", timeZone: SITE_TIME_ZONE });
  const upcoming = date >= new Date();

  return (
    <Link
      href={`/${locale}/evenimente/${event.id}`}
      className="group grid grid-cols-[4.5rem_1fr_auto] sm:grid-cols-[7rem_1fr_auto] gap-x-5 sm:gap-x-8 items-center py-7 border-b border-zinc-800 hover:border-red-600 transition-colors duration-300"
    >
      <div>
        <p className={`font-display text-4xl sm:text-5xl font-black leading-none ${upcoming ? "text-white" : "text-zinc-600"}`}>{day}</p>
        <p className="label mt-2.5">{monthYear}</p>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2.5">
          {upcoming && <span className="label text-red-500">{upcomingLabel}</span>}
          {categoryLabel && <span className="label">{categoryLabel}</span>}
          {event.location && (
            <span className="label inline-flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              {event.location}
            </span>
          )}
        </div>
        <h3 className="text-white font-extrabold text-xl sm:text-2xl leading-tight transition-colors group-hover:text-red-500">
          {event.title}
        </h3>
        {event.excerpt && (
          <p className="text-zinc-400 text-sm leading-relaxed mt-2 line-clamp-2 max-w-2xl">{event.excerpt}</p>
        )}
      </div>

      <div className="flex items-center gap-6">
        {event.image && (
          <div className="relative hidden md:block w-36 aspect-[4/3] overflow-hidden bg-zinc-900">
            <Image
              src={event.image}
              alt=""
              fill
              sizes="144px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          </div>
        )}
        <ArrowUpRight className="w-5 h-5 text-zinc-600 transition-all duration-300 group-hover:text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
