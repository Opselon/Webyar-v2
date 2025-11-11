import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Layout } from '../layout';
import { Card } from '../components/Card';
import { Language, t } from '../../utils/i18n';
import caseStudiesData from '../../data/case-studies.json';

interface CaseStudiesProps {
  lang: Language;
}

export const CaseStudiesPage: FC<CaseStudiesProps> = ({ lang }) => {
  const title = t(lang, 'caseStudiesPageTitle');

  return (
    <Layout lang={lang} title={title}>
      <section class="page-intro">
        <h1>{t(lang, 'caseStudiesTitle')}</h1>
      </section>

      <section class="case-studies-list">
        <div class="grid">
          {caseStudiesData.caseStudies.map(study => (
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
