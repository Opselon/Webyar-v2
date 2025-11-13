import { Hono } from 'hono';
import type { Context } from 'hono';

type StaticContext = Context<{ Bindings: { ASSETS: { fetch: typeof fetch } } }>;

const app = new Hono<{
  Bindings: {
    ASSETS: {
      fetch: typeof fetch;
    };
  };
}>();

const serveStaticAsset = async (c: StaticContext) => {
  const { req, env } = c;
  const method = req.method;

  if (method !== 'GET' && method !== 'HEAD') {
    return null;
  }

  const requestUrl = new URL(req.url);
  const assetPath = requestUrl.pathname.replace(/^\/static/, '') || '/';
  const assetUrl = new URL(assetPath + requestUrl.search, 'http://worker');
  const assetRequest = new Request(assetUrl.toString(), req.raw);

  const assetResponse = await env.ASSETS.fetch(assetRequest);

  if (assetResponse.status >= 400) {
    return null;
  }

  const headers = new Headers(assetResponse.headers);
  if (!headers.has('Cache-Control')) {
    headers.set('Cache-Control', 'public, max-age=604800');
  }

  return new Response(assetResponse.body, {
    status: assetResponse.status,
    statusText: assetResponse.statusText,
    headers,
  });
};

app.get('/static/*', async (c, next) => {
  try {
    const response = await serveStaticAsset(c);
    if (response) {
      return response;
    }
  } catch (error) {
    console.error('Static asset fetch failed', error);
  }

  await next();
});

export default app;
