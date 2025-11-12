import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Layout } from '../layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { SectionHeader } from '../components/SectionHeader';
import { Icon } from '../components/Icon';
import { Badge } from '../components/Badge';
import { Language, t, languages } from '../../utils/i18n';
import servicesData from '../../data/services.json';

interface ServicesProps {
  lang: Language;
}

const serviceNarrative = {
  fa: {
    eyebrow: 'کاتالوگ خدمات',
    introTitle: 'خدمات سئو ۳۶۰ درجه برای سازمان‌ها',
    introDescription:
      'از معماری تکنیکال تا روایت محتوا و تحلیل بازار، هر ماژول طوری طراحی شده که با سیستم‌های داخلی شما ادغام شود و رشد ارگانیک را پایدار نگه دارد.',
    categories: {
      'technical-seo': {
        tagline: 'زیرساخت آماده مقیاس با سیستم هشداردهی پیشگیرانه',
        deliverables: ['تحلیل لاگ و بودجه خزش', 'بهینه‌سازی رندر و معماری', 'پایش Core Web Vitals و Alerting'],
        outcomes: ['کاهش خطاهای بحرانی به زیر ۱%', 'افزایش سرعت ایندکس صفحات', 'پایداری تجربه کاربری در نسخه‌های جدید'],
        packages: ['Kickstart SEO Audit', 'Scale Retainer'],
      },
      'on-page-seo': {
        tagline: 'هر URL با داده، نیت کاربر و روایت دقیق تقویت می‌شود',
        deliverables: ['استراتژی کلاستر محتوا و Entity', 'بازنویسی پیام و UX Copy', 'آزمایش‌های A/B و تحلیل رفتار'],
        outcomes: ['افزایش نرخ تبدیل صفحه', 'تقویت رتبه در کلمات تراکنشی', 'بهبود Engagement کاربران'],
        packages: ['On-Page Optimisation Sprint', 'Growth Retainer'],
      },
      'off-page-seo': {
        tagline: 'اعتبار دامنه از طریق کمپین‌های داده‌محور و روابط رسانه‌ای',
        deliverables: ['استراتژی لینک‌سازی با امتیازدهی پیش‌بینی', 'Digital PR و پوشش رسانه‌ای', 'مدیریت اعتبار برند'],
        outcomes: ['رشد اقتدار دامنه', 'افزایش ارجاعات معتبر', 'تثبیت برند در صنایع کلیدی'],
        packages: ['Growth Retainer', 'Scale Retainer'],
      },
      'content-seo': {
        tagline: 'سیستم تولید محتوا برای چند زبان و چند محصول',
        deliverables: ['نقشه‌راه محتوا و اولویت‌بندی موضوعات', 'مدل‌سازی نیت و سفر کاربر', 'اتوماسیون هوشمند تولید و ویرایش'],
        outcomes: ['افزایش سرعت تولید محتوا', 'پوشش سریع موضوعات ترند', 'یکپارچگی لحن در همه زبان‌ها'],
        packages: ['Growth Retainer', 'Enterprise Custom Program'],
      },
      'international-seo': {
        tagline: 'ورود به بازارهای جدید با معماری hreflang و محلی‌سازی دقیق',
        deliverables: ['طراحی معماری چندزبانه', 'مدیریت ترجمه و تطبیق حقوقی', 'داشبورد عملکرد منطقه‌ای'],
        outcomes: ['لانچ بدون افت ترافیک', 'افزایش سهم بازار بین‌المللی', 'هماهنگی پیام در کشورها'],
        packages: ['Scale Retainer', 'Enterprise Custom Program'],
      },
      'analytics-reporting': {
        tagline: 'داشبوردهای لحظه‌ای و مدل‌سازی رشد برای تیم‌های تصمیم‌گیر',
        deliverables: ['ساخت Workspace تحلیلی', 'مدل‌سازی سناریو و پیش‌بینی', 'گزارش‌های مدیریتی چندزبانه'],
        outcomes: ['تصمیم‌گیری سریع هیئت مدیره', 'همسویی KPIهای بازاریابی و محصول', 'دید 360 درجه از عملکرد ارگانیک'],
        packages: ['Growth Retainer', 'Scale Retainer'],
      },
    },
    whatYouGet: 'دستاوردهای کلیدی',
    businessOutcomes: 'نتایج مورد انتظار',
    recommendedPackages: 'پکیج‌های پیشنهادی',
  },
  en: {
    eyebrow: 'Service catalogue',
    introTitle: '360° enterprise SEO services',
    introDescription:
      'From technical architecture to storytelling and market intelligence, each module embeds into your teams to sustain predictable organic growth.',
    categories: {
      'technical-seo': {
        tagline: 'Scale-ready infrastructure with proactive monitoring',
        deliverables: ['Log and crawl budget diagnostics', 'Rendering & architecture optimisation', 'Core Web Vitals monitoring and alerting'],
        outcomes: ['Critical issues below 1%', 'Faster indexation velocity', 'Stable UX scores across releases'],
        packages: ['Kickstart SEO Audit', 'Scale Retainer'],
      },
      'on-page-seo': {
        tagline: 'Every URL powered by intent, data, and precise messaging',
        deliverables: ['Topic cluster & entity strategy', 'UX copywriting and messaging refresh', 'A/B testing and behavioural analytics'],
        outcomes: ['Improved conversion rates', 'Higher rankings for transactional queries', 'Richer user engagement signals'],
        packages: ['On-Page Optimisation Sprint', 'Growth Retainer'],
      },
      'off-page-seo': {
        tagline: 'Authority grown through data-led outreach and media',
        deliverables: ['Predictive link acquisition programmes', 'Digital PR activations', 'Brand monitoring & reputation management'],
        outcomes: ['Domain authority uplift', 'Increase in high-quality referrals', 'Brand leadership across verticals'],
        packages: ['Growth Retainer', 'Scale Retainer'],
      },
      'content-seo': {
        tagline: 'Multilingual content systems built for velocity',
        deliverables: ['Content roadmaps and prioritisation', 'Intent modelling and journey mapping', 'AI-assisted content operations'],
        outcomes: ['Higher publishing velocity', 'Faster coverage of emerging topics', 'Consistent voice across locales'],
        packages: ['Growth Retainer', 'Enterprise Custom Program'],
      },
      'international-seo': {
        tagline: 'Flawless hreflang architecture and localisation',
        deliverables: ['Multilingual architecture design', 'Coordinated localisation with compliance', 'Regional performance workspaces'],
        outcomes: ['Zero-loss launches', 'International market share expansion', 'Aligned messaging across countries'],
        packages: ['Scale Retainer', 'Enterprise Custom Program'],
      },
      'analytics-reporting': {
        tagline: 'Real-time analytics and growth modelling for leadership',
        deliverables: ['Custom analytics workspaces', 'Scenario modelling & forecasting', 'Executive reporting in multiple languages'],
        outcomes: ['Faster executive decisions', 'Aligned marketing and product KPIs', '360° visibility on organic performance'],
        packages: ['Growth Retainer', 'Scale Retainer'],
      },
    },
    whatYouGet: 'What you get',
    businessOutcomes: 'Business outcomes',
    recommendedPackages: 'Recommended packages',
  },
  ar: {
    eyebrow: 'دليل الخدمات',
    introTitle: 'خدمات سيو شاملة للمؤسسات',
    introDescription:
      'من الهندسة التقنية إلى سرد المحتوى وذكاء السوق، كل وحدة مصممة للاندماج مع فرقكم الداخلية والحفاظ على نمو عضوي موثوق.',
    categories: {
      'technical-seo': {
        tagline: 'بنية جاهزة للتوسع مع مراقبة استباقية',
        deliverables: ['تحليل السجلات وميزانية الزحف', 'تحسين الرندر والهندسة', 'مراقبة مؤشرات الويب الأساسية والتنبيهات'],
        outcomes: ['انخفاض الأخطاء الحرجة إلى أقل من 1%', 'تسريع فهرسة الصفحات', 'استقرار تجربة المستخدم في الإصدارات'],
        packages: ['Kickstart SEO Audit', 'Scale Retainer'],
      },
      'on-page-seo': {
        tagline: 'كل صفحة مدعومة بالبيانات ونية المستخدم والرسائل الدقيقة',
        deliverables: ['استراتيجية مجموعات المحتوى والكيانات', 'تجديد كتابة تجربة المستخدم', 'اختبارات A/B وتحليلات السلوك'],
        outcomes: ['ارتفاع معدلات التحويل', 'تحسين ترتيب الكلمات المعاملاتية', 'تعزيز إشارات التفاعل'],
        packages: ['On-Page Optimisation Sprint', 'Growth Retainer'],
      },
      'off-page-seo': {
        tagline: 'تعزيز السلطة من خلال حملات موجهة بالبيانات والإعلام',
        deliverables: ['برامج اكتساب الروابط التنبؤية', 'حملات علاقات عامة رقمية', 'مراقبة العلامة وإدارة السمعة'],
        outcomes: ['زيادة سلطة النطاق', 'نمو الإحالات عالية الجودة', 'ترسيخ العلامة في القطاعات الأساسية'],
        packages: ['Growth Retainer', 'Scale Retainer'],
      },
      'content-seo': {
        tagline: 'أنظمة محتوى متعددة اللغات بسرعة عالية',
        deliverables: ['خرائط طريق للمحتوى وتحديد الأولويات', 'نمذجة النية ورحلة المستخدم', 'عمليات محتوى مدعومة بالذكاء الاصطناعي'],
        outcomes: ['زيادة سرعة النشر', 'تغطية أسرع للموضوعات الرائجة', 'اتساق الصوت في جميع المناطق'],
        packages: ['Growth Retainer', 'Enterprise Custom Program'],
      },
      'international-seo': {
        tagline: 'هندسة hreflang دقيقة وتوطين متكامل',
        deliverables: ['تصميم هندسة متعددة اللغات', 'توطين بالتعاون مع الامتثال', 'لوحات أداء لكل منطقة'],
        outcomes: ['إطلاق بدون خسارة في الحركة', 'توسيع الحصة في الأسواق الدولية', 'توحيد الرسائل عبر الدول'],
        packages: ['Scale Retainer', 'Enterprise Custom Program'],
      },
      'analytics-reporting': {
        tagline: 'تحليلات لحظية ونمذجة نمو للقيادة التنفيذية',
        deliverables: ['مساحات تحليلات مخصصة', 'نمذجة سيناريوهات وتنبؤ', 'تقارير تنفيذية بعدة لغات'],
        outcomes: ['قرارات أسرع على مستوى الإدارة', 'مواءمة مؤشرات التسويق والمنتج', 'رؤية شاملة للأداء العضوي'],
        packages: ['Growth Retainer', 'Scale Retainer'],
      },
    },
    whatYouGet: 'ما الذي تحصل عليه',
    businessOutcomes: 'النتائج المتوقعة',
    recommendedPackages: 'الباقات المقترحة',
  },
};

