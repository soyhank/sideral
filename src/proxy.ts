import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC = ["/", "/login", "/registro"];

/** Revisión optimista de sesión: solo mira si existe la cookie, sin consultar a nadie. */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = request.cookies.getAll().some((c) => c.name.startsWith("sb-") && c.name.includes("-auth-token"));
  const isPublic = PUBLIC.some((p) => pathname === p || (p !== "/" && pathname.startsWith(`${p}/`)));

  if (!hasSession && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = `?volver=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }
  if (hasSession && (pathname === "/login" || pathname === "/registro" || pathname === "/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/inicio";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image|manifest|robots.txt|sitemap.xml|.*\.(?:png|jpg|jpeg|svg|webp|ico|txt)$).*)"],
};
