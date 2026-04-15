export const locales = ["ro", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ro";

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split("/");
  const maybeLang = segments[1] as Locale;
  return locales.includes(maybeLang) ? maybeLang : defaultLocale;
}
