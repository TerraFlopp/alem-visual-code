// Vercel Edge Function adapter for the TanStack Start Worker bundle.
// The build output is a Cloudflare-style Worker that exports { fetch }.
// Vercel Edge runtime uses the same Web Standards (Request/Response, fetch),
// so we can re-export it directly.
import handler from "../dist/server/index.js";

export const config = {
  runtime: "edge",
};

export default async function (request) {
  return handler.fetch(request, {}, {
    waitUntil: () => {},
    passThroughOnException: () => {},
  });
}