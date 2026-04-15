"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { contactInfo } from "@/lib/data";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">Contact</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Contactează-ne</h1>
          <p className="text-zinc-500 text-lg max-w-lg">
            Suntem la dispoziția ta. Sună, trimite un email sau completează formularul.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Info cards */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Phone, label: "Telefon principal", value: contactInfo.phone1, href: `tel:${contactInfo.phone1}` },
              { icon: Phone, label: "Telefon alternativ", value: contactInfo.phone2, href: `tel:${contactInfo.phone2}` },
              { icon: Mail, label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
              { icon: MapPin, label: "Adresă", value: contactInfo.address, href: contactInfo.googleMaps },
              { icon: Clock, label: "Program", value: `${contactInfo.hours.weekdays}\n${contactInfo.hours.saturday}\n${contactInfo.hours.sunday}`, href: null },
            ].map((item) => {
              const Icon = item.icon;
              const inner = (
                <div className="flex items-start gap-4 p-5 bg-zinc-900 border border-zinc-800 rounded-sm hover:border-zinc-700 transition-colors">
                  <div className="w-10 h-10 bg-red-600/10 border border-red-600/20 rounded flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-white font-medium text-sm whitespace-pre-line">{item.value}</p>
                  </div>
                </div>
              );
              return item.href ? (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {inner}
                </a>
              ) : <div key={item.label}>{inner}</div>;
            })}

            {/* Map link */}
            <a
              href={contactInfo.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white font-bold py-3 rounded-sm uppercase tracking-wide text-xs transition-colors"
            >
              Deschide în Google Maps →
            </a>

            {/* Social */}
            <div className="flex gap-3">
              <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer"
                className="flex-1 text-center py-3 bg-zinc-900 border border-zinc-800 hover:border-red-600/40 rounded-sm text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wide transition-all">
                Instagram
              </a>
              <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer"
                className="flex-1 text-center py-3 bg-zinc-900 border border-zinc-800 hover:border-red-600/40 rounded-sm text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wide transition-all">
                Facebook
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-8">
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-4">
                  <CheckCircle className="w-16 h-16 text-red-500" />
                  <h3 className="text-white text-2xl font-black">Mesaj trimis!</h3>
                  <p className="text-zinc-400">Te contactăm în mai puțin de 24 de ore.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { key: "name", label: "Nume complet", placeholder: "Ion Popescu", type: "text", required: true },
                      { key: "email", label: "Email", placeholder: "ion@email.ro", type: "email", required: true },
                      { key: "phone", label: "Telefon", placeholder: "+40 7XX XXX XXX", type: "tel", required: false },
                      { key: "subject", label: "Subiect", placeholder: "Ducati Panigale...", type: "text", required: false },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">{f.label}</label>
                        <input
                          type={f.type}
                          required={f.required}
                          value={form[f.key as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                          placeholder={f.placeholder}
                          className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-600 rounded-sm px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-zinc-600"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Mesaj</label>
                    <textarea
                      required rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Bună ziua, sunt interesat de..."
                      className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-600 rounded-sm px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-zinc-600 resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-sm uppercase tracking-wide text-sm transition-colors">
                    <Send className="w-4 h-4" /> Trimite mesajul
                  </button>
                </form>
              )}
            </div>

            {/* Company info */}
            <div className="mt-4 p-4 bg-zinc-900/50 border border-zinc-800/60 rounded-sm">
              <p className="text-zinc-600 text-xs text-center">{contactInfo.companyName} · CUI disponibil la cerere</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
