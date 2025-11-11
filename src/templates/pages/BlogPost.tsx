import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Layout } from '../layout';
import { Language, t } from '../../utils/i18n';
import postsData from '../../data/posts.json';

interface BlogPostProps {
  lang: Language;
  slug: string;
}

export const BlogPostPage: FC<BlogPostProps> = ({ lang, slug }) => {
  const post = postsData.posts.find(p => p.slug === slug);

  if (!post) {
    // In a real application, you'd handle this more gracefully
    return <p>Post not found</p>;
  }

  const title = post.translations[lang].title;

  return (
    <Layout lang={lang} title={title}>
      <article class="blog-post">
        <h1>{title}</h1>
        <div class="post-meta">
          <span>{post.author}</span> | <span>{post.date}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.translations[lang].content }} />
      </article>
    </Layout>
  );
};
