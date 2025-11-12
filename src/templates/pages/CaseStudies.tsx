import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Layout } from '../layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { SectionHeader } from '../components/SectionHeader';
import { Badge } from '../components/Badge';
import { Language, languages, t } from '../../utils/i18n';
import caseStudiesData from '../../data/case-studies.json';

interface CaseStudiesProps {
  lang: Language;
}

const filtersScript = `
  window.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('[data-case-filter]');
    if (!container) return;
    const buttons = Array.from(container.querySelectorAll('[data-filter-button]'));
    const cards = Array.from(document.querySelectorAll('[data-case-card]'));

    const setActive = (group, value) => {
      group.forEach((btn) => {
        if (btn.dataset.filterValue === value) {
          btn.classList.add('bg-brand-500/10', 'text-brand-700');
        } else {
          btn.classList.remove('bg-brand-500/10', 'text-brand-700');
        }
      });
    };

    const updateCards = () => {
      const activeIndustry = container.querySelector('[data-filter-button][data-filter-group="industry"].bg-brand-500/10')?.dataset.filterValue || 'all';
      const activeType = container.querySelector('[data-filter-button][data-filter-group="type"].bg-brand-500/10')?.dataset.filterValue || 'all';
      cards.forEach((card) => {
        const industry = card.dataset.industry;
        const type = card.dataset.type;
        const matchIndustry = activeIndustry === 'all' || industry === activeIndustry;
        const matchType = activeType === 'all' || type === activeType;
        if (matchIndustry && matchType) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const group = button.dataset.filterGroup;
        const value = button.dataset.filterValue;
        if (!group || !value) return;
        const groupButtons = buttons.filter((btn) => btn.dataset.filterGroup === group);
        setActive(groupButtons, value);
        updateCards();
      });
    });

    ['industry', 'type'].forEach((group) => {
      const groupButtons = buttons.filter((btn) => btn.dataset.filterGroup === group);
      if (groupButtons.length) {
        setActive(groupButtons, 'all');
      }
    });

    updateCards();
  });
`;

export const CaseStudiesPage: FC<CaseStudiesProps> = ({ lang }) => {
  const title = t(lang, 'caseStudiesPageTitle');
  const isRTL = languages[lang].dir === 'rtl';
  const caseStudies = caseStudiesData.caseStudies;
  const industries = Array.from(new Set(caseStudies.map((study) => study.industry)));
  const types = Array.from(new Set(caseStudies.map((study) => study.type)));

  return (
    <Layout lang={lang} title={title} active="caseStudies">
      <section class="space-y-10">
        <SectionHeader
          eyebrow={t(lang, 'caseStudiesTitle')}
          title={lang === 'en' ? 'Evidence across verticals & geographies' : lang === 'fa' ? 'نمونه‌کارها در صنایع و بازارهای مختلف' : 'نتائج في قطاعات وأسواق متعددة'}
          description={lang === 'en' ? 'Explore how we orchestrate technical, content, and international SEO for SaaS, ecommerce, media, and fintech brands.' : lang === 'fa' ? 'ببینید چگونه استراتژی تکنیکال، محتوا و سئوی بین‌المللی را برای برندهای SaaS، فروشگاهی، رسانه‌ای و فین‌تک اجرا می‌کنیم.' : 'اكتشف كيف ندير السيو التقني والمحتوى والدولي لعلامات SaaS والتجارة والإعلام والفينتك.'}
          align="start"
        />
      </section>

      <section class="mt-12 space-y-8" data-case-filter>
        <div class={`flex flex-wrap items-center gap-4 ${isRTL ? 'justify-end' : ''}`}>
          <div class="space-y-2">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{t(lang, 'caseStudiesFiltersTitle')}</p>
            <div class="flex flex-wrap gap-2">
              <button
                type="button"
                class="rounded-full border border-brand-200/50 px-4 py-2 text-xs font-semibold text-gray-600 dark:border-white/10 dark:text-gray-200"
                data-filter-button
                data-filter-group="industry"
                data-filter-value="all"
              >
                {lang === 'en' ? 'All industries' : lang === 'fa' ? 'همه صنایع' : 'جميع القطاعات'}
              </button>
              {industries.map((industry) => (
                <button
                  key={industry}
                  type="button"
                  class="rounded-full border border-brand-200/50 px-4 py-2 text-xs font-semibold text-gray-600 dark:border-white/10 dark:text-gray-200"
                  data-filter-button
                  data-filter-group="industry"
                  data-filter-value={industry}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {lang === 'en' ? 'Project type' : lang === 'fa' ? 'نوع پروژه' : 'نوع المشروع'}
            </p>
            <div class="flex flex-wrap gap-2">
              <button
                type="button"
                class="rounded-full border border-brand-200/50 px-4 py-2 text-xs font-semibold text-gray-600 dark:border-white/10 dark:text-gray-200"
                data-filter-button
                data-filter-group="type"
                data-filter-value="all"
              >
                {lang === 'en' ? 'All types' : lang === 'fa' ? 'همه انواع' : 'كل الأنواع'}
              </button>
              {types.map((type) => (
                <button
                  key={type}
                  type="button"
                  class="rounded-full border border-brand-200/50 px-4 py-2 text-xs font-semibold text-gray-600 dark:border-white/10 dark:text-gray-200"
                  data-filter-button
                  data-filter-group="type"
                  data-filter-value={type}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section class="mt-10">
        <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {caseStudies.map((study) => {
            const content = study.translations[lang];
            return (
              <Card
                key={study.id}
                variant="glass"
                className="h-full"
                data-case-card
                data-industry={study.industry}
                data-type={study.type}
              >
                <div class="flex h-full flex-col gap-4">
                  <div class="relative overflow-hidden rounded-2xl">
                    <img
                      src={study.heroImage}
                      alt={content.title}
                      class="h-40 w-full object-cover"
                      loading="lazy"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div class="absolute bottom-3 inset-x-4 flex items-center justify-between text-xs text-white">
                      <span class="rounded-full bg-white/20 px-3 py-1 font-semibold uppercase tracking-wide">{study.client}</span>
                      <span class="text-white/70">{study.duration} {lang === 'en' ? 'months' : lang === 'fa' ? 'ماه' : 'أشهر'}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    <Badge tone="neutral">{study.industry}</Badge>
                    <Badge tone="brand">{study.type}</Badge>
                    <span class="rounded-full bg-brand-500/10 px-3 py-1 text-brand-600 dark:text-accent-200">{study.kpi}</span>
                  </div>
                  <h3 class="font-display text-lg font-semibold text-gray-900 dark:text-white">{content.title}</h3>
                  <div class="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                    <div>
                      <h4 class="font-semibold text-gray-900 dark:text-white">{t(lang, 'caseStudyProblem')}</h4>
                      <p class="leading-7">{content.problem}</p>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900 dark:text-white">{t(lang, 'caseStudySolution')}</h4>
                      <p class="leading-7">{content.solution}</p>
                    </div>
                  </div>
                  <div class="mt-auto">
                    <Button href={`/${lang}/case-studies/${study.slug}`} variant="secondary" className={isRTL ? 'mr-auto' : 'ml-auto'}>
                      {t(lang, 'viewCaseStudy')}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        <script dangerouslySetInnerHTML={{ __html: filtersScript }} />
      </section>
    </Layout>
  );
};
