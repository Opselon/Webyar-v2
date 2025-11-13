import { Hono } from 'hono';

const app = new Hono<{
  Bindings: {
    ASSETS: {
      fetch: typeof fetch;
    };
  };
}>();

app.use('/static/*', async (c, next) => {
  try {
    const assetResponse = await c.env.ASSETS.fetch(c.req.raw);

    if (assetResponse.status === 404) {
      await next();
      return;
    }

    const response = new Response(assetResponse.body, {
      headers: assetResponse.headers,
      status: assetResponse.status,
      statusText: assetResponse.statusText,
    });

    if (!response.headers.has('Cache-Control')) {
      response.headers.set('Cache-Control', 'public, max-age=604800');
    }

    return response;
  } catch (error) {
    console.error('Static asset fetch failed', error);
    await next();
  }
});

export default app;
