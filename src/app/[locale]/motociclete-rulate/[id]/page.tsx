import { notFound } from "next/navigation";
import { client, BIKE_BY_SLUG_QUERY, SIMILAR_BIKES_QUERY, type SanityBike, type SanityBikeCard } from "@/sanity/client";
import BikeDetailClient from "@/components/bikes/BikeDetailClient";

export const revalidate = 60;

export default async function BikeDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  let bike: SanityBike | null = null;
  let similar: SanityBikeCard[] = [];

  try {
    bike = await client.fetch(BIKE_BY_SLUG_QUERY, { slug: id });
    if (bike) {
      similar = await client.fetch(SIMILAR_BIKES_QUERY, {
        category: bike.category,
        slug: id,
      });
    }
  } catch {
    // Sanity not configured — fall through to notFound
  }

  if (!bike) notFound();

  return <BikeDetailClient bike={bike} similar={similar} locale={locale} />;
}
