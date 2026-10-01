import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { formatKm, currencySymbol, bikeCover } from "@/lib/utils";
import { type SanityBikeCard } from "@/sanity/client";

interface BikeCardProps {
  bike: SanityBikeCard & { warranty?: string | null };
  locale: string;
  sizes: string;
  warrantyLabel?: string;
  priceOnRequestLabel?: string;
}

export default function BikeCard({
  bike,
  locale,
  sizes,
  warrantyLabel = "Garanție",
  priceOnRequestLabel = "Preț la cerere",
}: BikeCardProps) {
  const cover = bikeCover(bike);
  const specs = [bike.year, `${formatKm(bike.km)} km`, bike.engine?.split(" ")[0]].filter(Boolean);

  return (
    <Link href={`/${locale}/motociclete-rulate/${bike.id}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
        {cover && (
          <Image
            src={cover}
            alt={`${bike.brand} ${bike.model}`}
            fill
            sizes={sizes}
            quality={90}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}
        {bike.warranty && (
          <span className="label absolute left-0 bottom-0 bg-zinc-950 text-zinc-200 px-3 py-2">{warrantyLabel}</span>
        )}
      </div>

      <div className="pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="label text-red-500">{bike.brand}</p>
          <p className="label">{specs.join(" · ")}</p>
        </div>
        <h3 className="text-white font-extrabold text-xl leading-tight mt-2.5">{bike.model}</h3>
        <div className="mt-4 pt-3 border-t border-zinc-800 group-hover:border-red-600 transition-colors duration-300 flex items-center justify-between">
          {bike.price ? (
            <p className="text-white font-bold text-lg">
              {bike.price.toLocaleString("de-DE")}
              <span className="text-zinc-500 text-sm font-medium ml-1.5">{currencySymbol(bike.currency)}</span>
            </p>
          ) : (
            <p className="text-zinc-300 font-semibold text-sm">{priceOnRequestLabel}</p>
          )}
          <ArrowUpRight className="w-4 h-4 text-zinc-600 transition-all duration-300 group-hover:text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
