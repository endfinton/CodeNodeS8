import { toNextJsHandler } from "better-auth/next-js";
import { auth, ensureAuthSetup } from "@/lib/auth";

export const dynamic = "force-dynamic";

const handlers = toNextJsHandler(auth);

export async function GET(request) {
  await ensureAuthSetup();
  return handlers.GET(toBetterAuthRequest(request));
}

export async function POST(request) {
  await ensureAuthSetup();
  return handlers.POST(toBetterAuthRequest(request));
}

function toBetterAuthRequest(request) {
  const url = new URL(request.url);
  url.pathname = url.pathname.replace(/^\/portfolio\/api\/auth/, "/api/auth");

  return new Request(url, request);
}
