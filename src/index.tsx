import { jsx } from 'hono/jsx';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { Language, getLangDetails } from './utils/i18n';
import { HomePage } from './templates/pages/Home';
import { ServicesPage } from './templates/pages/Services';
import { PricingPage } from './templates/pages/Pricing';
import { BlogIndexPage } from './templates/pages/BlogIndex';
import { BlogPostPage } from './templates/pages/BlogPost';
import { CaseStudiesPage } from './templates/pages/CaseStudies';
import { CaseStudyDetailPage } from './templates/pages/CaseStudyDetail';
import { ContactPage } from './templates/pages/Contact';
import { FAQPage } from './templates/pages/FAQ';
import staticApp from './static';
import postsData from './data/posts.json';
import caseStudiesData from './data/case-studies.json';
import { languages } from './utils/i18n';

const app = new Hono();

app.route('/', staticApp);

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

app.get('/:lang/faq', (c) => {
  const lang = c.req.param('lang') as Language;
  return c.html(<FAQPage lang={lang} />);
});

app.get('/:lang/contact', (c) => {
  const lang = c.req.param('lang') as Language;
  return c.html(<ContactPage lang={lang} />);
});

app.get('/sitemap.xml', (c) => {
  const urls = [];
  const domain = 'https://seo.webyar.cloud';

  for (const lang of Object.keys(languages)) {
    urls.push(`${domain}/${lang}`);
    urls.push(`${domain}/${lang}/services`);
    urls.push(`${domain}/${lang}/pricing`);
    urls.push(`${domain}/${lang}/blog`);
    urls.push(`${domain}/${lang}/case-studies`);
    urls.push(`${domain}/${lang}/faq`);
    urls.push(`${domain}/${lang}/contact`);
  }

  for (const post of postsData.posts) {
    for (const lang of Object.keys(languages)) {
      urls.push(`${domain}/${lang}/blog/${post.slug}`);
    }
  }

  for (const caseStudy of caseStudiesData.caseStudies) {
    for (const lang of Object.keys(languages)) {
      urls.push(`${domain}/${lang}/case-studies/${caseStudy.slug}`);
    }
  }

  const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map((url) => `<url><loc>${url}</loc></url>`).join('')}
    </urlset>
  `.trim();

  return c.body(sitemap, 200, {
    'Content-Type': 'application/xml',
  });
});

app.get('/robots.txt', (c) => {
  const robots = `
User-agent: *
Disallow:

Sitemap: https://seo.webyar.cloud/sitemap.xml
  `.trim();
  return c.body(robots, 200, {
    'Content-Type': 'text/plain',
  });
});

export default app;
