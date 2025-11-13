import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Layout } from '../layout';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Language, languages, t } from '../../utils/i18n';

interface ContactProps {
  lang: Language;
}

const digitMaps: Partial<Record<Language, string>> = {
  fa: '۰۱۲۳۴۵۶۷۸۹',
  ar: '٠١٢٣٤٥٦٧٨٩',
};

const nextSteps = [
  {
    id: 'discovery',
    copy: {
      en: 'Discovery call to align on objectives, stakeholders, and timelines.',
      fa: 'تماس Discovery برای همسویی اهداف، ذی‌نفعان و زمان‌بندی.',
      ar: 'جلسة استكشافية لمواءمة الأهداف وأصحاب المصلحة والجداول الزمنية.',
    },
  },
  {
    id: 'roadmap',
    copy: {
      en: 'We deliver a tailored roadmap with technical, content, and market workstreams.',
      fa: 'نقشه راهی اختصاصی شامل جریان‌های تکنیکال، محتوا و بازار ارائه می‌دهیم.',
      ar: 'نقدم خارطة طريق مخصصة تشمل المسارات التقنية والمحتوى والسوق.',
    },
  },
  {
    id: 'kickoff',
    copy: {
      en: 'Kickoff with shared dashboards, comms channels, and experiment backlog.',
      fa: 'شروع همکاری با داشبورد مشترک، کانال‌های ارتباطی و بک‌لاگ تست.',
      ar: 'الانطلاق مع لوحات تحكم مشتركة وقنوات تواصل وقائمة اختبارات.',
    },
  },
];

const highlightItems = [
  {
    id: 'response',
    title: {
      en: 'Response in under 48 hours',
      fa: 'پاسخ در کمتر از ۴۸ ساعت',
      ar: 'استجابة خلال أقل من ٤٨ ساعة',
    },
    description: {
      en: 'We route every submission directly to the enterprise desk for immediate triage.',
      fa: 'تمام درخواست‌ها مستقیماً به میز سازمانی ارسال می‌شود تا سریع رسیدگی شود.',
      ar: 'نحوّل كل طلب مباشرة إلى مكتب المؤسسات للمتابعة الفورية.',
    },
  },
  {
    id: 'playbook',
    title: {
      en: 'Battle-tested SEO playbooks',
      fa: 'پلی‌بوک‌های سئوی آزموده‌شده',
      ar: 'استراتيجيات SEO مجرَّبة',
    },
    description: {
      en: 'Technical, content, and authority growth tracks designed for scaling teams.',
      fa: 'مسیرهای رشد تکنیکال، محتوا و اعتبار برای تیم‌های در حال مقیاس طراحی شده‌اند.',
      ar: 'مسارات للنمو التقني والمحتوى والسلطة معدّة لفرق التوسّع.',
    },
  },
];

const supportItems = [
  {
    id: 'nda',
    title: {
      en: 'Enterprise support desk',
      fa: 'میز پشتیبانی مشتریان سازمانی',
      ar: 'مكتب دعم المؤسسات',
    },
    description: {
      en: 'Need to onboard legal, procurement, or security? We provide compliance packs, DPAs, and SOC II documentation.',
      fa: 'برای تطبیق حقوقی، خرید یا امنیت نیاز دارید؟ بسته‌های کامپلاینس، DPA و مستندات SOC II ارائه می‌کنیم.',
      ar: 'هل تحتاج إلى إشراك فرق القانون أو المشتريات أو الأمن؟ نوفر حزم الامتثال واتفاقيات حماية البيانات ووثائق SOC II.',
    },
  },
  {
    id: 'office',
    title: {
      en: 'Global collaboration hours',
      fa: 'ساعات همکاری جهانی',
      ar: 'ساعات تعاون عالمية',
    },
    description: {
      en: 'We sync with EMEA and North America time zones for product and growth teams.',
      fa: 'با تیم‌های محصول و رشد در مناطق زمانی اروپا، خاورمیانه و آمریکای شمالی همگام می‌شویم.',
      ar: 'ننسّق مع مناطق التوقيت في أوروبا والشرق الأوسط وأمريكا الشمالية لفرق المنتج والنمو.',
    },
  },
];

