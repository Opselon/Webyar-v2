import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Language, languages, t } from '../utils/i18n';

interface LayoutProps {
  lang: Language;
  title: string;
  description: string;
  canonical: string;
  active?: 'home' | 'services' | 'pricing' | 'blog' | 'caseStudies' | 'faq' | 'contact';
}

const themeScript = `
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('theme');
  const theme = storedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.classList.add(theme);

  window.toggleTheme = function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.classList.contains('dark') ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.classList.remove(currentTheme);
    root.classList.add(nextTheme);
    localStorage.setItem('theme', nextTheme);
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    toggles.forEach((toggle) => toggle.setAttribute('aria-pressed', nextTheme === 'dark'));
  };

  window.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('[data-mobile-nav]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', () => {
        const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', (!expanded).toString());
        mobileMenu.classList.toggle('hidden');
      });
    }
  });
`;

export const Layout: FC<LayoutProps> = ({ lang, title, description, canonical, active, children }) => {
  const langDetails = languages[lang];
  const isRTL = langDetails.dir === 'rtl';
  const navItems = [
    { key: 'home' as const, href: `/${lang}`, label: t(lang, 'navHome') },
    { key: 'services' as const, href: `/${lang}/services`, label: t(lang, 'navServices') },
    { key: 'caseStudies' as const, href: `/${lang}/case-studies`, label: t(lang, 'navCaseStudies') },
    { key: 'pricing' as const, href: `/${lang}/pricing`, label: t(lang, 'navPricing') },
    { key: 'blog' as const, href: `/${lang}/blog`, label: t(lang, 'navBlog') },
    { key: 'faq' as const, href: `/${lang}/faq`, label: t(lang, 'navFaq') },
    { key: 'contact' as const, href: `/${lang}/contact`, label: t(lang, 'navContact') },
  ];

  return (
    <html lang={langDetails.code} dir={langDetails.dir} class="scroll-smooth">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=Vazirmatn:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link href="/static/style.css" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body class="min-h-screen bg-surface-light dark:bg-midnight text-gray-900 dark:text-gray-100 font-sans antialiased">
        <a
          href="#main-content"
          class="sr-only focus:not-sr-only focus:absolute focus:z-50 top-0 inset-inline-start-0 rounded-b-md bg-white/90 dark:bg-surface-muted px-4 py-2 text-sm font-semibold text-brand-600"
        >
          {t(lang, 'skipToContent')}
        </a>
        <div class="relative overflow-hidden">
          <div class="absolute inset-0 -z-10 hidden lg:block">
            <div class="absolute inset-y-0 inset-inline-end-0 w-[40%] bg-hero-grid opacity-60 dark:opacity-80 blur-3xl" />
          </div>
          <header class="sticky top-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-xl transition dark:border-white/5 dark:bg-midnight/80">
            <div class="container">
              <div class={`flex items-center justify-between py-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                <a href={`/${lang}`} class="flex items-center gap-3 text-lg font-display tracking-tight text-brand-700 dark:text-white">
                  <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glass">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      class="h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M4.5 4.5h15v4.125c0 2.072-1.68 3.75-3.75 3.75h-7.5A3.75 3.75 0 0 0 4.5 8.625V4.5Zm0 15v-4.125c0-2.071 1.68-3.75 3.75-3.75h7.5a3.75 3.75 0 0 1 3.75 3.75V19.5h-15Z"
                      />
                    </svg>
                  </span>
                  <span class="text-xl font-bold leading-tight">
                    <span class="block text-gray-900 dark:text-gray-50">Quantum</span>
                    <span class="block text-sm font-semibold uppercase tracking-[0.3em] text-brand-500 dark:text-accent-300">
                      SEO Labs
                    </span>
                  </span>
                </a>
                <nav class="hidden lg:flex items-center gap-6 font-medium text-sm">
                  {navItems.map((item) => (
                    <a
                      key={item.key}
                      href={item.href}
                      class={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 ease-in-expo ${
                        active === item.key
                          ? 'bg-brand-600/10 text-brand-700 shadow-soft dark:bg-brand-500/20 dark:text-white'
                          : 'text-gray-600 hover:text-brand-600 dark:text-gray-300 dark:hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {active === item.key && (
                        <span class="absolute inset-x-1 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-brand-400 via-accent-400 to-brand-600" />
                      )}
                    </a>
                  ))}
                </nav>
                <div class={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div class="flex items-center gap-2 rounded-full bg-white/70 px-2 py-1 shadow-inner dark:bg-surface-muted/80">
                    {Object.values(languages).map((l) => (
                      <a
                        key={l.code}
                        href={`/${l.code}`}
                        class={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                          l.code === lang
                            ? 'bg-brand-600 text-white shadow-neon'
                            : 'text-gray-500 hover:text-brand-600 dark:text-gray-300 dark:hover:text-accent-200'
                        }`}
                      >
                        {l.name}
                      </a>
                    ))}
                  </div>
                  <button
                    type="button"
                    class="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/40 bg-white/70 text-brand-600 shadow-soft transition hover:-translate-y-0.5 hover:shadow-glass dark:border-white/10 dark:bg-surface-muted"
                    onclick="toggleTheme()"
                    aria-label="Toggle theme"
                    aria-pressed="false"
                    data-theme-toggle
                  >
                    <svg
                      class="h-5 w-5 text-brand-600 dark:hidden"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773-1.591-1.591M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      />
                    </svg>
                    <svg
                      class="hidden h-5 w-5 text-accent-200 dark:block"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M21.752 15.002A9.718 9.718 0 0 1 12.004 21.75 9.75 9.75 0 0 1 9 2.364c.648-.18 1.207.454.998 1.09a7.5 7.5 0 0 0 9.548 9.548c.636-.21 1.27.35 1.09.998Z" />
                    </svg>
                  </button>
                  <a
                    href={`/${lang}/contact`}
                    class="hidden lg:inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-brand-500 via-brand-400 to-accent-400 px-5 py-2 text-sm font-semibold text-white shadow-neon transition hover:-translate-y-1"
                  >
                    {t(lang, 'headerCTA')}
                  </a>
                  <button
                    class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand-200/60 text-brand-600 transition hover:bg-brand-500/10 dark:border-white/10 dark:text-white lg:hidden"
                    aria-label="Toggle navigation"
                    aria-expanded="false"
                    data-mobile-nav
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="lg:hidden hidden" data-mobile-menu>
                <div class="mt-4 rounded-2xl border border-brand-100/60 bg-white/90 p-4 shadow-soft dark:border-white/10 dark:bg-surface-muted/90">
                  <nav class="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <a
                        key={item.key}
                        href={item.href}
                        class={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                          active === item.key
                            ? 'bg-brand-600/10 text-brand-700 dark:bg-brand-500/20 dark:text-white'
                            : 'text-gray-600 hover:bg-brand-500/10 hover:text-brand-700 dark:text-gray-200 dark:hover:text-white'
                        }`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                  <a
                    href={`/${lang}/contact`}
                    class="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-brand-500 to-accent-400 px-4 py-3 text-sm font-semibold text-white shadow-neon"
                  >
                    {t(lang, 'headerCTA')}
                  </a>
                </div>
              </div>
            </div>
          </header>
          <main id="main-content" class="relative">
            <div class="container py-12 lg:py-16">
              {children}
            </div>
          </main>
          <footer class="relative overflow-hidden border-t border-white/10 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-surface-muted/80">
            <div class="absolute inset-0 -z-10 bg-mesh-light opacity-80 dark:bg-mesh-dark" />
            <div class="container py-12 lg:py-16">
              <div class={`grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr] ${isRTL ? 'lg:text-right' : ''}`}>
                <div class="max-w-xl">
                  <h3 class="font-display text-2xl font-bold text-gray-900 dark:text-white">{t(lang, 'footerHeading')}</h3>
                  <p class="mt-4 text-sm text-gray-600 dark:text-gray-300">{t(lang, 'footerTagline')}</p>
                  <a
                    href={`/${lang}/contact`}
                    class="mt-6 inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-700 dark:bg-brand-500"
                  >
                    {t(lang, 'footerCTA')}
                  </a>
                </div>
                <div class={`grid gap-6 text-sm text-gray-600 dark:text-gray-300 ${isRTL ? 'lg:justify-items-end' : ''}`}>
                  <div>
                    <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{t(lang, 'footerNavigation')}</h4>
                    <ul class="mt-4 space-y-2">
                      {navItems.map((item) => (
                        <li key={item.key}>
                          <a class="transition hover:text-brand-600 dark:hover:text-accent-200" href={item.href}>
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div class={`text-sm text-gray-600 dark:text-gray-300 ${isRTL ? 'lg:text-right' : ''}`}>
                  <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{t(lang, 'footerContact')}</h4>
                  <ul class="mt-4 space-y-2">
                    <li>
                      <a href="mailto:opcelon@gmail.com" class="transition hover:text-brand-600 dark:hover:text-accent-200">
                        opcelon@gmail.com
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:09016807808"
                        dir="ltr"
                        class={`transition hover:text-brand-600 dark:hover:text-accent-200 ${isRTL ? 'inline-flex justify-end' : ''}`}
                      >
                        {t(lang, 'footerPhone')}
                      </a>
                    </li>
                    <li class="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                      <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-600/10 text-brand-600 dark:text-accent-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.5l9.294 5.796a.75.75 0 0 0 .912 0L21.75 7.5M4.5 18.75h15a1.5 1.5 0 0 0 1.5-1.5V6.75a1.5 1.5 0 0 0-1.5-1.5h-15a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5Z" />
                        </svg>
                      </span>
                      <div>
                        <p dir="ltr">opcelon@gmail.com</p>
                        <p class="text-xs">{t(lang, 'footerEnterpriseDesk')}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="mt-10 flex flex-col gap-4 border-t border-white/20 pt-6 text-xs text-gray-500 dark:text-gray-400 lg:flex-row lg:items-center lg:justify-between">
                <p>&copy; {new Date().getFullYear()} Quantum SEO Labs. {t(lang, 'footerRights')}</p>
                <div class="flex flex-wrap items-center gap-4">
                  <a href={`/${lang}/privacy`} class="transition hover:text-brand-600 dark:hover:text-accent-200">
                    {t(lang, 'footerPrivacy')}
                  </a>
                  <a href={`/${lang}/terms`} class="transition hover:text-brand-600 dark:hover:text-accent-200">
                    {t(lang, 'footerTerms')}
                  </a>
                  <a href={`/${lang}/about`} class="transition hover:text-brand-600 dark:hover:text-accent-200">
                    {t(lang, 'footerAbout')}
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};
