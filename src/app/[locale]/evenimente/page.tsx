import { client, EVENTS_QUERY, type SanityEvent } from "@/sanity/client";
import EventsClient from "@/components/events/EventsClient";

export const revalidate = 60;

export default async function EvenimentePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let events: SanityEvent[] = [];
  try {
    events = await client.fetch(EVENTS_QUERY, { locale });
  } catch {
    events = [];
  }
  return <EventsClient events={events} locale={locale} />;
}
