import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Archivo, Martian_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { locales, type Locale } from "@/lib/i18n";
import "../globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin", "latin-ext"], axes: ["wdth"] });
const martianMono = Martian_Mono({ variable: "--font-martian", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "HobbyMoto — Dealer motociclete premium",
  description:
    "Dealer oficial Ducati, Benelli, Italjet, Malaguti, Daytona, Zontes, SYM și Kove. Motociclete noi și rulate, Moto Hotel și închirieri.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className={`dark ${archivo.variable} ${martianMono.variable}`}>
      <body className="antialiased bg-zinc-950 text-white">
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale as Locale} />
          <main>{children}</main>
          <Footer locale={locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
