"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, CheckCircle, AlertCircle } from "lucide-react";
import { contactInfo } from "@/lib/data";
import { formatKm } from "@/lib/utils";
import { type SanityRentalBike } from "@/sanity/client";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

const pricingTiers = [
  { duration: "1–3 zile", price: "€40–60", per: "/ zi", highlight: false, desc: "Perfect pentru un weekend" },
  { duration: "4–10 zile", price: "€55",   per: "/ zi", highlight: true,  desc: "Cel mai popular" },
  { duration: "10+ zile", price: "€50",    per: "/ zi", highlight: false, desc: "Tururi lungi" },
];

const included = [
  "Asigurare RCA inclusă în tarif",
  "Motocicletă verificată tehnic înainte de plecare",
  "Briefing complet la predare",
  "Suport telefonic pe durata închirierii",
];

const conditions = [
  "Permis de conducere categoria A valabil",
  "Vârsta minimă 21 de ani",
  "Garanție cash sau card: €1.000–€2.500",
  "Predarea în starea inițială",
];

export default function InchirieriClient({
  bikes,
  locale,
}: {
  bikes: SanityRentalBike[];
  locale: string;
}) {
  return (
    <div className="min-h-screen bg-zinc-950">

      {/* Hero */}
      <section className="relative pt-24 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/bikes/bmw-f800r.jpg" alt="Rent a Moto" fill className="object-cover opacity-25" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/70 to-zinc-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 to-zinc-950/20" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <p className="eyebrow mb-4">Servicii</p>
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-none mb-6">
              Rent a <span className="text-red-500">Moto</span>
            </h1>
            <p className="text-zinc-300 text-xl leading-relaxed max-w-2xl mb-10">
              Închiriază o motocicletă BMW premium pentru o zi, un weekend sau o aventură mai lungă
              pe drumurile din România. Asigurare RCA inclusă, fără surprize.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={`tel:${contactInfo.phone1}`}
                className="btn btn-primary px-8 py-4 text-sm">
                <Phone className="w-4 h-4" /> Verifică disponibilitatea
              </a>
              <Link href={`/${locale}/contact`}
                className="btn btn-ghost px-8 py-4 text-sm">
                Trimite mesaj
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)} className="border-t border-zinc-800 pt-5 mb-12">
            <p className="eyebrow mb-7">Tarife</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Prețuri clare, fără surprize</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-zinc-800 mb-8">
            {pricingTiers.map((tier, i) => (
              <motion.div key={tier.duration} {...fadeUp(i * 0.08)}
                className={`relative py-8 sm:px-8 border-b border-zinc-800 ${i === 0 ? "sm:pl-0" : "sm:border-l"}`}>
                {tier.highlight && <span className="absolute -top-px left-0 right-0 h-0.5 bg-red-600" />}
                <p className={`label mb-2 ${tier.highlight ? "text-red-500" : ""}`}>
                  {tier.duration}{tier.highlight && " · Popular"}
                </p>
                <p className="text-zinc-500 text-sm mb-7">{tier.desc}</p>
                <p className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-black text-white leading-none">{tier.price}</span>
                  <span className="text-zinc-500 text-sm">{tier.per}</span>
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.2)} className="flex items-start gap-3 p-5 bg-zinc-900 border border-amber-900/40 rounded-sm">
            <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="text-zinc-400 text-sm leading-relaxed">
              <strong className="text-white">Garanție rambursabilă:</strong> €1.000–€2.500 în funcție de model, returnată integral la predare în stare bună.{" "}
              <strong className="text-white">Asigurare RCA inclusă</strong> în tarif.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Available bikes */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/30 border-y border-zinc-800/50">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)} className="mb-12">
            <p className="eyebrow mb-2">Flotă</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Motociclete disponibile</h2>
          </motion.div>

          {bikes.length === 0 ? (
            <p className="text-zinc-500 text-sm">Nicio motocicletă disponibilă momentan. Revino curând.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {bikes.map((bike, i) => (
                <motion.div key={bike._id} {...fadeUp(i * 0.1)}
                  className="group bg-zinc-900 border border-zinc-800 hover:border-red-600/50 rounded-sm overflow-hidden transition-all duration-300">
                  <div className="relative h-56 bg-zinc-800 overflow-hidden">
                    {bike.image ? (
                      <Image
                        src={bike.image}
                        alt={`${bike.brand} ${bike.model}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={90}
                        className="object-cover group-hover:scale-105 transition-transform duration-600"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-800" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />
                    <div className={`label absolute left-0 top-0 px-3 py-2 bg-zinc-950 ${bike.available ? "text-emerald-400" : "text-zinc-500"}`}>
                      {bike.available ? "Disponibil" : "Rezervat"}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="eyebrow mb-1">{bike.brand}</p>
                    <h3 className="text-white font-black text-2xl mb-4">{bike.model}</h3>

                    <dl className="grid grid-cols-3 border-y border-zinc-800 mb-6">
                      {[
                        { label: "An", value: bike.year },
                        { label: "Motor", value: bike.engine },
                        { label: "Km", value: formatKm(bike.km) },
                      ].map(({ label, value }, j) => (
                        <div key={label} className={`py-3.5 ${j > 0 ? "border-l border-zinc-800 pl-4" : ""}`}>
                          <dt className="label mb-1.5">{label}</dt>
                          <dd className="text-white text-sm font-semibold">{value}</dd>
                        </div>
                      ))}
                    </dl>

                    <a href={`tel:${contactInfo.phone1}`}
                      className="btn btn-primary w-full py-3.5 text-sm">
                      <Phone className="w-4 h-4" /> Rezervă acum
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Included + Conditions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div {...fadeUp(0)} className="bg-zinc-900 border border-zinc-800 rounded-sm p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-0.5 h-full bg-red-600" />
            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-widest">Ce este inclus</h2>
            <ul className="space-y-3.5">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="bg-zinc-900 border border-zinc-800 rounded-sm p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-0.5 h-full bg-zinc-600" />
            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-widest">Condiții de închiriere</h2>
            <ul className="space-y-3.5">
              {conditions.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp(0)}
            className="relative text-center bg-zinc-900 border border-zinc-800 rounded-sm p-12 overflow-hidden">
            <div className="relative">
              <h2 className="text-3xl font-black text-white mb-3">Gata de aventură?</h2>
              <p className="text-zinc-400 mb-8 text-sm">Sună-ne sau trimite un mesaj pentru rezervare și disponibilitate.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={`tel:${contactInfo.phone1}`}
                  className="btn btn-primary px-8 py-4 text-sm">
                  <Phone className="w-4 h-4" /> {contactInfo.phone1}
                </a>
                <Link href={`/${locale}/contact`}
                  className="btn btn-ghost px-8 py-4 text-sm">
                  Trimite mesaj
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
