"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">
            Contact
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-zinc-500 text-lg max-w-lg">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              {
                icon: Phone,
                label: "Telefon",
                value: "+40 000 000 000",
                href: "tel:+40000000000",
              },
              {
                icon: Mail,
                label: "Email",
                value: "contact@hobbymoto.ro",
                href: "mailto:contact@hobbymoto.ro",
              },
              {
                icon: MapPin,
                label: t("address"),
                value: t("addressVal"),
                href: null,
              },
              {
                icon: Clock,
                label: "Program",
                value: "Lun–Vin: 09:00–18:00\nSâm: 10:00–15:00",
                href: null,
              },
            ].map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-start gap-4 p-5 bg-zinc-900 border border-zinc-800 rounded-sm">
                  <div className="w-10 h-10 bg-red-600/10 border border-red-600/20 rounded flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <p className="text-white font-medium text-sm whitespace-pre-line">
                      {item.value}
                    </p>
                  </div>
                </div>
              );

              return item.href ? (
                <a key={item.label} href={item.href} className="block hover:opacity-80 transition-opacity">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-8">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-4"
                >
                  <CheckCircle className="w-16 h-16 text-red-500" />
                  <h3 className="text-white text-2xl font-black">{t("success")}</h3>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                        {t("name")}
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-600 rounded-sm px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-zinc-600"
                        placeholder="Ion Popescu"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                        {t("email")}
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-600 rounded-sm px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-zinc-600"
                        placeholder="ion@email.ro"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                        {t("phone")}
                      </label>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-600 rounded-sm px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-zinc-600"
                        placeholder="+40 7XX XXX XXX"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                        {t("subject")}
                      </label>
                      <input
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-600 rounded-sm px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-zinc-600"
                        placeholder="Ducati Panigale..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                      {t("message")}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-600 rounded-sm px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-zinc-600 resize-none"
                      placeholder="Bună ziua, sunt interesat de..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-6 rounded-sm uppercase tracking-wide text-sm transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    {t("send")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
