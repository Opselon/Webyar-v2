import { jsx } from 'hono/jsx';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { serveStatic } from 'hono/cloudflare-workers';
import { Language, getLangDetails, t, languages } from './utils/i18n';
import { Layout } from './templates/layout';

const app = new Hono();

// Static file serving
app.use('/static/*', serveStatic({ root: './src' }));

const SUPPORTED_LANGS = Object.keys(languages);

// Middleware to handle root redirection
app.get('/', (c) => {
  return c.redirect('/fa', 301);
});

// Middleware to validate the language parameter
app.use('/:lang/*', async (c, next) => {
  const lang = c.req.param('lang');
  if (!getLangDetails(lang)) {
    throw new HTTPException(404, { message: 'Not Found' });
  }
  await next();
});

// Route for language-specific homepages
app.get('/:lang', (c) => {
  const lang = c.req.param('lang') as Language;
  const title = t(lang, 'homepageTitle');

  return c.html(
    <Layout lang={lang} title={title}>
      <div class="hero">
        <h1>{t(lang, 'greeting')}</h1>
        <p>This is the homepage content.</p>
      </div>
    </Layout>
  );
});

export default app;
