"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Phone, MapPin, Clock, Shield, Wrench, Zap, Droplets } from "lucide-react";
import { contactInfo } from "@/lib/data";
import { type Locale } from "@/lib/i18n";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

const includedServices = [
  { icon: Shield,   text: "Depozitare în spațiu închis și securizat" },
  { icon: Wrench,   text: "Curățare și ungere lanț (o dată pe perioadă)" },
  { icon: Zap,      text: "Verificare și ajustare presiune anvelope la ridicare" },
  { icon: Droplets, text: "Întreținere baterie pe toată durata depozitării" },
];

const optionalServices = [
  { label: "Spălare motocicletă",          price: "30 RON" },
  { label: "Schimb ulei + filtre + bujii", price: "La cerere" },
  { label: "Transport în Constanța",       price: "100 RON" },
  { label: "Transport în raza 50 km",      price: "200 RON" },
];

const conditions = [
  { icon: "🧹", title: "Curată",         desc: "Predată curată. Oferim spălare contra cost (30 RON)." },
  { icon: "⛽", title: "Rezervor plin",  desc: "Rezervor plin pentru conservare optimă." },
  { icon: "🛢️", title: "Fără scurgeri", desc: "Nicio scurgere de lichide la predare." },
  { icon: "📅", title: "Minim 2 luni",  desc: "Durata minimă de depozitare: 2 luni calendaristice." },
];

export default function MotoHotel() {
  const params = useParams();
  const locale = (params.locale as Locale) ?? "ro";

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* Hero */}
      <section className="relative pt-24 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/about/storage1.jpg" alt="Moto Hotel" fill className="object-cover opacity-25" sizes="100vw" quality={85} />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/70 to-zinc-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 to-transparent" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)}>
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-4">Servicii</p>
            <h1 className="text-5xl sm:text-7xl font-black text-white leading-none mb-6">
              Moto <span className="text-red-500">Hotel</span>
            </h1>
            <p className="text-zinc-300 text-xl leading-relaxed max-w-2xl mb-10">
              Depozitare sigură și îngrijire profesională pentru motocicleta ta pe sezonul rece sau
              orice perioadă de absență. Spațiu securizat în Constanța.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={`tel:${contactInfo.phone1}`}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-4 rounded-sm uppercase tracking-wide text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-red-900/40">
                <Phone className="w-4 h-4" /> Rezervă un loc
              </a>
              <Link href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 border border-zinc-600 hover:border-zinc-400 text-zinc-300 hover:text-white font-bold px-8 py-4 rounded-sm uppercase tracking-wide text-sm transition-all hover:-translate-y-0.5">
                Trimite mesaj
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What it is */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div {...fadeUp(0)}>
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3">Ce este</p>
            <h2 className="text-4xl font-black text-white mb-6 leading-tight">
              Îngrijire profesională<br />cât ești plecat
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Moto Hotel-ul HobbyMoto este un serviciu de <strong className="text-white">depozitare în spațiu închis</strong>, specializat pentru motociclete. Ideal pentru sezonul rece, călătorii lungi sau orice perioadă în care nu poți folosi moto-ul.
              </p>
              <p>
                Motocicleta ta stă în siguranță, bine îngrijită, și te așteaptă în stare perfectă de funcționare — cu bateria întreținută, lanțul uns și presiunea anvelopelor verificată.
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 gap-3">
            {[
              { src: "/about/storage1.jpg", label: "Spațiu depozitare" },
              { src: "/about/storage2.jpg", label: "Garaj securizat" },
              { src: "/about/storage3.jpg", label: "Depozitare interioară" },
              { src: "/about/storage4.jpg", label: "Showroom HobbyMoto" },
            ].map(({ src, label }, i) => (
              <div key={i} className="relative overflow-hidden rounded-sm bg-zinc-800 aspect-square">
                <Image
                  src={src}
                  alt={label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={90}
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Included + Optional */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/30 border-y border-zinc-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">Ce primești</p>
            <h2 className="text-4xl font-black text-white">Servicii incluse & opționale</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Included */}
            <motion.div {...fadeUp(0.05)} className="bg-zinc-900 border border-zinc-800 rounded-sm p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-600 to-transparent" />
              <h3 className="text-white font-black text-lg mb-6 uppercase tracking-widest">Inclus în preț</h3>
              <ul className="space-y-4">
                {includedServices.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded bg-red-600/15 border border-red-600/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-zinc-300 text-sm">{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Optional */}
            <motion.div {...fadeUp(0.1)} className="bg-zinc-900 border border-zinc-800 rounded-sm p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-zinc-600 to-transparent" />
              <h3 className="text-white font-black text-lg mb-6 uppercase tracking-widest">Opțional (contra cost)</h3>
              <ul className="space-y-3">
                {optionalServices.map((item) => (
                  <li key={item.label} className="flex items-center justify-between p-3.5 bg-zinc-800/60 border border-zinc-700/50 rounded-sm">
                    <span className="text-zinc-300 text-sm">{item.label}</span>
                    <span className="text-red-400 font-black text-sm whitespace-nowrap ml-4">{item.price}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">Important</p>
            <h2 className="text-4xl font-black text-white">Condiții de depozitare</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {conditions.map((c, i) => (
              <motion.div key={c.title} {...fadeUp(i * 0.08)}
                className="group bg-zinc-900 border border-zinc-800 hover:border-red-600/40 rounded-sm p-6 text-center transition-all hover:-translate-y-1">
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 className="text-white font-black mb-2">{c.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)}
            className="relative bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden p-10 sm:p-14">
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 to-transparent pointer-events-none" />
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-black text-white mb-3">Rezervă un loc acum</h2>
                <p className="text-zinc-400 mb-5 text-sm">Locurile sunt limitate. Contactează-ne pentru disponibilitate și prețuri.</p>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm">{contactInfo.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className="text-zinc-400 text-sm">{contactInfo.hours.weekdays}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <a href={`tel:${contactInfo.phone1}`}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-sm uppercase tracking-wide text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-red-900/30">
                  <Phone className="w-4 h-4" /> {contactInfo.phone1}
                </a>
                <Link href={`/${locale}/contact`}
                  className="flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-bold py-4 rounded-sm uppercase tracking-wide text-sm transition-all">
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
