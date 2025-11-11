import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Layout } from '../layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Language, t } from '../../utils/i18n';
import servicesData from '../../data/services.json';
import pricingData from '../../data/pricing.json';
import caseStudiesData from '../../data/case-studies.json';

interface HomeProps {
  lang: Language;
}

export const HomePage: FC<HomeProps> = ({ lang }) => {
  const title = t(lang, 'homepageTitle');

  return (
    <Layout lang={lang} title={title}>
      {/* Hero Section */}
      <section class="hero text-center py-20">
        <h1 class="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{t(lang, 'homeHeroTitle')}</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">{t(lang, 'homeHeroSubtitle')}</p>
        <div class="cta-group flex justify-center space-x-4">
          <Button href={`/${lang}/contact`} text={t(lang, 'homeHeroCtaPrimary')} />
          <Button href={`/${lang}/pricing`} text={t(lang, 'homeHeroCtaSecondary')} className="secondary" />
        </div>
      </section>

      {/* Services Overview */}
      <section class="services-overview py-16">
        <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">{t(lang, 'homeServicesTitle')}</h2>
        <div class="grid md:grid-cols-3 gap-8">
          {servicesData.services.map(service => (
            <Card key={service.id}>
              <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">{service.translations[lang].title}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{service.translations[lang].description}</p>
              <a href={`/${lang}/services#${service.id}`} class="text-blue-600 dark:text-blue-400 hover:underline">{t(lang, 'learnMore')}</a>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Teaser */}
      <section class="pricing-teaser bg-gray-100 dark:bg-gray-800 py-16">
        <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">{t(lang, 'homePricingTitle')}</h2>
        <div class="grid md:grid-cols-3 gap-8">
          {pricingData.packages.map(pkg => (
            <Card key={pkg.id}>
              <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">{pkg.translations[lang].title}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{pkg.translations[lang].description}</p>
              <a href={`/${lang}/pricing`} class="text-blue-600 dark:text-blue-400 hover:underline">{t(lang, 'viewPlans')}</a>
            </Card>
          ))}
        </div>
      </section>

      {/* Case Study Highlight */}
      <section class="case-study-highlight py-16">
        <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">{t(lang, 'homeCaseStudiesTitle')}</h2>
        <div class="grid md:grid-cols-2 gap-8">
          {caseStudiesData.caseStudies.slice(0, 2).map(study => (
            <Card key={study.id}>
              <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">{study.translations[lang].title}</h3>
              <a href={`/${lang}/case-studies/${study.slug}`} class="text-blue-600 dark:text-blue-400 hover:underline">{t(lang, 'viewCaseStudy')}</a>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
};
