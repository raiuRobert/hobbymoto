import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/lib/i18n";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  // Redirect locale-prefixed /studio URLs (e.g. /ro/studio) to /studio
  if (/^\/[a-z]{2}(\/studio.*)$/.test(request.nextUrl.pathname)) {
    const studioPath = request.nextUrl.pathname.replace(/^\/[a-z]{2}/, "");
    return NextResponse.redirect(new URL(studioPath, request.url));
  }
  return intlMiddleware(request);
}

export const config = {
  // Run on all paths EXCEPT: /studio, /api, Next.js internals, Vercel internals, and static files
  matcher: ["/((?!studio|api|_next|_vercel|.*\\..*).*)" ],
};
