import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Layout } from '../layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Language, languages, t } from '../../utils/i18n';
import postsData from '../../data/posts.json';

interface BlogPostProps {
  lang: Language;
  slug: string;
}

export const BlogPostPage: FC<BlogPostProps> = ({ lang, slug }) => {
  const post = postsData.posts.find((p) => p.slug === slug);

  if (!post) {
    return <p>Post not found</p>;
  }

  const content = post.translations[lang];
  const isRTL = languages[lang].dir === 'rtl';
  const related = [...postsData.posts]
    .filter((p) => p.slug !== slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  return (
    <Layout
      lang={lang}
      title={content.title}
      description={content.excerpt}
      canonical={`https://seo.webyar.cloud/${lang}/blog/${slug}`}
      active="blog"
    >
      <article class={`mx-auto max-w-5xl space-y-12 ${isRTL ? 'text-right' : 'text-left'}`}>
        <header class="space-y-6">
          <div class="space-y-3">
            <Badge tone="brand">{post.category}</Badge>
            <h1 class={`font-display text-4xl font-bold text-gray-900 dark:text-white ${isRTL ? 'leading-relaxed' : ''}`}>{content.title}</h1>
            <p class="text-sm text-gray-600 dark:text-gray-300">{content.excerpt}</p>
          </div>
          <div class={`flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span>{post.author}</span>
            <span class="h-1 w-1 rounded-full bg-gray-300" />
            <span>{post.date}</span>
            <span class="rounded-full bg-brand-500/10 px-3 py-1 text-brand-600 dark:text-accent-200">{post.readTime} min</span>
          </div>
        </header>

        <div class="overflow-hidden rounded-[32px]">
          <img src={post.coverImage} alt={content.title} class="h-96 w-full object-cover" loading="lazy" />
        </div>

        <div class="grid gap-10 lg:grid-cols-[2.2fr_1fr]">
          <Card
            variant="glass"
            interactive={false}
            contentClassName="prose prose-slate max-w-none leading-relaxed dark:prose-invert prose-headings:font-display prose-headings:text-gray-900 dark:prose-headings:text-white"
          >
            <div dangerouslySetInnerHTML={{ __html: content.content }} />
          </Card>
          <aside class="space-y-6">
            <Card variant="glass" interactive={false} className="space-y-4">
              <h2 class="font-display text-lg font-semibold text-gray-900 dark:text-white">
                {lang === 'en' ? 'Key takeaways' : lang === 'fa' ? 'نکات کلیدی' : 'أهم النقاط'}
              </h2>
              <ul class={`flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300 ${isRTL ? 'text-right' : ''}`}>
                <li>{lang === 'en' ? 'Align technical fixes with product release cadence.' : lang === 'fa' ? 'بهینه‌سازی‌های تکنیکال را با ریتم انتشار محصول هماهنگ کنید.' : 'وافق التحسينات التقنية مع وتيرة إطلاق المنتج.'}</li>
                <li>{lang === 'en' ? 'Instrument dashboards to show business impact, not just rankings.' : lang === 'fa' ? 'داشبوردها را بر تاثیر کسب‌وکاری متمرکز کنید نه صرفاً رتبه‌ها.' : 'اجعل لوحات التحكم تبرز الأثر التجاري وليس الترتيب فقط.'}</li>
                <li>{lang === 'en' ? 'Run experimentation pipelines alongside optimisation work.' : lang === 'fa' ? 'پایپلاین آزمایش را در کنار بهینه‌سازی فعال نگه دارید.' : 'شغّل مسارات التجربة بالتوازي مع أعمال التحسين.'}</li>
              </ul>
            </Card>
            <Card variant="glass" interactive={false} className="space-y-4">
              <h2 class="font-display text-lg font-semibold text-gray-900 dark:text-white">
                {lang === 'en' ? 'Related articles' : lang === 'fa' ? 'مقالات مرتبط' : 'مقالات ذات صلة'}
              </h2>
              <div class="space-y-3">
                {related.map((item) => (
                  <a
                    key={item.id}
                    href={`/${lang}/blog/${item.slug}`}
                    class="block rounded-2xl border border-white/20 bg-white/60 p-4 text-sm transition hover:border-brand-500/40 hover:bg-brand-500/5 dark:border-white/10 dark:bg-surface-muted/80"
                  >
                    <p class="font-semibold text-gray-900 dark:text-white">{item.translations[lang].title}</p>
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {item.readTime} min · {item.date}
                    </p>
                  </a>
                ))}
              </div>
            </Card>
          </aside>
        </div>

        <div class={`flex items-center justify-between border-t border-white/20 pt-6 text-sm text-gray-600 dark:text-gray-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button href={`/${lang}/blog`} variant="ghost">
            {lang === 'en' ? 'Back to insights' : lang === 'fa' ? 'بازگشت به بلاگ' : 'العودة إلى المدونة'}
          </Button>
          <Button href={`/${lang}/contact`} variant="primary">
            {t(lang, 'ctaButton')}
          </Button>
        </div>
      </article>
    </Layout>
  );
};
