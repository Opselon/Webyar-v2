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
      <section class="hero">
        <h1>{t(lang, 'homeHeroTitle')}</h1>
        <p>{t(lang, 'homeHeroSubtitle')}</p>
        <div class="cta-group">
          <Button href={`/${lang}/contact`} text={t(lang, 'homeHeroCtaPrimary')} />
          <Button href={`/${lang}/pricing`} text={t(lang, 'homeHeroCtaSecondary')} className="secondary" />
        </div>
      </section>

      {/* Services Overview */}
      <section class="services-overview">
        <h2>{t(lang, 'homeServicesTitle')}</h2>
        <div class="grid">
          {servicesData.services.map(service => (
            <Card key={service.id}>
              <h3>{service.translations[lang].title}</h3>
              <p>{service.translations[lang].description}</p>
              <a href={`/${lang}/services#${service.id}`}>{t(lang, 'learnMore')}</a>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Teaser */}
      <section class="pricing-teaser">
        <h2>{t(lang, 'homePricingTitle')}</h2>
        <div class="grid">
          {pricingData.packages.map(pkg => (
            <Card key={pkg.id}>
              <h3>{pkg.translations[lang].title}</h3>
              <p>{pkg.translations[lang].description}</p>
              <a href={`/${lang}/pricing`}>{t(lang, 'viewPlans')}</a>
            </Card>
          ))}
        </div>
      </section>

      {/* Case Study Highlight */}
      <section class="case-study-highlight">
        <h2>{t(lang, 'homeCaseStudiesTitle')}</h2>
        <div class="grid">
          {caseStudiesData.caseStudies.slice(0, 2).map(study => (
            <Card key={study.id}>
              <h3>{study.translations[lang].title}</h3>
              <a href={`/${lang}/case-studies/${study.slug}`}>{t(lang, 'viewCaseStudy')}</a>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
};
