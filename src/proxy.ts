import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/lib/i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export const config = {
  // Run on all paths EXCEPT: /studio, /api, Next.js internals, Vercel internals, and static files
  matcher: ["/((?!studio|api|_next|_vercel|.*\\..*).*)" ],
};
