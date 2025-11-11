import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Layout } from '../layout';
import { Card } from '../components/Card';
import { Language, t } from '../../utils/i18n';
import postsData from '../../data/posts.json';

interface BlogIndexProps {
  lang: Language;
}

export const BlogIndexPage: FC<BlogIndexProps> = ({ lang }) => {
  const title = t(lang, 'blogPageTitle');

  return (
    <Layout lang={lang} title={title}>
      <section class="page-intro">
        <h1>{t(lang, 'blogTitle')}</h1>
      </section>

      <section class="blog-list">
        <div class="grid">
          {postsData.posts.map(post => (
            <Card key={post.id}>
              <h3>{post.translations[lang].title}</h3>
              <p>{post.translations[lang].excerpt}</p>
              <a href={`/${lang}/blog/${post.slug}`}>{t(lang, 'readMore')}</a>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
};
