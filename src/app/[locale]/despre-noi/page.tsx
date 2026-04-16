"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { teamMembers, contactInfo } from "@/lib/data";
import { type Locale } from "@/lib/i18n";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

const stats = [
  { value: "1999",     label: "Activi din" },
  { value: "200m²",   label: "Showroom" },
  { value: "6",       label: "Mărci premium" },
  { value: "12 luni", label: "Garanție rulate" },
];

const services = [
  { title: "Buy-back",               desc: "Cumpărăm înapoi motocicletele vândute de noi la prețuri corecte, fără stres." },
  { title: "Garanție 12 luni",       desc: "Toate motocicletele rulate beneficiază de garanție de minim 12 luni." },
  { title: "Înmatriculare gratuită", desc: "Ne ocupăm de înmatricularea gratuită a oricărei motociclete cumpărate." },
  { title: "Transport național",     desc: "Livrăm motociclete oriunde în România, inclus în prețul de vânzare." },
  { title: "Surse din Germania",     desc: "Motocicletele rulate sunt selecționate direct din Germania — calitate verificată." },
  { title: "Service specializat",    desc: "Echipă de tehnicieni certificați pentru întreținere și reparații." },
];

const communityPhotos = [
  { src: "/about/ducati-event.jpg",   caption: "Ducati Open Day — Constanța", pos: "object-bottom" },
  { src: "/about/kids-event.jpg",     caption: "Tineri pasionați în showroom", pos: "object-center" },
  { src: "/about/showroom-event.jpg", caption: "Lansare model nou",            pos: "object-center" },
];

