import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Layout } from '../layout';
import { Language, t } from '../../utils/i18n';
import caseStudiesData from '../../data/case-studies.json';

interface CaseStudyDetailProps {
  lang: Language;
  slug: string;
}

export const CaseStudyDetailPage: FC<CaseStudyDetailProps> = ({ lang, slug }) => {
  const study = caseStudiesData.caseStudies.find(s => s.slug === slug);

  if (!study) {
    return <p>Case study not found</p>;
  }

  const title = study.translations[lang].title;

  return (
    <Layout lang={lang} title={title}>
      <article class="case-study-detail">
        <h1>{title}</h1>
        <div class="problem">
          <h2>{t(lang, 'caseStudyProblem')}</h2>
          <p>{study.translations[lang].problem}</p>
        </div>
        <div class="solution">
          <h2>{t(lang, 'caseStudySolution')}</h2>
          <p>{study.translations[lang].solution}</p>
        </div>
        <div class="results">
          <h2>{t(lang, 'caseStudyResults')}</h2>
          <ul>
            {study.translations[lang].results.map(result => (
              <li key={result.metric}><strong>{result.metric}:</strong> {result.value}</li>
            ))}
          </ul>
        </div>
      </article>
    </Layout>
  );
};
