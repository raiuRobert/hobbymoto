"use client";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { type SanityEvent } from "@/sanity/client";
import EventRow from "@/components/events/EventRow";

interface Props {
  events: SanityEvent[];
  locale: string;
}

function isUpcoming(iso: string) {
  return new Date(iso) >= new Date();
}

type Tab = "toate" | "viitoare" | "trecute";

export default function EventsClient({ events, locale }: Props) {
  const t = useTranslations("events");
  const [tab, setTab] = useState<Tab>("toate");

  const categoryLabels: Record<string, string> = {
    "test-ride": t("catTestRide"),
    expozitie: t("catExpozitie"),
    meetup: t("catMeetup"),
    promotie: t("catPromotie"),
    circuit: t("catCircuit"),
    altele: t("catAltele"),
  };

  const filtered = useMemo(() => {
    if (tab === "viitoare")
      return events
        .filter((e) => isUpcoming(e.date))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    if (tab === "trecute") return events.filter((e) => !isUpcoming(e.date));
    return events;
  }, [events, tab]);

  const tabs: { key: Tab; label: string }[] = [
    { key: "toate", label: t("tabAll") },
    { key: "viitoare", label: t("tabUpcoming") },
    { key: "trecute", label: t("tabPast") },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <p className="eyebrow mb-6">HobbyMoto</p>
        <h1 className="text-4xl sm:text-6xl font-black text-white leading-none mb-5">{t("title")}</h1>
        <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">{t("subtitle")}</p>

        <div role="tablist" className="flex gap-8 mt-12 border-b border-zinc-800">
          {tabs.map((tb) => (
            <button
              key={tb.key}
              role="tab"
              aria-selected={tab === tb.key}
              onClick={() => setTab(tb.key)}
              className={`label -mb-px pb-4 border-b-2 transition-colors ${
                tab === tb.key ? "border-red-600 text-white" : "border-transparent hover:text-zinc-200"
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-zinc-500 py-20">{t("noEvents")}</p>
        ) : (
          <div>
            {filtered.map((event) => (
              <EventRow
                key={event.id}
                event={event}
                locale={locale}
                upcomingLabel={t("upcoming")}
                categoryLabel={event.category ? categoryLabels[event.category] ?? event.category : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