export default function DespreNoi() {
  const params = useParams();
  const locale = (params.locale as Locale) ?? "ro";

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* Hero */}
      <section className="relative pt-24 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/about/storefront.jpg"
            alt="HobbyMoto Constanța"
            fill
            className="object-cover object-center opacity-30"
            sizes="100vw"
            quality={85}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/50 to-zinc-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 to-transparent" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-4">Despre noi</p>
            <h1 className="text-5xl sm:text-7xl font-black text-white leading-none mb-6">
              O afacere de familie<br />
              <span className="text-red-500">cu suflet de motociclist</span>
            </h1>
            <p className="text-zinc-300 text-xl leading-relaxed max-w-2xl">
              Din 1999, primul dealer de motociclete noi din Constanța — construiți pe pasiune,
              nu pe cifre.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story + photos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp(0)}>
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3">Povestea noastră</p>
            <h2 className="text-4xl font-black text-white mb-6 leading-tight">
              Primii în Constanța<br />la motociclete noi
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                HobbyMoto a fost fondată în <strong className="text-white">1992</strong> și preluată
                de familia Dragomir în 1999. Am fost <strong className="text-white">primii din Constanța
                care am vândut motociclete noi</strong>, în 1998, deschizând o piață complet nouă în regiune.
              </p>
              <p>
                De-a lungul anilor am introdus servicii care astăzi sunt standard în industrie: sistemul
                de <strong className="text-white">buy-back</strong>, <strong className="text-white">garanția de
                12 luni</strong> pe rulate și <strong className="text-white">înmatricularea gratuită</strong>.
              </p>
              <p>
                Astăzi reprezentăm mărci premium — Ducati, Indian, Benelli, Italjet, Malaguti, Lambretta —
                în cel mai mare showroom de motociclete din Constanța: <strong className="text-white">peste 200 m²</strong>.
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 gap-3">
            {/* Main wide photo */}
            <div className="col-span-2 relative aspect-video rounded-sm overflow-hidden bg-zinc-800">
              <Image
                src="/about/selfie-italjet.jpg"
                alt="Familia Dragomir cu motocicletele Italjet"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
            </div>
            {/* Two smaller */}
            <div className="relative aspect-square rounded-sm overflow-hidden bg-zinc-800">
              <Image
                src="/about/storefront.jpg"
                alt="Showroom HobbyMoto"
                fill
                sizes="25vw"
                quality={90}
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative aspect-square rounded-sm overflow-hidden bg-zinc-800">
              <Image
                src="/about/ducati-event.jpg"
                alt="Ducati event HobbyMoto"
                fill
                sizes="25vw"
                quality={90}
                className="object-cover object-top hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-zinc-900/40 border-y border-zinc-800/50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div key={s.label} {...fadeUp(i * 0.08)}>
              <div className="text-4xl sm:text-5xl font-black text-red-500 mb-2">{s.value}</div>
              <div className="text-zinc-400 text-xs uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">Echipa</p>
            <h2 className="text-4xl font-black text-white mb-3">Oamenii din spatele HobbyMoto</h2>
            <p className="text-zinc-500 text-sm max-w-xl mx-auto">
              O echipă de pasionați care trăiesc ce vând — fiecare are propriul moto și cunoaște fiecare detaliu al produselor pe care le reprezintă.
            </p>
          </motion.div>

          {/* Big team photo */}
          <motion.div {...fadeUp(0.05)} className="relative w-full aspect-[3/2] sm:aspect-[2/1] rounded-sm overflow-hidden bg-zinc-800 mb-12">
            <Image
              src="/about/team-ducati.jpg"
              alt="Echipa HobbyMoto"
              fill
              sizes="100vw"
              quality={90}
              className="object-cover object-top"
            />
          </motion.div>

          {/* Individual cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {teamMembers.map((member, i) => (
              <motion.div key={member.name} {...fadeUp(i * 0.06)} className="group text-center">
                <div className="relative w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-zinc-800 border-2 border-zinc-700 group-hover:border-red-600/60 transition-all duration-300 group-hover:scale-105">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="96px"
                      quality={85}
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl font-black text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      {member.initials}
                    </div>
                  )}
                </div>
                <h3 className="text-white font-bold text-sm leading-tight">{member.name}</h3>
                <p className="text-red-500 text-[10px] uppercase tracking-widest mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community gallery */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/30 border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="mb-12">
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">Comunitate</p>
            <h2 className="text-4xl font-black text-white leading-tight">
              Mai mult decât un dealer —<br />
              <span className="text-zinc-400">o comunitate de motocicliști</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {communityPhotos.map(({ src, caption, pos }, i) => (
              <motion.div
                key={src}
                {...fadeUp(i * 0.1)}
                className="group relative overflow-hidden rounded-sm bg-zinc-800 aspect-[4/3]"
              >
                <Image
                  src={src}
                  alt={caption}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  quality={90}
                  className={`object-cover ${pos} group-hover:scale-105 transition-transform duration-500`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-0 right-0 text-center text-white text-xs font-bold px-4">{caption}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">Ce oferim</p>
            <h2 className="text-4xl font-black text-white">Servicii complete pentru motocicliști</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((item, i) => (
              <motion.div key={item.title} {...fadeUp(i * 0.07)}
                className="group flex flex-col gap-3 p-6 bg-zinc-900 border border-zinc-800 hover:border-red-600/40 rounded-sm transition-all hover:-translate-y-1">
                <div className="w-2 h-2 rounded-full bg-red-500 group-hover:scale-125 transition-transform" />
                <h3 className="text-white font-black">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp(0)}
            className="relative bg-zinc-900 border border-zinc-800 rounded-sm p-10 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 to-transparent pointer-events-none" />
            <div className="relative">
              <p className="text-zinc-400 text-sm mb-2">Vrei să ne cunoști?</p>
              <h3 className="text-white font-black text-2xl sm:text-3xl mb-6">
                Vino la showroom — suntem mereu bucuroși să povestim despre moto.
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={`tel:${contactInfo.phone1}`}
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-7 py-3.5 rounded-sm uppercase tracking-wide text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-red-900/30">
                  <Phone className="w-4 h-4" /> {contactInfo.phone1}
                </a>
                <Link href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-bold px-7 py-3.5 rounded-sm uppercase tracking-wide text-sm transition-all hover:-translate-y-0.5">
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
