import { type Locale } from "@/lib/i18n";
import Hero from "@/components/sections/Hero";
import Brands from "@/components/sections/Brands";
import FeaturedBikes from "@/components/sections/FeaturedBikes";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import CtaBanner from "@/components/sections/CtaBanner";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Hero locale={locale as Locale} />
      <Brands />
      <FeaturedBikes locale={locale as Locale} />
      <Services locale={locale as Locale} />
      <Testimonials />
      <CtaBanner locale={locale as Locale} />
    </>
  );
}
