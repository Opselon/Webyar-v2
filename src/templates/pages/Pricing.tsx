import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Layout } from '../layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { SectionHeader } from '../components/SectionHeader';
import { Badge } from '../components/Badge';
import { Language, t, languages } from '../../utils/i18n';
import pricingData from '../../data/pricing.json';

interface PricingProps {
  lang: Language;
}

export const PricingPage: FC<PricingProps> = ({ lang }) => {
  const title = t(lang, 'pricingPageTitle');
  const isRTL = languages[lang].dir === 'rtl';
  const shortTermPackages = pricingData.packages.filter((p) => p.type === 'short-term');
  const longTermPackages = pricingData.packages.filter((p) => p.type === 'long-term');

  return (
    <Layout lang={lang} title={title} active="pricing">
      <section class="space-y-10">
        <SectionHeader
          eyebrow={t(lang, 'pricingTitle')}
          title={lang === 'en' ? 'Flexible retainers built for sustainable growth' : lang === 'fa' ? 'ساختارهای همکاری منعطف برای رشد پایدار' : 'هياكل تعاون مرنة لنمو مستدام'}
          description={t(lang, 'pricingSubtitle')}
          align="start"
        />
        <Card variant="glass" interactive={false} className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div class={`max-w-2xl text-sm text-gray-600 dark:text-gray-300 ${isRTL ? 'text-right' : ''}`}>
            {lang === 'en'
              ? 'We scope engagements around 90-day sprint milestones with optional embedded squads for global expansion and ongoing experimentation.'
              : lang === 'fa'
              ? 'همکاری‌ها بر اساس اسپرینت‌های ۹۰ روزه و امکان حضور تیم‌های مشترک برای توسعه بین‌المللی و آزمایش مداوم طراحی می‌شود.'
              : 'نصمم الشراكات وفق مراحل من 90 يومًا مع إمكانية دمج فرق مشتركة للتوسع العالمي والتجارب المستمرة.'}
          </div>
          <div class={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Badge tone="accent">3-12 Months</Badge>
            <Button href={`/${lang}/contact`} variant="primary" className="self-start">
              {t(lang, 'ctaButton')}
            </Button>
          </div>
        </Card>
      </section>

      <section class="mt-16 space-y-10">
        <SectionHeader
          eyebrow={t(lang, 'shortTermPackages')}
          title={lang === 'en' ? 'Momentum sprints (3-4 months)' : lang === 'fa' ? 'اسپرینت‌های مومنتوم (۳ تا ۴ ماهه)' : 'سباقات الزخم (٣-٤ أشهر)'}
          align="start"
        />
        <div class="grid gap-6 md:grid-cols-2">
          {shortTermPackages.map((pkg) => {
            const content = pkg.translations[lang];
            return (
              <Card key={pkg.id} variant="glass">
                <div class="flex h-full flex-col gap-4">
                  <div class="flex items-center justify-between text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    <Badge>{content.badge}</Badge>
                    <span class="rounded-full bg-brand-500/10 px-3 py-1 text-brand-600 dark:text-accent-200">
                      {pkg.duration} {lang === 'en' ? 'months' : lang === 'fa' ? 'ماه' : 'أشهر'}
                    </span>
                  </div>
                  <div class="space-y-2">
                    <h3 class="font-display text-xl font-semibold text-gray-900 dark:text-white">{content.title}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">{content.description}</p>
                  </div>
                  <p class="text-sm font-semibold text-brand-600 dark:text-accent-200">{content.priceLabel}</p>
                  <ul class={`flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-200 ${isRTL ? 'text-right' : ''}`}>
                    {content.features.map((feature) => (
                      <li key={feature} class="flex items-start gap-2">
                        <span class="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-accent-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href={`/${lang}/contact`} variant="ghost" className={isRTL ? 'mr-auto' : 'ml-auto'}>
                    {t(lang, 'homeHeroCtaPrimary')}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section class="mt-20 space-y-10">
        <SectionHeader
          eyebrow={t(lang, 'longTermPackages')}
          title={lang === 'en' ? 'Retainers & enterprise programmes' : lang === 'fa' ? 'ریتینر و برنامه‌های انترپرایز' : 'عقود مستمرة وبرامج مؤسسية'}
          align="start"
        />
        <div class="grid gap-6 xl:grid-cols-3">
          {longTermPackages.map((pkg) => {
            const content = pkg.translations[lang];
            const isHighlight = pkg.id === 'scale-retainer';
            const isCustom = Boolean((pkg as { custom?: boolean }).custom);
            return (
              <Card
                key={pkg.id}
                variant={isHighlight ? 'solid' : 'glass'}
                className={`${isHighlight ? 'border-brand-500/40 bg-gradient-to-br from-brand-500/10 via-brand-400/10 to-accent-400/10 dark:border-brand-500/50' : ''}`}
              >
                <div class="flex h-full flex-col gap-4">
                  <div class="flex items-center justify-between text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    <Badge tone={isHighlight ? 'accent' : 'brand'}>{content.badge}</Badge>
                    <span class={`rounded-full px-3 py-1 ${isCustom ? 'bg-gray-900 text-white dark:bg-white/20 dark:text-white' : 'bg-brand-500/10 text-brand-600 dark:text-accent-200'}`}>
                      {isCustom
                        ? lang === 'en'
                          ? 'Custom'
                          : lang === 'fa'
                          ? 'سفارشی'
                          : 'مخصص'
                        : `${pkg.duration} ${lang === 'en' ? 'months' : lang === 'fa' ? 'ماه' : 'أشهر'}`}
                    </span>
                  </div>
                  <div class="space-y-2">
                    <h3 class="font-display text-2xl font-semibold text-gray-900 dark:text-white">{content.title}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">{content.description}</p>
                  </div>
                  <p class={`text-base font-semibold ${isHighlight ? 'text-brand-600 dark:text-accent-200' : 'text-brand-600 dark:text-accent-200'}`}>
                    {content.priceLabel}
                  </p>
                  <ul class={`flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-200 ${isRTL ? 'text-right' : ''}`}>
                    {content.features.map((feature) => (
                      <li key={feature} class="flex items-start gap-2">
                        <span class="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-brand-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div class={`mt-auto flex flex-wrap items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Button href={`/${lang}/contact`} variant={isHighlight ? 'primary' : 'secondary'}>
                      {isCustom ? (lang === 'en' ? 'Request proposal' : lang === 'fa' ? 'دریافت پیشنهاد اختصاصی' : 'اطلب عرضًا') : t(lang, 'ctaButton')}
                    </Button>
                    <a
                      href={`/${lang}/services`}
                      class="text-sm font-semibold text-brand-600 transition hover:text-brand-800 dark:text-accent-200 dark:hover:text-white"
                    >
                      {t(lang, 'learnMore')} →
                    </a>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section class="mt-20">
        <Card variant="glass" interactive={false} className="relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-brand-500/10 via-accent-400/10 to-brand-500/10" />
          <div class={`relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            <div class="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <h3 class="font-display text-2xl font-semibold text-gray-900 dark:text-white">
                {lang === 'en'
                  ? 'Need to align with procurement or integrate with internal analytics?'
                  : lang === 'fa'
                  ? 'نیاز به هماهنگی با تیم خرید یا اتصال به سیستم تحلیلی داخلی دارید؟'
                  : 'هل تحتاج إلى مواءمة مع المشتريات أو دمج التحليلات الداخلية؟'}
              </h3>
              <p>
                {lang === 'en'
                  ? 'Our enterprise desk will map data flows, compliance requirements, and collaboration models before kickoff.'
                  : lang === 'fa'
                  ? 'تیم انترپرایز ما پیش از شروع همکاری جریان داده، الزامات تطبیق و مدل همکاری را تدوین می‌کند.'
                  : 'فريق المؤسسات لدينا يحدد تدفقات البيانات والمتطلبات التنظيمية ونموذج التعاون قبل البدء.'}
              </p>
            </div>
            <Button href={`/${lang}/contact`} variant="primary">
              {t(lang, 'headerCTA')}
            </Button>
          </div>
        </Card>
      </section>
    </Layout>
  );
};
