import { jsx } from 'hono/jsx';
import { FC, PropsWithChildren } from 'hono/jsx';
import { Language, LanguageDetails, t, languages } from '../utils/i18n';

interface LayoutProps {
  lang: Language;
  title: string;
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({ lang, title, children }) => {
  const langDetails = languages[lang];

  return (
    <html lang={langDetails.code} dir={langDetails.dir}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body>
        <a href="#main-content" class="skip-to-content">
          {t(lang, 'skipToContent')}
        </a>

        <header class="header">
          <a href={`/${lang}`} class="logo">
            SEO Agency
          </a>
          <nav class="nav">
            <a href={`/${lang}/services`} class="nav-link">
              {t(lang, 'navServices')}
            </a>
            <a href={`/${lang}/pricing`} class="nav-link">
              {t(lang, 'navPricing')}
            </a>
            <a href={`/${lang}/blog`} class="nav-link">
              {t(lang, 'navBlog')}
            </a>
            <a href={`/${lang}/contact`} class="nav-link">
              {t(lang, 'navContact')}
            </a>
          </nav>
          <div class="controls">
            <div class="language-switcher">
              {Object.values(languages).map((l) => (
                <a
                  href={`/${l.code}`}
                  class={`lang-btn ${l.code === lang ? 'active' : ''}`}
                >
                  {l.name}
                </a>
              ))}
            </div>
            <a href={`/${lang}/contact`} class="cta-button">
              {t(lang, 'ctaButton')}
            </a>
          </div>
        </header>

        <main id="main-content" class="main-content">
          {children}
        </main>

        <footer class="footer">
          <div class="footer-links">
            <a href={`/${lang}/about`} class="footer-link">
              {t(lang, 'footerAbout')}
            </a>
            <a href={`/${lang}/privacy`} class="footer-link">
              {t(lang, 'footerPrivacy')}
            </a>
            <a href={`/${lang}/terms`} class="footer-link">
              {t(lang, 'footerTerms')}
            </a>
          </div>
          <p class="copyright">
            &copy; {new Date().getFullYear()} SEO Agency. {t(lang, 'footerRights')}
          </p>
        </footer>
      </body>
    </html>
  );
};
