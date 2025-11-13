import { jsx } from 'hono/jsx';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { D1Database } from '@cloudflare/workers-types';
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
import {
  formatContactSubmission,
  sendTelegramMessage,
  type ContactSubmission,
} from './utils/telegram';

type AppBindings = {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  ASSETS: {
    fetch: typeof fetch;
  };
  SEO_DB: D1Database;
};

const app = new Hono<{ Bindings: AppBindings }>();

app.route('/', staticApp);

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
    'Content-Signal': 'search=yes, ai-input=yes, ai-train=yes',
    'Cache-Control': 'public, max-age=3600',
  });
});

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

app.post('/:lang/contact', async (c) => {
  const lang = c.req.param('lang') as Language;

  let data: ContactSubmission;

  try {
    const contentType = c.req.header('content-type') ?? '';
    let body: Record<string, unknown> = {};

    if (contentType.includes('application/json')) {
      body = await c.req.json<Record<string, unknown>>();
    } else {
      const formBody = await c.req.parseBody();
      for (const [key, value] of Object.entries(formBody)) {
        if (typeof value === 'string') {
          body[key] = value;
        }
      }
    }

    const normalize = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
    const optional = (value: unknown) => {
      if (typeof value !== 'string') {
        return undefined;
      }

      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : undefined;
    };

    data = {
      name: normalize(body?.name),
      email: normalize(body?.email),
      website: optional(body?.website),
      language: optional(body?.language),
      companySize: optional(body?.companySize),
      engagement: optional(body?.engagement),
      message: normalize(body?.message),
    };
  } catch {
    return c.json({ success: false, error: 'invalid_payload' }, 400);
  }

  if (!data.name || !data.email || !data.message) {
    return c.json({ success: false, error: 'missing_fields' }, 400);
  }

  const botToken = c.env.TELEGRAM_BOT_TOKEN;
  const chatId = c.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return c.json({ success: false, error: 'service_unavailable' }, 503);
  }

  try {
    const text = formatContactSubmission(data, lang);
    await sendTelegramMessage({ botToken, chatId }, text);
    return c.json({ success: true });
  } catch (error) {
    console.error('Contact submission failed', error);
    return c.json({ success: false, error: 'delivery_failed' }, 502);
  }
});

export default app;
