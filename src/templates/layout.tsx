import { jsx } from 'hono/jsx';
import { FC, PropsWithChildren } from 'hono/jsx';
import { Language, LanguageDetails, t, languages } from '../utils/i18n';

interface LayoutProps {
  lang: Language;
  title: string;
}

const themeScript = `
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }
`;

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({ lang, title, children }) => {
  const langDetails = languages[lang];

  return (
    <html lang={langDetails.code} dir={langDetails.dir}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link href="/static/style.css" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
            <button class="theme-switcher" onclick="toggleTheme()" aria-label="Toggle theme">
                <svg class="icon sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.59a.75.75 0 11-1.06-1.06l1.59-1.591a.75.75 0 011.06 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.803 17.803a.75.75 0 01-1.06 0l-1.59-1.591a.75.75 0 111.06-1.06l1.59 1.59a.75.75 0 010 1.06zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM5.197 17.803a.75.75 0 010-1.06l1.59-1.59a.75.75 0 111.06 1.06l-1.59 1.59a.75.75 0 01-1.06 0zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM6.106 5.197a.75.75 0 011.06 0l1.59 1.591a.75.75 0 11-1.06 1.06l-1.59-1.59a.75.75 0 010-1.06z"/></svg>
                <svg class="icon moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 004.463-.941a.75.75 0 01.981.635A11.25 11.25 0 0118 21a11.25 11.25 0 01-11.25-11.25 11.25 11.25 0 011.718-6.528z" clip-rule="evenodd" /></svg>
            </button>
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
