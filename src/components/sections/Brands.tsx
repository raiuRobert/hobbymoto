"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { brands } from "@/lib/data";

export default function Brands() {
  const t = useTranslations("brands");
  // Doubled so the marquee loops without a seam.
  const doubled = [...brands, ...brands];

  return (
    <section className="bg-zinc-950 border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-stretch">
        <div className="md:w-64 shrink-0 py-6 md:py-9 md:pr-8 md:border-r md:border-zinc-800">
          <p className="eyebrow mb-2">{t("title")}</p>
          <p className="text-zinc-500 text-sm leading-snug">{t("subtitle")}</p>
        </div>

        <div className="relative flex-1 overflow-hidden flex items-center pb-7 md:pb-0">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee items-center">
            {doubled.map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                aria-hidden={i >= brands.length}
                className="relative shrink-0 w-32 h-10 mx-9 grayscale brightness-150 opacity-55 hover:grayscale-0 hover:brightness-100 hover:opacity-100 transition-all duration-300"
              >
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    sizes="128px"
                    className="object-contain"
                    unoptimized={brand.logo.endsWith(".svg")}
                  />
                ) : (
                  <span className="font-display absolute inset-0 flex items-center justify-center text-2xl font-black uppercase text-white">
                    {brand.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
