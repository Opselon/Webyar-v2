import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Layout } from '../layout';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { Button } from '../components/Button';
import { Language, languages, t } from '../../utils/i18n';
import postsData from '../../data/posts.json';

interface BlogIndexProps {
  lang: Language;
}

const filterScript = `
  window.addEventListener('DOMContentLoaded', () => {
    const buttons = Array.from(document.querySelectorAll('[data-blog-filter]'));
    const cards = Array.from(document.querySelectorAll('[data-blog-card]'));
    if (!buttons.length) return;

    const setActive = (value) => {
      buttons.forEach((btn) => {
        if (btn.dataset.blogFilter === value) {
          btn.classList.add('bg-brand-500/10', 'text-brand-700');
        } else {
          btn.classList.remove('bg-brand-500/10', 'text-brand-700');
        }
      });
    };

    const update = (value) => {
      cards.forEach((card) => {
        const category = card.dataset.blogCategory;
        if (value === 'all' || category === value) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const value = button.dataset.blogFilter;
        if (!value) return;
        setActive(value);
        update(value);
      });
    });

    setActive('all');
    update('all');
  });
`;

export const BlogIndexPage: FC<BlogIndexProps> = ({ lang }) => {
  const title = t(lang, 'blogPageTitle');
  const posts = postsData.posts;
  const isRTL = languages[lang].dir === 'rtl';
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <Layout lang={lang} title={title} active="blog">
      <section class="space-y-10">
        <SectionHeader
          eyebrow={t(lang, 'blogTitle')}
          title={lang === 'en' ? 'Insights on technical SEO, international growth, and analytics' : lang === 'fa' ? 'بینش‌هایی درباره سئوی تکنیکال، رشد بین‌المللی و آنالیتیکس' : 'رؤى حول السيو التقني والنمو الدولي والتحليلات'}
          description={lang === 'en' ? 'Deep dives, playbooks, and executive perspectives from the Quantum SEO Labs team.' : lang === 'fa' ? 'تحلیل‌های عمیق، پلی‌بوک‌ها و دیدگاه‌های مدیریتی از تیم Quantum SEO Labs.' : 'تحليلات معمقة وأدلة عملية ومنظور تنفيذي من فريق Quantum SEO Labs.'}
          align="start"
        />
      </section>

      <section class={`mt-12 flex flex-wrap items-center gap-3 ${isRTL ? 'justify-end' : ''}`}>
        <button
          type="button"
          class="rounded-full border border-brand-200/60 px-4 py-2 text-xs font-semibold text-gray-600 dark:border-white/10 dark:text-gray-200"
          data-blog-filter="all"
        >
          {lang === 'en' ? 'All topics' : lang === 'fa' ? 'همه موضوعات' : 'جميع المواضيع'}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            class="rounded-full border border-brand-200/60 px-4 py-2 text-xs font-semibold text-gray-600 dark:border-white/10 dark:text-gray-200"
            data-blog-filter={category}
          >
            {category}
          </button>
        ))}
      </section>

      <section class="mt-12">
        <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => {
            const content = post.translations[lang];
            return (
              <Card key={post.id} variant="glass" className="h-full" data-blog-card data-blog-category={post.category}>
                <div class="flex h-full flex-col gap-4">
                  <div class="relative overflow-hidden rounded-2xl">
                    <img src={post.coverImage} alt={content.title} class="h-40 w-full object-cover" loading="lazy" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div class="absolute bottom-3 inset-x-4 flex items-center justify-between text-xs text-white">
                      <span class="rounded-full bg-white/20 px-3 py-1 font-semibold uppercase tracking-wide">{post.category}</span>
                      <span class="text-white/70">{post.readTime} min</span>
                    </div>
                  </div>
                  <h3 class="font-display text-lg font-semibold text-gray-900 dark:text-white">{content.title}</h3>
                  <p class="text-sm leading-7 text-gray-600 dark:text-gray-300">{content.excerpt}</p>
                  <div class="mt-auto flex items-center justify-between text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                  <Button href={`/${lang}/blog/${post.slug}`} variant="secondary" className={isRTL ? 'mr-auto' : 'ml-auto'}>
                    {t(lang, 'readMore')}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
        <script dangerouslySetInnerHTML={{ __html: filterScript }} />
      </section>
    </Layout>
  );
};
