import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, ArrowRight, CheckCircle } from "lucide-react";
import { bikes, contactInfo } from "@/lib/data";
import { type Locale } from "@/lib/i18n";

const brandInfo: Record<string, {
  name: string;
  tagline: string;
  desc: string;
  origin: string;
  website: string;
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
  indian: {
    name: "Indian",
    tagline: "America's First Motorcycle",
    desc: "Indian Motorcycle este cel mai vechi brand de motociclete din America, cunoscut pentru cruisere cu caracter aparte, calitate premium și tehnologie modernă.",
    origin: "Springfield, SUA · din 1901",
    website: "https://ducaticonstanta.ro/",
    color: "from-zinc-700/40",
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
  malaguti: {
    name: "Malaguti",
    tagline: "Adventure Spirit",
    desc: "Malaguti oferă scutere și motociclete ușoare cu calitate europeană, perfecte pentru mobilitate urbană și aventuri pe distanțe scurte.",
    origin: "Bologna, Italia · din 1930",
    website: "https://ducaticonstanta.ro/",
    color: "from-green-900/20",
  },
  lambretta: {
    name: "Lambretta",
    tagline: "The Original Italian Icon",
    desc: "Lambretta este un simbol al culturii italiene postbelice. Scuterele lor clasice și moderne combină stilul retro cu tehnologia contemporană.",
    origin: "Milano, Italia · din 1947",
    website: "https://ducaticonstanta.ro/",
    color: "from-zinc-600/30",
  },
};

export default async function BrandPage({
  params,
}: {
  params: Promise<{ locale: string; brand: string }>;
}) {
  const { locale, brand } = await params;
  const info = brandInfo[brand.toLowerCase()];
  if (!info) notFound();

  const brandBikes = bikes.filter(
    (b) => b.brand.toLowerCase() === brand.toLowerCase() && b.type === "new"
  );
  const usedBikes = bikes.filter(
    (b) => b.brand.toLowerCase() === brand.toLowerCase() && b.type === "used"
  );

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
              <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">{info.origin}</p>
              <h1 className="text-6xl sm:text-7xl font-black text-white mb-2">{info.name}</h1>
              <p className="text-zinc-400 text-xl italic">{info.tagline}</p>
            </div>
            <a
              href={info.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-zinc-700 hover:border-red-600 text-zinc-300 hover:text-white px-5 py-2.5 rounded-sm text-sm font-bold uppercase tracking-wide transition-all"
            >
              Website oficial <ArrowRight className="w-4 h-4" />
            </a>
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
                <div key={bike.id} className="group bg-zinc-900 border border-zinc-800 hover:border-red-600/40 rounded-sm overflow-hidden transition-all hover:-translate-y-1">
                  <div className="relative h-48 bg-zinc-800">
                    <Image src={bike.image} alt={`${bike.brand} ${bike.model}`} fill className="object-cover" />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-red-600 text-white text-[10px] font-black uppercase rounded-sm">NOU</div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-black text-xl mb-2">{bike.model}</h3>
                    <p className="text-zinc-500 text-sm mb-1">{bike.engine} · {bike.power} · {bike.year}</p>
                    {bike.warranty && <p className="text-green-500 text-xs mb-4">✓ Garanție {bike.warranty}</p>}
                    {bike.price ? (
                      <p className="text-white font-black text-xl mb-4">{bike.price.toLocaleString()} €</p>
                    ) : (
                      <p className="text-zinc-400 text-sm mb-4">Preț la cerere</p>
                    )}
                    <a href={`tel:${contactInfo.phone1}`} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-3 rounded-sm uppercase tracking-wide transition-colors">
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
              <a href={`tel:${contactInfo.phone1}`} className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-4 rounded-sm uppercase text-sm transition-colors">
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
              {usedBikes.map((bike) => (
                <div key={bike.id} className="flex gap-4 bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden hover:border-zinc-600 transition-colors">
                  <div className="relative w-32 h-28 flex-shrink-0 bg-zinc-800">
                    <Image src={bike.image} alt={`${bike.brand} ${bike.model}`} fill className="object-cover" />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-white font-bold">{bike.model}</h3>
                      <p className="text-zinc-500 text-xs">{bike.year} · {bike.km.toLocaleString()} km · {bike.engine}</p>
                    </div>
                    <a href={`tel:${contactInfo.phone1}`} className="text-red-500 hover:text-red-400 text-xs font-bold uppercase tracking-wide transition-colors">
                      Sună pentru preț →
                    </a>
                  </div>
                </div>
              ))}
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
