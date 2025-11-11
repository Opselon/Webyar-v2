import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Layout } from '../layout';
import { Card } from '../components/Card';
import { Language, t } from '../../utils/i18n';
import servicesData from '../../data/services.json';

interface ServicesProps {
  lang: Language;
}

export const ServicesPage: FC<ServicesProps> = ({ lang }) => {
  const title = t(lang, 'servicesPageTitle');

  return (
    <Layout lang={lang} title={title}>
      <section class="page-intro">
        <h1>{t(lang, 'servicesTitle')}</h1>
        <p>{t(lang, 'servicesSubtitle')}</p>
      </section>

      <section class="services-list">
        {servicesData.services.map(service => (
          <Card key={service.id} className="service-card">
            <h2>{service.translations[lang].title}</h2>
            <p>{service.translations[lang].description}</p>
            <ul>
              {service.translations[lang].details.map(detail => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </Card>
        ))}
      </section>
    </Layout>
  );
};
