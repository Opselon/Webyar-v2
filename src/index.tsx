import { jsx } from 'hono/jsx';
import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import { HTTPException } from 'hono/http-exception';
import { Language, getLangDetails, languages } from './utils/i18n';
import { HomePage } from './templates/pages/Home';
import { ServicesPage } from './templates/pages/Services';
import { PricingPage } from './templates/pages/Pricing';
import { BlogIndexPage } from './templates/pages/BlogIndex';
import { BlogPostPage } from './templates/pages/BlogPost';
import { CaseStudiesPage } from './templates/pages/CaseStudies';
import { CaseStudyDetailPage } from './templates/pages/CaseStudyDetail';
import { ContactPage } from './templates/pages/Contact';

const app = new Hono();

app.get('/static/*', serveStatic({ root: './src' }));

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

// Page Routes
app.get('/:lang', (c) => {
  const lang = c.req.param('lang') as Language;
  return c.html(<HomePage lang={lang} />);
});

app.get('/:lang/services', (c) => {
  const lang = c.req.param('lang') as Language;
  return c.html(<ServicesPage lang={lang} />);
});

app.get('/:lang/pricing', (c) => {
  const lang = c.req.param('lang') as Language;
  return c.html(<PricingPage lang={lang} />);
});

app.get('/:lang/blog', (c) => {
  const lang = c.req.param('lang') as Language;
  return c.html(<BlogIndexPage lang={lang} />);
});

app.get('/:lang/blog/:slug', (c) => {
  const lang = c.req.param('lang') as Language;
  const slug = c.req.param('slug');
  return c.html(<BlogPostPage lang={lang} slug={slug} />);
});

app.get('/:lang/case-studies', (c) => {
    const lang = c.req.param('lang') as Language;
    return c.html(<CaseStudiesPage lang={lang} />);
});

app.get('/:lang/case-studies/:slug', (c) => {
    const lang = c.req.param('lang') as Language;
    const slug = c.req.param('slug');
    return c.html(<CaseStudyDetailPage lang={lang} slug={slug} />);
});

app.get('/:lang/contact', (c) => {
  const lang = c.req.param('lang') as Language;
  return c.html(<ContactPage lang={lang} />);
});

export default app;
