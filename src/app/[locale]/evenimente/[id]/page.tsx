import { notFound } from "next/navigation";
import { client, EVENT_BY_SLUG_QUERY, type SanityEvent } from "@/sanity/client";
import EventDetailClient from "./EventDetailClient";

export const revalidate = 60;

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  let event: SanityEvent | null = null;
  try {
    event = await client.fetch(EVENT_BY_SLUG_QUERY, { slug: id });
  } catch {}

  if (!event) notFound();
  return <EventDetailClient event={event} locale={locale} />;
}