const serviceTabsScript = `
  window.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('[data-service-tabs]');
    if (!container) return;
    const buttons = Array.from(container.querySelectorAll('[data-service-tab]'));
    const panels = Array.from(container.querySelectorAll('[data-service-panel]'));

    const getClasses = (el, key) => (el.dataset[key] || '').split(' ').filter(Boolean);

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const targetId = button.dataset.serviceTab;
        if (!targetId) return;

        buttons.forEach((btn) => {
          const active = getClasses(btn, 'activeClass');
          const inactive = getClasses(btn, 'inactiveClass');
          if (active.length) btn.classList.remove(...active);
          if (inactive.length) btn.classList.add(...inactive);
          btn.setAttribute('aria-selected', 'false');
        });

        panels.forEach((panel) => {
          if (panel instanceof HTMLElement) {
            panel.classList.add('hidden');
          }
        });

        button.setAttribute('aria-selected', 'true');
        const active = getClasses(button, 'activeClass');
        const inactive = getClasses(button, 'inactiveClass');
        if (inactive.length) button.classList.remove(...inactive);
        if (active.length) button.classList.add(...active);

        const panel = container.querySelector(\`[data-service-panel="\${targetId}"]\`);
        if (panel instanceof HTMLElement) {
          panel.classList.remove('hidden');
        }
      });
    });
  });
`;

