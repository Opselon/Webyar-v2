import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Layout } from '../layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Language, languages, t } from '../../utils/i18n';
import caseStudiesData from '../../data/case-studies.json';

interface CaseStudyDetailProps {
  lang: Language;
  slug: string;
}

export const CaseStudyDetailPage: FC<CaseStudyDetailProps> = ({ lang, slug }) => {
  const study = caseStudiesData.caseStudies.find((s) => s.slug === slug);

  if (!study) {
    return <p>Case study not found</p>;
  }

  const title = study.translations[lang].title;
  const content = study.translations[lang];
  const isRTL = languages[lang].dir === 'rtl';

  return (
    <Layout lang={lang} title={title} active="caseStudies">
      <article class="space-y-12">
        <section class="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-white via-brand-50 to-accent-50 shadow-soft dark:from-surface-muted dark:via-surface-muted/70 dark:to-midnight">
          <div class="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div class={`space-y-6 p-8 ${isRTL ? 'text-right' : ''}`}>
              <Badge tone="brand">{study.industry}</Badge>
              <h1 class="font-display text-4xl font-bold text-gray-900 dark:text-white">{title}</h1>
              <p class="text-sm text-gray-600 dark:text-gray-300">{content.solution}</p>
              <div class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                <span class="rounded-full bg-brand-500/10 px-3 py-1 text-brand-600 dark:text-accent-200">{study.type}</span>
                <span class="rounded-full bg-white/60 px-3 py-1 shadow-inner dark:bg-white/10">
                  {study.duration} {lang === 'en' ? 'months' : lang === 'fa' ? 'ماه' : 'أشهر'}
                </span>
                <span class="rounded-full bg-accent-500/10 px-3 py-1 text-accent-600 dark:text-accent-200">{study.kpi}</span>
              </div>
              <div class={`flex flex-wrap items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Button href={`/${lang}/contact`} variant="primary">
                  {lang === 'en' ? 'Start a similar project' : lang === 'fa' ? 'شروع پروژه مشابه' : 'ابدأ مشروعًا مشابهًا'}
                </Button>
                <Button href={`/${lang}/case-studies`} variant="ghost" className={isRTL ? 'mr-auto' : 'ml-auto'}>
                  {lang === 'en' ? 'Back to all case studies' : lang === 'fa' ? 'بازگشت به همه نمونه‌کارها' : 'العودة إلى جميع الدراسات'}
                </Button>
              </div>
            </div>
            <div class="relative h-full min-h-[320px]">
              <img
                src={study.heroImage}
                alt={title}
                class="h-full w-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-tr from-brand-500/30 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        <section class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card variant="glass" interactive={false} className="space-y-4">
            <h2 class="font-display text-2xl font-semibold text-gray-900 dark:text-white">{t(lang, 'caseStudyProblem')}</h2>
            <p class="text-sm leading-7 text-gray-600 dark:text-gray-300">{content.problem}</p>
            <div class="mt-6">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{t(lang, 'caseStudySolution')}</h3>
              <p class="mt-2 text-sm leading-7 text-gray-700 dark:text-gray-200">{content.solution}</p>
            </div>
          </Card>
          <Card variant="glass" interactive={false} className="space-y-4">
            <h2 class="font-display text-2xl font-semibold text-gray-900 dark:text-white">{t(lang, 'caseStudyResults')}</h2>
            <ul class={`grid gap-4 ${isRTL ? 'text-right' : ''}`}>
              {content.results.map((result) => (
                <li key={result.metric} class="rounded-2xl border border-brand-500/20 bg-white/70 px-4 py-3 shadow-inner dark:border-white/10 dark:bg-surface-muted/80">
                  <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{result.metric}</p>
                  <p class="text-xl font-semibold text-brand-600 dark:text-accent-200">{result.value}</p>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section class="grid gap-6 lg:grid-cols-3">
          {[
            lang === 'en'
              ? { title: 'Discovery & baselines', detail: 'Log analysis, data mapping, and instrumentation of analytics & BI.' }
              : lang === 'fa'
              ? { title: 'دیسکاوری و خط پایه', detail: 'تحلیل لاگ، نقشه داده و پیاده‌سازی ابزارهای آنالیز و BI.' }
              : { title: 'الاستكشاف وتحديد الأساسيات', detail: 'تحليل السجلات ورسم البيانات وتركيب أدوات التحليلات وBI.' },
            lang === 'en'
              ? { title: 'Execution sprints', detail: 'Technical fixes, content production, PR activation, and launch plans.' }
              : lang === 'fa'
              ? { title: 'اسپرینت‌های اجرا', detail: 'رفع موانع تکنیکال، تولید محتوا، کمپین PR و برنامه لانچ.' }
              : { title: 'أسابيع التنفيذ', detail: 'معالجة تقنية، إنشاء محتوى، حملات PR وخطط الإطلاق.' },
            lang === 'en'
              ? { title: 'Measurement & enablement', detail: 'Live dashboards, workshops, and handover of optimisation playbooks.' }
              : lang === 'fa'
              ? { title: 'اندازه‌گیری و توانمندسازی', detail: 'داشبوردهای زنده، ورکشاپ و تحویل Playbook های بهینه‌سازی.' }
              : { title: 'القياس والتمكين', detail: 'لوحات تحكم لحظية، ورش عمل، وتسليم أدلة التحسين.' },
          ].map((phase) => (
            <Card key={phase.title} variant="glass" interactive={false} className="space-y-3">
              <h3 class="font-display text-lg font-semibold text-gray-900 dark:text-white">{phase.title}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">{phase.detail}</p>
            </Card>
          ))}
        </section>
      </article>
    </Layout>
  );
};
