import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations("notFound");

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-20">
      <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3">404</p>
      <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">{t("title")}</h1>
      <p className="text-zinc-400 max-w-md mb-8">{t("text")}</p>
      <Link
        href={`/${locale}`}
        className="bg-red-600 hover:bg-red-500 text-white font-bold px-7 py-3.5 rounded-sm uppercase tracking-wide text-sm transition-colors"
      >
        {t("home")}
      </Link>
    </div>
  );
}
