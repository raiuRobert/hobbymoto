import { client, USED_BIKES_QUERY, type SanityBike } from "@/sanity/client";
import RulateClient from "./RulateClient";

// Re-fetch from Sanity at most every 60 seconds (stale-while-revalidate)
export const revalidate = 60;

export default async function MotocicletaRulatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let bikes: SanityBike[] = [];
  try {
    bikes = await client.fetch(USED_BIKES_QUERY);
  } catch {
    // If Sanity isn't configured yet, show empty state rather than crashing
    bikes = [];
  }

  return <RulateClient bikes={bikes} locale={locale} />;
}
