import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, ArrowRight, CheckCircle } from "lucide-react";
import { bikes, contactInfo } from "@/lib/data";
import { formatKm, bikeCover } from "@/lib/utils";
import { client, USED_BIKES_BY_BRAND_QUERY, type SanityBikeCard } from "@/sanity/client";

export const revalidate = 60;

const brandInfo: Record<string, {
  name: string;
  tagline?: string;
  desc: string;
  origin?: string;
  website?: string;
  color: string;
}> = {
  ducati: {
    name: "Ducati",
    tagline: "L'Arte della Velocità",
    desc: "Ducati produce unele dintre cele mai dorite motociclete din lume — o fuziune perfectă între inginerie italiană, design îndrăzneț și performanță pură.",
    origin: "Bologna, Italia · din 1926",
    website: "https://ducaticonstanta.ro/",
    color: "from-red-900/40",
  },
  benelli: {
    name: "Benelli",
    tagline: "Pure Italian Motorcycle DNA",
    desc: "Benelli îmbină tradiția moto italiană cu accesibilitatea. Modele versatile de adventure, naked și touring, perfecte pentru orice tip de rider.",
    origin: "Pesaro, Italia · din 1911",
    website: "https://www.benelli-moto.ro/",
    color: "from-blue-900/30",
  },
  italjet: {
    name: "Italjet",
    tagline: "Italian Design Scooters",
    desc: "Italjet Moto proiectează scutere cu design revoluționar și soluții tehnice inovatoare. Dragster-ul lor este un icon al designului italian.",
    origin: "Bologna, Italia · din 1966",
    website: "https://www.italjet.com/en",
    color: "from-orange-900/30",
  },
  daytona: {
    name: "Daytona",
    desc: "Modele noi Daytona disponibile prin HobbyMoto. Contactează-ne pentru stoc, configurații și prețuri actualizate.",
    website: "https://daytona-romania.ro/",
    color: "from-zinc-700/30",
  },
  zontes: {
    name: "Zontes",
    desc: "Modele noi Zontes disponibile prin HobbyMoto. Contactează-ne pentru stoc, configurații și prețuri actualizate.",
    website: "https://zontes.ro/",
    color: "from-zinc-700/30",
  },
  sym: {
    name: "SYM",
    desc: "Modele noi SYM disponibile prin HobbyMoto. Contactează-ne pentru stoc, configurații și prețuri actualizate.",
    website: "https://sym-romania.ro/",
    color: "from-zinc-700/30",
  },
  kove: {
    name: "Kove",
    desc: "Modele noi Kove disponibile prin HobbyMoto. Contactează-ne pentru stoc, configurații și prețuri actualizate.",
    website: "https://kove-romania.ro/",
    color: "from-zinc-700/30",
  },
};

