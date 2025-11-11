import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Language, LanguageDetails, t, languages } from '../utils/i18n';

interface LayoutProps {
  lang: Language;
  title: string;
}

const themeScript = `
  const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.add(theme);

  function toggleTheme() {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.remove(currentTheme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  }
`;

export const Layout: FC<LayoutProps> = ({ lang, title, children }) => {
  const langDetails = languages[lang as Language];

  return (
    <html lang={langDetails.code} dir={langDetails.dir}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link href="/static/style.css" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body class="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:z-50 top-0 left-0 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 p-4">
          {t(lang, 'skipToContent')}
        </a>

        <header class="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
          <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
              <a href={`/${lang}`} class="text-2xl font-bold text-gray-900 dark:text-white">
                SEO Agency
              </a>
              <nav class="hidden md:flex items-center space-x-8">
                <a href={`/${lang}/services`} class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  {t(lang, 'navServices')}
                </a>
                <a href={`/${lang}/pricing`} class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  {t(lang, 'navPricing')}
                </a>
                <a href={`/${lang}/blog`} class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  {t(lang, 'navBlog')}
                </a>
                <a href={`/${lang}/contact`} class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  {t(lang, 'navContact')}
                </a>
              </nav>
              <div class="flex items-center space-x-4">
                <div class="language-switcher flex items-center space-x-2">
                  {Object.values(languages).map((l) => (
                    <a
                      href={`/${l.code}`}
                      class={`px-3 py-1 text-sm rounded-md ${l.code === lang ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                    >
                      {l.name}
                    </a>
                  ))}
                </div>
                <button
                  class="theme-switcher p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onclick="toggleTheme()"
                  aria-label="Toggle theme"
                >
                  <svg class="h-6 w-6 hidden dark:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.59a.75.75 0 11-1.06-1.06l1.59-1.591a.75.75 0 011.06 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.803 17.803a.75.75 0 01-1.06 0l-1.59-1.591a.75.75 0 111.06-1.06l1.59 1.59a.75.75 0 010 1.06zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM5.197 17.803a.75.75 0 010-1.06l1.59-1.59a.75.75 0 111.06 1.06l-1.59 1.59a.75.75 0 01-1.06 0zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM6.106 5.197a.75.75 0 011.06 0l1.59 1.591a.75.75 0 11-1.06 1.06l-1.59-1.59a.75.75 0 010-1.06z"/></svg>
                  <svg class="h-6 w-6 block dark:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 004.463-.941a.75.75 0 01.981.635A11.25 11.25 0 0118 21a11.25 11.25 0 01-11.25-11.25 11.25 11.25 0 011.718-6.528z" clip-rule="evenodd" /></svg>
                </button>
                <a href={`/${lang}/contact`} class="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  {t(lang, 'ctaButton')}
                </a>
              </div>
            </div>
          </div>
        </header>

        <main id="main-content" class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        <footer class="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="flex justify-between items-center">
                    <div class="footer-links flex space-x-4">
                        <a href={`/${lang}/about`} class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">{t(lang, 'footerAbout')}</a>
                        <a href={`/${lang}/privacy`} class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">{t(lang, 'footerPrivacy')}</a>
                        <a href={`/${lang}/terms`} class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">{t(lang, 'footerTerms')}</a>
                    </div>
                    <p class="text-gray-600 dark:text-gray-300">
                        &copy; {new Date().getFullYear()} SEO Agency. {t(lang, 'footerRights')}
                    </p>
                </div>
            </div>
        </footer>
      </body>
    </html>
  );
};
