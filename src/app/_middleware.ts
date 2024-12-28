// pages/_middleware.ts
import type { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname.startsWith("/api/chat")) {
    const response = new Response('Hello world!', {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        },
    });
    return response;
  }

 
}
