import { client, RENTAL_BIKES_QUERY, type SanityRentalBike } from "@/sanity/client";
import InchirieriClient from "@/components/rental/InchirieriClient";

export const revalidate = 60;

export default async function Inchirieri({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let bikes: SanityRentalBike[] = [];
  try {
    bikes = await client.fetch(RENTAL_BIKES_QUERY);
  } catch {
    bikes = [];
  }

  return <InchirieriClient bikes={bikes} locale={locale} />;
}
