import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Layout } from '../layout';
import { Card } from '../components/Card';
import { Language, t } from '../../utils/i18n';
import pricingData from '../../data/pricing.json';

interface PricingProps {
  lang: Language;
}

export const PricingPage: FC<PricingProps> = ({ lang }) => {
  const title = t(lang, 'pricingPageTitle');
  const shortTermPackages = pricingData.packages.filter(p => p.type === 'short-term');
  const longTermPackages = pricingData.packages.filter(p => p.type === 'long-term');

  return (
    <Layout lang={lang} title={title}>
      <section class="page-intro">
        <h1>{t(lang, 'pricingTitle')}</h1>
        <p>{t(lang, 'pricingSubtitle')}</p>
      </section>

      <section class="pricing-section">
        <h2>{t(lang, 'shortTermPackages')}</h2>
        <div class="grid">
          {shortTermPackages.map(pkg => (
            <Card key={pkg.id}>
              <h3>{pkg.translations[lang].title}</h3>
              <p>{pkg.translations[lang].description}</p>
              <ul>
                {pkg.translations[lang].features.map(feature => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section class="pricing-section">
        <h2>{t(lang, 'longTermPackages')}</h2>
        <div class="grid">
          {longTermPackages.map(pkg => (
            <Card key={pkg.id}>
              <h3>{pkg.translations[lang].title}</h3>
              <p>{pkg.translations[lang].description}</p>
              <ul>
                {pkg.translations[lang].features.map(feature => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
};
