import Image from "next/image";
import Link from "next/link";
import { Phone, CheckCircle, AlertCircle } from "lucide-react";
import { rentalBikes, contactInfo } from "@/lib/data";
import { type Locale } from "@/lib/i18n";

export default async function Inchirieri({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-20">

      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-transparent" />
          <div className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3">Servicii</p>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Rent a <span className="text-red-500">Moto</span>
          </h1>
          <p className="text-zinc-400 text-xl leading-relaxed max-w-2xl">
            Închiriază o motocicletă premium pentru o zi, un weekend sau o aventură mai lungă pe
            drumurile din România. Asigurare RCA inclusă, fără surprize.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-10 text-center">Tarife</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { duration: "1–3 zile", price: "€40–60", per: "/ zi", highlight: false },
              { duration: "4–10 zile", price: "€55", per: "/ zi", highlight: true },
              { duration: "10+ zile", price: "€50", per: "/ zi", highlight: false },
            ].map((tier) => (
              <div
                key={tier.duration}
                className={`relative rounded-sm p-8 text-center border transition-all ${
                  tier.highlight
                    ? "bg-red-600 border-red-500 shadow-xl shadow-red-900/30 scale-105"
                    : "bg-zinc-900 border-zinc-800"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-red-600 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
                <p className={`text-sm font-bold uppercase tracking-widest mb-3 ${tier.highlight ? "text-red-200" : "text-zinc-500"}`}>
                  {tier.duration}
                </p>
                <div className="flex items-end justify-center gap-1">
                  <span className={`text-5xl font-black ${tier.highlight ? "text-white" : "text-white"}`}>
                    {tier.price}
                  </span>
                  <span className={`text-sm mb-2 ${tier.highlight ? "text-red-200" : "text-zinc-500"}`}>
                    {tier.per}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Deposit note */}
          <div className="flex items-start gap-3 p-5 bg-zinc-900 border border-zinc-800 rounded-sm">
            <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-zinc-400 text-sm">
              <strong className="text-white">Garanție:</strong> €1.000 – €2.500 (în funcție de model), returnabilă integral la predarea motocicletei în stare bună.
              <strong className="text-white ml-1">Asigurare RCA inclusă</strong> în tarif.
            </p>
          </div>
        </div>
      </section>

      {/* Available bikes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-900/30 border-y border-zinc-800/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-10">Motociclete disponibile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rentalBikes.map((bike) => (
              <div key={bike.id} className="group bg-zinc-900 border border-zinc-800 hover:border-red-600/40 rounded-sm overflow-hidden transition-all hover:-translate-y-1">
                <div className="relative h-52 bg-zinc-800">
                  <Image
                    src={bike.image}
                    alt={`${bike.brand} ${bike.model}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-green-600 text-white text-[10px] font-black uppercase rounded-sm">
                    Disponibil
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-1">{bike.brand}</p>
                  <h3 className="text-white font-black text-2xl mb-3">{bike.model}</h3>
                  <div className="grid grid-cols-3 gap-3 mb-5 text-center">
                    <div className="bg-zinc-800 rounded p-2">
                      <p className="text-zinc-500 text-xs">An</p>
                      <p className="text-white font-bold text-sm">{bike.year}</p>
                    </div>
                    <div className="bg-zinc-800 rounded p-2">
                      <p className="text-zinc-500 text-xs">Motor</p>
                      <p className="text-white font-bold text-sm">{bike.engine}</p>
                    </div>
                    <div className="bg-zinc-800 rounded p-2">
                      <p className="text-zinc-500 text-xs">KM</p>
                      <p className="text-white font-bold text-sm">{bike.km.toLocaleString()}</p>
                    </div>
                  </div>
                  <a
                    href={`tel:${contactInfo.phone1}`}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-sm uppercase text-sm tracking-wide transition-colors"
                  >
                    <Phone className="w-4 h-4" /> Rezervă acum
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-black text-white mb-6">Ce este inclus</h2>
            <ul className="space-y-3">
              {[
                "Asigurare RCA inclusă",
                "Motocicletă verificată tehnic",
                "Suport telefonic 24/7",
                "Instrucțiuni și briefing la predare",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-black text-white mb-6">Condiții de închiriere</h2>
            <ul className="space-y-3">
              {[
                "Permis de conducere categoria A valabil",
                "Vârsta minimă 21 ani",
                "Garanție cash sau card bancar",
                "Predarea în starea inițială",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span className="text-zinc-400 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center bg-zinc-900 border border-zinc-800 rounded-sm p-12">
          <h2 className="text-3xl font-black text-white mb-3">Gata de aventură?</h2>
          <p className="text-zinc-400 mb-8">Sună-ne sau trimite un mesaj pentru rezervare și disponibilitate.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${contactInfo.phone1}`} className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-4 rounded-sm uppercase text-sm tracking-wide transition-colors">
              <Phone className="w-4 h-4" /> {contactInfo.phone1}
            </a>
            <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-bold px-8 py-4 rounded-sm uppercase text-sm transition-colors">
              Trimite mesaj
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
