import { getTranslations } from "next-intl/server";
import { client, EVENTS_QUERY, type SanityEvent } from "@/sanity/client";
import SectionHeading from "@/components/ui/SectionHeading";
import EventRow from "@/components/events/EventRow";

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

  const now = new Date();
  const upcoming = events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const displayed = upcoming.length > 0 ? upcoming.slice(0, 3) : events.slice(0, 3);

  if (displayed.length === 0) return null;

  return (
    <section className="bg-zinc-950 py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          index="02"
          eyebrow={t("sectionLabel")}
          title={upcoming.length > 0 ? t("sectionTitleUpcoming") : t("sectionTitleRecent")}
          subtitle={t("sectionSubtitle")}
          action={{ href: `/${locale}/evenimente`, label: t("viewAll") }}
        />

        <div className="border-t border-zinc-800">
          {displayed.map((event) => (
            <EventRow
              key={event.id}
              event={event}
              locale={locale}
              upcomingLabel={t("upcoming")}
              categoryLabel={event.category ? categoryLabels[event.category] ?? event.category : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
