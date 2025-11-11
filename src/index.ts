import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { Language, getLangDetails, t, languages } from './utils/i18n';

const app = new Hono();

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
  const greeting = t(lang, 'greeting');
  return c.text(greeting);
});

export default app;
