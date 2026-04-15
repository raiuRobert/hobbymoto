import Image from "next/image";
import { teamMembers } from "@/lib/data";

export default function DespreNoi() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24">

      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/about/mag1.jpg" alt="HobbyMoto showroom" fill className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3">Despre noi</p>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Pasiunea noastră pentru<br /><span className="text-red-500">motociclete</span>
          </h1>
          <p className="text-zinc-400 text-xl leading-relaxed max-w-2xl mx-auto">
            Din 1999, suntem primul dealer de motociclete noi din Constanța. O afacere de familie construită
            pe pasiune, onestitate și servicii de calitate.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3">Povestea noastră</p>
            <h2 className="text-4xl font-black text-white mb-6">
              Primii în Constanța <br />la motociclete noi
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Afacerea de familie HobbyMoto a fost fondată în 1992 și preluată în 1999. Am fost
                <strong className="text-white"> primii din Constanța care am vândut motociclete noi</strong>, în 1998,
                iar apoi am extins natural spre cele rulate.
              </p>
              <p>
                De-a lungul anilor am implementat sisteme de <strong className="text-white">buy-back</strong>, am oferit
                <strong className="text-white"> garanție de 12 luni</strong> pe motocicletele rulate și servicii de
                <strong className="text-white"> înmatriculare gratuită</strong> pentru fiecare moto cumpărat.
              </p>
              <p>
                Astăzi operăm un showroom de <strong className="text-white">200+ m²</strong> în Constanța, reprezentând
                mărci premium precum Ducati, Indian, Benelli, Italjet, Malaguti și Lambretta.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["/about/mag1.jpg","/about/mag2.jpg","/about/mag3.jpg","/about/mag4.jpg"].map((src, i) => (
              <div key={i} className="relative aspect-square rounded-sm overflow-hidden bg-zinc-800">
                <Image src={src} alt={`HobbyMoto showroom ${i+1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-zinc-900/40 border-y border-zinc-800/60">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: "1999", label: "Activi din" },
            { value: "200m²", label: "Showroom" },
            { value: "6", label: "Mărci premium" },
            { value: "12 luni", label: "Garanție rulate" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-black text-red-500 mb-2">{s.value}</div>
              <div className="text-zinc-400 text-sm uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3 text-center">Ce oferim</p>
          <h2 className="text-4xl font-black text-white text-center mb-12">Servicii complete pentru motocicliști</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Buy-back", desc: "Cumpărăm înapoi motocicletele vândute de noi la prețuri corecte, fără stres." },
              { title: "Garanție 12 luni", desc: "Toate motocicletele rulate beneficiază de garanție de minim 12 luni." },
              { title: "Înmatriculare gratuită", desc: "Ne ocupăm de înmatricularea gratuită a oricărei motociclete cumpărate." },
              { title: "Transport național", desc: "Livrăm motociclete gratuit oriunde în România." },
              { title: "Finanțare", desc: "Soluții de finanțare adaptate fiecărui client." },
              { title: "Service specializat", desc: "Echipă de tehnicieni certificați pentru întreținere și reparații." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 bg-zinc-900 border border-zinc-800 rounded-sm">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-bold mb-1">{item.title}</h3>
                  <p className="text-zinc-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3 text-center">Echipa</p>
          <h2 className="text-4xl font-black text-white text-center mb-12">Oamenii din spatele HobbyMoto</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-zinc-800 border-2 border-zinc-700">
                  {member.image ? (
                    <Image src={member.image} alt={member.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-black text-zinc-500">
                      {member.initials}
                    </div>
                  )}
                </div>
                <h3 className="text-white font-bold text-sm">{member.name}</h3>
                <p className="text-red-500 text-xs uppercase tracking-widest mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
