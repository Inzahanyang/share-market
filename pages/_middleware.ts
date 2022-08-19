import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.ua?.isBot) {
    return new Response("Plz don't be a bot");
  }

  // if (!req.url.includes("/api")) {
  //   if (!req.url.includes(`/enter`) && !req.cookies.sharemarket) {
  //     return NextResponse.redirect(`${req.nextUrl.origin}/enter`);
  //   }
  // }
}