const localizeDigits = (value: string, lang: Language) => {
  const map = digitMaps[lang];
  if (!map) return value;

  return value.replace(/\d/g, (digit) => {
    const index = Number(digit);
    return Number.isFinite(index) && map[index] ? map[index] : digit;
  });
};

export const ContactPage: FC<ContactProps> = ({ lang }) => {
  const title = t(lang, 'contactPageTitle');
  const description = t(lang, 'contactPageDescription');
  const canonical = `https://seo.webyar.cloud/${lang}/contact`;
  const isRTL = languages[lang].dir === 'rtl';
  const pick = <T extends Record<Language, string>>(copy: T) => copy[lang];
  const phoneRaw = '09016807808';
  const phoneDisplay = localizeDigits(phoneRaw, lang);

  const contactFormScript = `
    (() => {
      const form = document.querySelector('[data-contact-form]');
      if (!form) return;

      const status = form.querySelector('[data-contact-status]');
      const submitButton = form.querySelector('button[type="submit"]');
      const label = submitButton?.querySelector('[data-button-label]');
      if (!status || !submitButton || !label) return;

      const baseClass = status.dataset.baseClass || status.className;
      const hiddenClass = status.dataset.hiddenClass || '';
      const hiddenTokens = hiddenClass.split(/\s+/).filter(Boolean);
      const baseTokens = baseClass.split(/\s+/).filter(Boolean);
      const tokensWithoutHidden = baseTokens.filter((cls) => !hiddenTokens.includes(cls));
      const successMessage = ${JSON.stringify(t(lang, 'contactSuccess'))};
      const errorMessage = ${JSON.stringify(t(lang, 'contactError'))};
      const validationMessage = ${JSON.stringify(t(lang, 'contactValidationError'))};
      const submittingLabel = ${JSON.stringify(t(lang, 'contactSubmitting'))};
      const defaultLabel = label.textContent || '';
      const toneFilteredTokens = tokensWithoutHidden.filter(
        (cls) => !['text-gray-500', 'text-gray-600', 'dark:text-gray-400', 'dark:text-gray-200'].includes(cls)
      );
      const baseForStateTokens = toneFilteredTokens.length > 0 ? toneFilteredTokens : tokensWithoutHidden;
      const baseForState = baseForStateTokens.join(' ');
      const mergeClass = (suffix) => {
        if (!suffix) return baseForState;
        return baseForState ? (baseForState + ' ' + suffix).trim() : suffix;
      };
      const hideStatus = () => {
        const resetTokens = tokensWithoutHidden.concat(hiddenTokens);
        status.textContent = '';
        status.className = resetTokens.join(' ');
      };

      hideStatus();

      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        hideStatus();
        submitButton.disabled = true;
        label.textContent = submittingLabel;

        try {
          const formData = new FormData(form);
          const payload = {};

          formData.forEach((value, key) => {
            if (typeof value === 'string') {
              payload[key] = value;
            }
          });

          payload.name = (payload.name || '').trim();
          payload.email = (payload.email || '').trim();
          payload.message = (payload.message || '').trim();
          if (payload.website) payload.website = payload.website.trim();
          if (payload.language) payload.language = payload.language.trim();
          if (payload.companySize) payload.companySize = payload.companySize.trim();
          if (payload.engagement) payload.engagement = payload.engagement.trim();

          if (!payload.name || !payload.email || !payload.message) {
            status.textContent = validationMessage;
            status.className = mergeClass(
              'border border-rose-100/70 bg-rose-50/80 text-rose-600 shadow-sm dark:border-rose-400/30 dark:bg-rose-500/15 dark:text-rose-200'
            );
            return;
          }

          const response = await fetch(form.getAttribute('action') || window.location.pathname, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error('Request failed');
          }

          const result = await response.json();

          if (!result?.success) {
            throw new Error('Submission rejected');
          }

          form.reset();
          status.textContent = successMessage;
          status.className = mergeClass(
            'border border-emerald-200/70 bg-emerald-50/80 text-emerald-600 shadow-sm dark:border-emerald-400/40 dark:bg-emerald-500/15 dark:text-emerald-200'
          );
        } catch (error) {
          console.error('Contact form submission failed', error);
          status.textContent = errorMessage;
          status.className = mergeClass(
            'border border-rose-100/70 bg-rose-50/80 text-rose-600 shadow-sm dark:border-rose-400/30 dark:bg-rose-500/15 dark:text-rose-200'
          );
        } finally {
          label.textContent = defaultLabel;
          submitButton.disabled = false;
        }
      });
    })();
  `;

  const contactFormScript = `
    (() => {
      const form = document.querySelector('[data-contact-form]');
      if (!form) return;

      const status = form.querySelector('[data-contact-status]');
      const submitButton = form.querySelector('button[type="submit"]');
      const label = submitButton?.querySelector('[data-button-label]');
      if (!status || !submitButton || !label) return;

      const baseClass = status.dataset.baseClass || status.className;
      const successMessage = ${JSON.stringify(t(lang, 'contactSuccess'))};
      const errorMessage = ${JSON.stringify(t(lang, 'contactError'))};
      const validationMessage = ${JSON.stringify(t(lang, 'contactValidationError'))};
      const submittingLabel = ${JSON.stringify(t(lang, 'contactSubmitting'))};
      const defaultLabel = label.textContent || '';
      const baseNoColor = baseClass
        .replace(/\btext-gray-500\b/g, '')
        .replace(/\bdark:text-gray-400\b/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      const baseForState = baseNoColor.length > 0 ? baseNoColor : baseClass;
      const mergeClass = (suffix) => {
        if (!suffix) return baseForState;
        return baseForState ? (baseForState + ' ' + suffix).trim() : suffix;
      };

      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        status.textContent = '';
        status.className = baseClass;
        submitButton.disabled = true;
        label.textContent = submittingLabel;

        try {
          const formData = new FormData(form);
          const payload = {};

          formData.forEach((value, key) => {
            if (typeof value === 'string') {
              payload[key] = value;
            }
          });

          payload.name = (payload.name || '').trim();
          payload.email = (payload.email || '').trim();
          payload.message = (payload.message || '').trim();
          if (payload.website) payload.website = payload.website.trim();
          if (payload.language) payload.language = payload.language.trim();
          if (payload.companySize) payload.companySize = payload.companySize.trim();
          if (payload.engagement) payload.engagement = payload.engagement.trim();

          if (!payload.name || !payload.email || !payload.message) {
            status.textContent = validationMessage;
            status.className = mergeClass('text-rose-600 dark:text-rose-400');
            return;
          }

          const response = await fetch(form.getAttribute('action') || window.location.pathname, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error('Request failed');
          }

          const result = await response.json();

          if (!result?.success) {
            throw new Error('Submission rejected');
          }

          form.reset();
          status.textContent = successMessage;
          status.className = mergeClass('text-brand-600 dark:text-accent-200');
        } catch (error) {
          console.error('Contact form submission failed', error);
          status.textContent = errorMessage;
          status.className = mergeClass('text-rose-600 dark:text-rose-400');
        } finally {
          label.textContent = defaultLabel;
          submitButton.disabled = false;
        }
      });
    })();
  `;

  return (
    <Layout lang={lang} title={title} description={description} canonical={canonical} active="contact">
      <section class={`py-16 sm:py-20 lg:py-24 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div class="container">
          <div class="relative overflow-hidden rounded-[44px] border border-white/15 bg-gradient-to-br from-white via-brand-50/60 to-accent-100/30 p-1 shadow-soft dark:from-surface-muted/70 dark:via-midnight/70 dark:to-brand-900/40">
            <div class="pointer-events-none absolute -top-40 -left-24 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl dark:bg-brand-500/20" />
            <div class="pointer-events-none absolute -bottom-48 right-[-6rem] h-96 w-96 rounded-full bg-accent-400/10 blur-3xl dark:bg-accent-500/20" />
            <div class="relative rounded-[40px] bg-white/85 p-6 shadow-glass backdrop-blur-2xl dark:bg-surface-muted/85 sm:p-10 lg:p-14">
              <div class={`grid gap-12 lg:grid-cols-[0.95fr_1.05fr] ${isRTL ? 'lg:pl-10' : 'lg:pr-10'}`}>
                <div class={`flex flex-col gap-10 ${isRTL ? 'lg:pl-10 xl:pl-16' : 'lg:pr-10 xl:pr-16'}`}>
                  <div class="space-y-4">
                    <Badge tone="accent">{t(lang, 'contactTitle')}</Badge>
                    <h1 class="font-display text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                      {t(lang, 'contactSubtitle')}
                    </h1>
                    <p class="max-w-xl text-sm text-gray-600 dark:text-gray-300">
                      {pick({
                        en: 'Share your markets, tech stack, and growth ambitions. Our enterprise desk will follow up within 48 hours.',
                        fa: 'بازارهای هدف، پشته فنی و اهداف رشد خود را توضیح دهید. تیم ما ظرف ۴۸ ساعت پاسخ می‌دهد.',
                        ar: 'اخبرنا عن الأسواق المستهدفة والتقنيات وأهداف النمو. سيعاود فريقنا التواصل خلال ٤٨ ساعة.',
                      })}
                    </p>
                  </div>
                  <div class={`grid gap-4 sm:grid-cols-2 ${isRTL ? 'sm:text-right' : ''}`}>
                    {highlightItems.map((item) => (
                      <div
                        key={item.id}
                        class="rounded-2xl border border-white/40 bg-white/70 p-5 text-sm shadow-inner transition hover:border-brand-200/60 hover:shadow-soft dark:border-white/10 dark:bg-midnight/60"
                      >
                        <h3 class="font-semibold text-gray-900 dark:text-white">{pick(item.title)}</h3>
                        <p class="mt-2 text-gray-600 dark:text-gray-300">{pick(item.description)}</p>
                      </div>
                    ))}
                  </div>
                  <div class="space-y-6">
                    <h2 class="font-display text-2xl font-semibold text-gray-900 dark:text-white">
                      {pick({ en: 'What happens next?', fa: 'گام بعد چیست؟', ar: 'ما الخطوات التالية؟' })}
                    </h2>
                    <ol class={`space-y-4 text-sm text-gray-600 dark:text-gray-300 ${isRTL ? 'text-right' : ''}`}>
                      {nextSteps.map((step, index) => (
                        <li key={step.id} class="flex items-start gap-3">
                          <span class="mt-1 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-500/15 font-semibold text-brand-600 dark:text-accent-200">
                            {index + 1}
                          </span>
                          <span>{pick(step.copy)}</span>
                        </li>
                      ))}
                    </ol>
                    <div class={`grid gap-4 sm:grid-cols-2 ${isRTL ? 'sm:text-right' : ''}`}>
                      {supportItems.map((item) => (
                        <div key={item.id} class="rounded-2xl border border-white/20 bg-white/60 p-5 text-sm shadow-inner dark:border-white/10 dark:bg-midnight/50">
                          <h3 class="font-semibold text-gray-900 dark:text-white">{pick(item.title)}</h3>
                          <p class="mt-2 text-gray-600 dark:text-gray-300">{pick(item.description)}</p>
                        </div>
                      ))}
                    </div>
                    <div class={`flex flex-wrap gap-4 text-sm ${isRTL ? 'justify-end' : ''}`}>
                      <div class="flex items-center gap-2 rounded-2xl border border-white/30 bg-white/70 px-4 py-3 shadow-inner dark:border-white/10 dark:bg-midnight/60">
                        <span class="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-500/15 font-semibold text-brand-600 dark:text-accent-200">
                          ☎
                        </span>
                        <div class="flex flex-col">
                          <span class="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            {pick({ en: 'Call us', fa: 'تماس تلفنی', ar: 'اتصال هاتفي' })}
                          </span>
                          <a
                            href={`tel:${phoneRaw}`}
                            class="font-semibold text-gray-900 transition hover:text-brand-600 dark:text-white dark:hover:text-accent-200"
                            dir="ltr"
                          >
                            <span class="font-mono tracking-wide">{phoneDisplay}</span>
                          </a>
                        </div>
                      </div>
                      <div class="flex items-center gap-2 rounded-2xl border border-white/30 bg-white/70 px-4 py-3 shadow-inner dark:border-white/10 dark:bg-midnight/60">
                        <span class="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-500/15 font-semibold text-brand-600 dark:text-accent-200">
                          ✉
                        </span>
                        <div class="flex flex-col">
                          <span class="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            {pick({ en: 'Email', fa: 'ایمیل', ar: 'البريد الإلكتروني' })}
                          </span>
                          <a
                            href="mailto:opcelon@gmail.com"
                            class="font-semibold text-gray-900 transition hover:text-brand-600 dark:text-white dark:hover:text-accent-200"
                            dir="ltr"
                          >
                            opcelon@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <form
                  class={`relative grid gap-6 rounded-[30px] border border-white/30 bg-gradient-to-br from-brand-50/90 via-white/95 to-accent-50/60 p-6 shadow-xl shadow-brand-500/10 backdrop-blur-xl dark:from-midnight/80 dark:via-surface-muted/90 dark:to-brand-900/30 sm:p-8 ${
                    isRTL ? 'text-right' : ''
                  }`}
                  method="post"
                  action={`/${lang}/contact`}
                  data-contact-form
                >
                  <div class="space-y-2">
                    <h2 class="font-display text-2xl font-semibold text-gray-900 dark:text-white">
                      {pick({ en: 'Book your free strategy session', fa: 'جلسه استراتژی رایگان رزرو کنید', ar: 'احجز جلسة استراتيجية مجانية' })}
                    </h2>
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                      {pick({
                        en: 'Tell us about your pipeline, markets, and challenges so we can prep the right experts.',
                        fa: 'درباره قیف فروش، بازارها و چالش‌های خود بگویید تا متخصصان مناسب را آماده کنیم.',
                        ar: 'أخبرنا عن قنوات المبيعات والأسواق والتحديات لنجهّز الخبراء المناسبين.',
                      })}
                    </p>
                  </div>
                  <div
                    role="status"
                    aria-live="polite"
                    data-contact-status
                    data-base-class="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-4 py-2 text-xs font-medium text-gray-600 shadow-inner transition dark:border-white/10 dark:bg-midnight/60 dark:text-gray-200"
                    data-hidden-class="opacity-0 pointer-events-none"
                    class="opacity-0 pointer-events-none"
                  ></div>
                  <div class={`grid gap-4 sm:grid-cols-2 ${isRTL ? 'sm:text-right' : ''}`}>
                    <label class="flex flex-col gap-2 text-sm">
                      <span class="font-semibold text-gray-700 dark:text-gray-200">{t(lang, 'formName')}</span>
                      <input
                        type="text"
                        name="name"
                        required
                        class="h-12 rounded-2xl border border-white/40 bg-white/80 px-4 text-sm font-medium text-gray-700 placeholder:text-gray-400 shadow-inner focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-midnight/70 dark:text-gray-100"
                      />
                    </label>
                    <label class="flex flex-col gap-2 text-sm">
                      <span class="font-semibold text-gray-700 dark:text-gray-200">{t(lang, 'formEmail')}</span>
                      <input
                        type="email"
                        name="email"
                        required
                        class="h-12 rounded-2xl border border-white/40 bg-white/80 px-4 text-sm font-medium text-gray-700 placeholder:text-gray-400 shadow-inner focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-midnight/70 dark:text-gray-100"
                      />
                    </label>
                  </div>
                  <div class={`grid gap-4 sm:grid-cols-2 ${isRTL ? 'sm:text-right' : ''}`}>
                    <label class="flex flex-col gap-2 text-sm">
                      <span class="font-semibold text-gray-700 dark:text-gray-200">{t(lang, 'formWebsite')}</span>
                      <input
                        type="url"
                        name="website"
                        placeholder="https://"
                        class="h-12 rounded-2xl border border-white/40 bg-white/80 px-4 text-sm font-medium text-gray-700 placeholder:text-gray-400 shadow-inner focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-midnight/70 dark:text-gray-100"
                      />
                    </label>
                    <label class="flex flex-col gap-2 text-sm">
                      <span class="font-semibold text-gray-700 dark:text-gray-200">
                        {pick({ en: 'Preferred language', fa: 'زبان ترجیحی', ar: 'اللغة المفضلة' })}
                      </span>
                      <select
                        name="language"
                        class="h-12 rounded-2xl border border-white/40 bg-white/80 px-4 text-sm font-medium text-gray-700 shadow-inner focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-midnight/70 dark:text-gray-100"
                      >
                        <option value="fa">فارسی</option>
                        <option value="en">English</option>
                        <option value="ar">العربية</option>
                      </select>
                    </label>
                  </div>
                  <div class={`grid gap-4 sm:grid-cols-2 ${isRTL ? 'sm:text-right' : ''}`}>
                    <label class="flex flex-col gap-2 text-sm">
                      <span class="font-semibold text-gray-700 dark:text-gray-200">
                        {pick({ en: 'Company size', fa: 'اندازه سازمان', ar: 'حجم الشركة' })}
                      </span>
                      <select
                        name="companySize"
                        class="h-12 rounded-2xl border border-white/40 bg-white/80 px-4 text-sm font-medium text-gray-700 shadow-inner focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-midnight/70 dark:text-gray-100"
                      >
                        <option value="growth">50-200</option>
                        <option value="scale">200-1000</option>
                        <option value="enterprise">1000+</option>
                      </select>
                    </label>
                    <label class="flex flex-col gap-2 text-sm">
                      <span class="font-semibold text-gray-700 dark:text-gray-200">
                        {pick({ en: 'Engagement model', fa: 'نوع همکاری', ar: 'نموذج التعاون' })}
                      </span>
                      <select
                        name="engagement"
                        class="h-12 rounded-2xl border border-white/40 bg-white/80 px-4 text-sm font-medium text-gray-700 shadow-inner focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-midnight/70 dark:text-gray-100"
                      >
                        <option value="audit">Audit / Sprint (3-4 months)</option>
                        <option value="retainer">Growth Retainer (6 months)</option>
                        <option value="scale">Scale Retainer (12 months)</option>
                        <option value="custom">Enterprise Custom</option>
                      </select>
                    </label>
                  </div>
                  <label class="flex flex-col gap-2 text-sm">
                    <span class="font-semibold text-gray-700 dark:text-gray-200">{t(lang, 'formMessage')}</span>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      class="min-h-[140px] rounded-2xl border border-white/40 bg-white/80 px-4 py-3 text-sm font-medium text-gray-700 placeholder:text-gray-400 shadow-inner focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-midnight/70 dark:text-gray-100"
                      placeholder={pick({
                        en: 'Outline goals, markets, and current SEO performance…',
                        fa: 'اهداف، بازارها و وضعیت فعلی سئوی خود را توضیح دهید…',
                        ar: 'اشرح الأهداف والأسواق وأداء الـ SEO الحالي…',
                      })}
                    ></textarea>
                  </label>
                  <div class={`flex flex-col gap-3 pt-2 sm:flex-row sm:items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                    <Button type="submit" variant="primary" className="w-full sm:w-auto">
                      {t(lang, 'formSubmit')}
                    </Button>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {pick({
                        en: 'We respond within two business days. NDAs available on request.',
                        fa: 'در کمتر از دو روز کاری پاسخ می‌دهیم. NDA در صورت نیاز امضا می‌شود.',
                        ar: 'نرد خلال يومي عمل. يمكن توقيع اتفاقية عدم إفشاء عند الطلب.',
                      })}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <script dangerouslySetInnerHTML={{ __html: contactFormScript }} />
    </Layout>
  );
};
