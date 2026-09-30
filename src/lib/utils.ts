import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: "EUR" | "RON") {
  if (currency === "EUR") {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  }
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatKm(km: number) {
  return new Intl.NumberFormat("de-DE").format(km);
}

export function currencySymbol(currency: string | null | undefined) {
  return currency === "RON" ? "RON" : "€";
}

export function bikeCover(bike: { gallery: string[]; image: string | null }): string | null {
  return bike.gallery[0] ?? bike.image;
}

// Event times are entered by the dealer in local time; pin formatting to it so the
// server (UTC on Vercel) and every visitor's browser render the same date and hour.
export const SITE_TIME_ZONE = "Europe/Bucharest";