export default async function BrandPage({
  params,
}: {
  params: Promise<{ locale: string; brand: string }>;
}) {
  const { locale, brand } = await params;
  const slug = brand.toLowerCase();
  // Own-property check: a plain lookup would match inherited keys like "constructor".
  if (!Object.hasOwn(brandInfo, slug)) notFound();
  const info = brandInfo[slug];

  const brandBikes = bikes.filter(
    (b) => b.brand.toLowerCase() === slug && b.type === "new"
  );

  let usedBikes: SanityBikeCard[] = [];
  try {
    usedBikes = await client.fetch(USED_BIKES_BY_BRAND_QUERY, { brand: slug });
  } catch {
    usedBikes = [];
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-20">

      {/* Brand hero */}
      <section className={`relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r ${info.color} to-zinc-950`}>
        <div className="absolute inset-0 bg-zinc-950/60" />
        <div className="relative max-w-5xl mx-auto">
          <Link href={`/${locale}/motociclete-noi/ducati`} className="text-zinc-500 hover:text-white text-sm mb-6 inline-flex items-center gap-2 transition-colors">
            ← Motociclete noi
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <div className="flex-1">
              {info.origin && <p className="eyebrow mb-2">{info.origin}</p>}
              <h1 className="text-4xl sm:text-6xl font-black text-white mb-2">{info.name}</h1>
              {info.tagline && <p className="text-zinc-400 text-xl italic">{info.tagline}</p>}
            </div>
            {info.website && (
            <a
              href={info.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-zinc-700 hover:border-red-600 text-zinc-300 hover:text-white px-5 py-2.5 rounded-sm text-sm font-bold uppercase tracking-wide transition-all"
            >
              Website oficial <ArrowRight className="w-4 h-4" />
            </a>
            )}
          </div>
          <p className="text-zinc-400 text-lg max-w-2xl mt-6 leading-relaxed">{info.desc}</p>
        </div>
      </section>

      {/* New bikes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-8">
            {brandBikes.length > 0 ? `Modele noi disponibile` : `Stoc nou în curând`}
          </h2>

          {brandBikes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandBikes.map((bike) => (
                <div key={bike.id} className="group bg-zinc-900 border border-zinc-800 hover:border-red-600/40 rounded-sm overflow-hidden transition-all">
                  <div className="relative h-48 bg-zinc-800">
                    <Image src={bike.image} alt={`${bike.brand} ${bike.model}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-red-600 text-white text-[10px] font-black uppercase rounded-sm">NOU</div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-black text-xl mb-2">{bike.model}</h3>
                    <p className="text-zinc-500 text-sm mb-1">{bike.engine} · {bike.power} · {bike.year}</p>
                    {bike.warranty && <p className="text-green-500 text-xs mb-4">✓ Garanție {bike.warranty}</p>}
                    {bike.price ? (
                      <p className="text-white font-black text-xl mb-4">{bike.price.toLocaleString("de-DE")} €</p>
                    ) : (
                      <p className="text-zinc-400 text-sm mb-4">Preț la cerere</p>
                    )}
                    <a href={`tel:${contactInfo.phone1}`} className="btn btn-primary w-full text-xs py-3">
                      <Phone className="w-3 h-3" /> Solicită ofertă
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-12 text-center">
              <p className="text-zinc-500 mb-4">Stoc nou {info.name} disponibil la cerere.</p>
              <p className="text-zinc-400 text-lg font-bold mb-6">Contactează-ne pentru disponibilitate și prețuri actualizate.</p>
              <a href={`tel:${contactInfo.phone1}`} className="btn btn-primary px-8 py-4 text-sm">
                <Phone className="w-4 h-4" /> {contactInfo.phone1}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Used bikes of same brand */}
      {usedBikes.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-900/30 border-t border-zinc-800/60">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-black text-white mb-6">{info.name} rulate disponibile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {usedBikes.map((bike) => {
                const cover = bikeCover(bike);
                return (
                  <Link key={bike.id} href={`/${locale}/motociclete-rulate/${bike.id}`} className="flex gap-4 bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden hover:border-zinc-600 transition-colors">
                    <div className="relative w-32 h-28 flex-shrink-0 bg-zinc-800">
                      {cover && <Image src={cover} alt={`${bike.brand} ${bike.model}`} fill sizes="128px" className="object-cover" />}
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-white font-bold">{bike.model}</h3>
                        <p className="text-zinc-500 text-xs">
                          {bike.year} · {formatKm(bike.km)} km{bike.engine ? ` · ${bike.engine}` : ""}
                        </p>
                      </div>
                      <span className="text-red-500 text-xs font-bold uppercase tracking-wide">
                        Vezi detalii →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Why buy from us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-white mb-8">De ce să cumperi {info.name} de la HobbyMoto?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Dealer oficial autorizat",
              "Garanție producător",
              "Service certificat",
              "Înmatriculare gratuită",
              "Transport gratuit în România",
              "Finanțare avantajoasă",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-sm">
                <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-zinc-300 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
