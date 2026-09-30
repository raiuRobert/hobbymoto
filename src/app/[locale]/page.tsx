import { type Locale } from "@/lib/i18n";
import { client, FEATURED_BIKES_QUERY, type SanityBike } from "@/sanity/client";
import Hero from "@/components/sections/Hero";
import Brands from "@/components/sections/Brands";
import FeaturedBikes from "@/components/sections/FeaturedBikes";
import EventsPreview from "@/components/sections/EventsPreview";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import CtaBanner from "@/components/sections/CtaBanner";

export const revalidate = 60;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let featured: SanityBike[] = [];
  try {
    featured = await client.fetch(FEATURED_BIKES_QUERY);
  } catch {
    featured = [];
  }

  return (
    <>
      <Hero locale={locale as Locale} />
      <Brands />
      <FeaturedBikes bikes={featured} locale={locale as Locale} />
      <EventsPreview locale={locale} />
      <Services locale={locale as Locale} />
      <Testimonials />
      <CtaBanner locale={locale as Locale} />
    </>
  );
}
