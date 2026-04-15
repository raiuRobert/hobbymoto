import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Phone, MapPin } from "lucide-react";
import { contactInfo } from "@/lib/data";

export default async function MotoHotel({
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
          <Image src="/hotel/logo.jpg" alt="Moto Hotel" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/50 to-zinc-950" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3">Servicii</p>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Moto <span className="text-red-500">Hotel</span>
          </h1>
          <p className="text-zinc-400 text-xl leading-relaxed max-w-2xl mx-auto">
            Depozitare sigură și îngrijire profesională pentru motocicleta ta pe perioada sezonului rece sau
            a absenței îndelungate. Disponibil în Constanța.
          </p>
        </div>
      </section>

      {/* What is it */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-white mb-6">Ce este Moto Hotel-ul?</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Moto Hotel-ul HobbyMoto este un serviciu de <strong className="text-white">depozitare în spațiu închis</strong>,
              specializat pentru motociclete. Ideal pentru sezonul rece, perioade de plecare sau orice situație
              în care motocicleta ta are nevoie de îngrijire și protecție.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Spațiu securizat, condiții controlate, servicii incluse de întreținere de bază — totul pentru
              ca motocicleta ta să fie în stare perfectă când vrei să o folosești din nou.
            </p>
            <a
              href={`tel:${contactInfo.phone1}`}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-4 rounded-sm uppercase tracking-wide text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              Rezervă un loc
            </a>
          </div>
          <div className="relative aspect-video rounded-sm overflow-hidden bg-zinc-800">
            <Image src="/hotel/logo2.jpg" alt="Moto Hotel interior" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-900/40 border-y border-zinc-800/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-10 text-center">Condiții de depozitare</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🧹", title: "Motocicleta curată", desc: "Moto-ul trebuie să fie curat la predare. Oferim spălare contra cost (30 RON)." },
              { icon: "⛽", title: "Rezervor plin", desc: "Rezervorul trebuie să fie plin la predare pentru conservare optimă." },
              { icon: "🛢️", title: "Fără scurgeri", desc: "Motocicleta nu trebuie să prezinte scurgeri de lichide." },
              { icon: "📅", title: "Minim 2 luni", desc: "Durata minimă de depozitare este de 2 luni calendaristice." },
            ].map((c) => (
              <div key={c.title} className="bg-zinc-900 border border-zinc-800 rounded-sm p-6 text-center">
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 className="text-white font-bold mb-2">{c.title}</h3>
                <p className="text-zinc-500 text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Included services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-black text-white mb-8">Servicii incluse</h2>
            <ul className="space-y-4">
              {[
                "Depozitare în spațiu închis și securizat",
                "Curățare și ungere lanț (la predare sau ridicare)",
                "Verificare presiune anvelope la ridicare",
                "Întreținere baterie pe durata depozitării",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-black text-white mb-8">Servicii opționale</h2>
            <ul className="space-y-4">
              {[
                { label: "Schimb ulei + filtre + bujii", price: "la cerere" },
                { label: "Spălare motocicletă", price: "30 RON" },
                { label: "Transport în Constanța", price: "100 RON" },
                { label: "Transport în raza 50 km", price: "200 RON" },
              ].map((item) => (
                <li key={item.label} className="flex items-start justify-between gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-sm">
                  <span className="text-zinc-300 text-sm">{item.label}</span>
                  <span className="text-red-400 font-bold text-sm whitespace-nowrap">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Location + CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden">
            <div className="p-8 sm:p-12 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-black text-white mb-4">Rezervă un loc acum</h2>
                <p className="text-zinc-400 mb-6">Locurile sunt limitate. Contactează-ne pentru disponibilitate și prețuri.</p>
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                  <span className="text-zinc-300 text-sm">{contactInfo.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-red-500" />
                  <a href={`tel:${contactInfo.phone1}`} className="text-white font-bold hover:text-red-400 transition-colors">
                    {contactInfo.phone1}
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={`tel:${contactInfo.phone1}`}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-sm uppercase tracking-wide text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" /> Sună acum
                </a>
                <Link
                  href={`/${locale}/contact`}
                  className="flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-bold py-4 rounded-sm uppercase tracking-wide text-sm transition-colors"
                >
                  Trimite mesaj
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
