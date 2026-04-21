// Vercel Node.js Serverless Function adapter for the TanStack Start Worker bundle.
// The build output is a Cloudflare-style Worker that exports { fetch(Request) }.
// We bridge Node's IncomingMessage/ServerResponse to the Web Fetch API that the
// worker expects, then stream the Response back to Node.
import handler from "../dist/server/index.js";

export const config = {
  runtime: "nodejs20.x",
};

function buildRequest(req) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const url = `${proto}://${host}${req.url}`;

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else {
      headers.set(key, String(value));
    }
  }

  const init = { method: req.method, headers };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req;
    init.duplex = "half";
  }
  return new Request(url, init);
}

async function sendResponse(res, response) {
  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  if (!response.body) {
    res.end();
    return;
  }
  const reader = response.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    res.write(value);
  }
  res.end();
}

export default async function (req, res) {
  try {
    const request = buildRequest(req);
    const response = await handler.fetch(request, process.env, {
      waitUntil: () => {},
      passThroughOnException: () => {},
    });
    await sendResponse(res, response);
  } catch (err) {
    console.error("Server handler error:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}