export const ServicesPage: FC<ServicesProps> = ({ lang }) => {
  const title = t(lang, 'servicesPageTitle');
  const locale = serviceNarrative[lang];
  const isRTL = languages[lang].dir === 'rtl';
  const services = servicesData.services;
  const defaultServiceId = services[0]?.id;

  return (
    <Layout lang={lang} title={title} active="services">
      <section class="space-y-10">
        <SectionHeader eyebrow={locale.eyebrow} title={locale.introTitle} description={locale.introDescription} align="start" />
        <Card variant="glass" interactive={false} className="flex flex-wrap items-center justify-between gap-4">
          <div class={`flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:text-accent-200">
              <Icon name="radar" />
            </span>
            <p>
              {lang === 'en'
                ? 'Choose a module to explore deliverables, outcomes, and the engagement models that fit your roadmap.'
                : lang === 'fa'
                ? 'ماژول موردنظر را انتخاب کنید تا جزئیات خدمات، نتایج و مدل همکاری متناسب با نقشه راه خود را ببینید.'
                : 'اختر الوحدة المناسبة لاستكشاف نطاق العمل والنتائج ونماذج التعاون التي تلائم خارطة طريقك.'}
            </p>
          </div>
          <Button href={`/${lang}/contact`} variant="secondary">
            {t(lang, 'ctaButton')}
          </Button>
        </Card>
      </section>

      <section class="mt-16" data-service-tabs>
        <div class={`grid gap-8 lg:grid-cols-[320px_1fr] ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <aside>
            <div class="flex flex-col gap-2 rounded-3xl border border-white/20 bg-white/80 p-4 shadow-soft dark:border-white/10 dark:bg-surface-muted/80">
              {services.map((service) => {
                const content = service.translations[lang];
                const isActive = service.id === defaultServiceId;
                const baseClass = 'flex items-center justify-between gap-4 rounded-2xl px-4 py-3 text-sm font-semibold transition';
                const activeClass = 'bg-brand-500/10 text-brand-700 shadow-inner dark:bg-brand-500/20 dark:text-white';
                const inactiveClass = 'text-gray-600 hover:bg-brand-500/10 hover:text-brand-700 dark:text-gray-300 dark:hover:text-white';
                return (
                  <button
                    key={service.id}
                    type="button"
                    id={`service-tab-${service.id}`}
                    data-service-tab={service.id}
                    class={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
                    data-active-class={activeClass}
                    data-inactive-class={inactiveClass}
                    aria-selected={isActive ? 'true' : 'false'}
                    role="tab" aria-controls={`service-panel-${service.id}`}
                  >
                    <span class="flex items-center gap-3">
                      <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-accent-200">
                        <Icon name={service.icon as Parameters<typeof Icon>[0]['name']} />
                      </span>
                      <span class="text-start">{content.title}</span>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-4 w-4"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </aside>

          <div class="space-y-6">
            {services.map((service) => {
              const content = service.translations[lang];
              const narrative = locale.categories[service.id as keyof typeof locale.categories];
              return (
                <div key={service.id} data-service-panel={service.id} id={`service-panel-${service.id}`} class={service.id === defaultServiceId ? '' : 'hidden'} role="tabpanel" aria-labelledby={`service-tab-${service.id}`}>
                  <Card variant="glass" interactive={false} className="space-y-6">
                    <div class="flex flex-col gap-3">
                      <Badge tone="accent">{content.title}</Badge>
                      <h2 class="font-display text-2xl font-semibold text-gray-900 dark:text-white">{narrative.tagline}</h2>
                      <p class="text-sm text-gray-600 dark:text-gray-300">{content.description}</p>
                    </div>
                    <div class={`grid gap-6 md:grid-cols-2 ${isRTL ? 'text-right' : ''}`}>
                      <div class="space-y-3">
                        <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{locale.whatYouGet}</h3>
                        <ul class="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-200">
                          {narrative.deliverables.map((item) => (
                            <li key={item} class="flex items-start gap-2">
                              <span class="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-accent-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div class="space-y-3">
                        <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{locale.businessOutcomes}</h3>
                        <ul class="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-200">
                          {narrative.outcomes.map((item) => (
                            <li key={item} class="flex items-start gap-2">
                              <span class="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-brand-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div class="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <span class="font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{locale.recommendedPackages}</span>
                      {narrative.packages.map((pkg) => (
                        <span key={pkg} class="rounded-full border border-brand-200/60 bg-white/70 px-4 py-2 text-xs font-semibold text-brand-600 dark:border-white/10 dark:bg-surface-muted/70 dark:text-accent-200">
                          {pkg}
                        </span>
                      ))}
                      <Button href={`/${lang}/pricing`} variant="ghost" className={isRTL ? 'mr-auto' : 'ml-auto'}>
                        {t(lang, 'viewPlans')}
                      </Button>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
        <script dangerouslySetInnerHTML={{ __html: serviceTabsScript }} />
      </section>
    </Layout>
  );
};
