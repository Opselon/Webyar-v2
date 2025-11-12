import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Layout } from '../layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Language, languages, t } from '../../utils/i18n';

interface ContactProps {
  lang: Language;
}

export const ContactPage: FC<ContactProps> = ({ lang }) => {
  const title = t(lang, 'contactPageTitle');
  const isRTL = languages[lang].dir === 'rtl';

  return (
    <Layout lang={lang} title={title} active="contact">
      <section class="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <Card variant="glass" interactive={false} className="space-y-6">
          <div class="space-y-3">
            <Badge tone="accent">{t(lang, 'contactTitle')}</Badge>
            <h1 class="font-display text-3xl font-bold text-gray-900 dark:text-white">{t(lang, 'contactSubtitle')}</h1>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {lang === 'en'
                ? 'Share your markets, tech stack, and growth ambitions. Our enterprise desk will follow up within 48 hours.'
                : lang === 'fa'
                ? 'بازارهای هدف، پشته فنی و اهداف رشد خود را توضیح دهید. تیم ما ظرف ۴۸ ساعت پاسخ می‌دهد.'
                : 'اخبرنا عن الأسواق المستهدفة والتقنيات وأهداف النمو. سيعاود فريقنا التواصل خلال ٤٨ ساعة.'}
            </p>
          </div>
          <form class={`grid gap-6 ${isRTL ? 'text-right' : ''}`}>
            <div class={`grid gap-4 md:grid-cols-2 ${isRTL ? 'md:text-right' : ''}`}>
              <label class="flex flex-col gap-2 text-sm">
                <span class="font-semibold text-gray-700 dark:text-gray-200">{t(lang, 'formName')}</span>
                <input
                  type="text"
                  name="name"
                  required
                  class="rounded-2xl border border-white/20 bg-white/80 px-4 py-3 text-sm shadow-inner focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-surface-muted/80"
                />
              </label>
              <label class="flex flex-col gap-2 text-sm">
                <span class="font-semibold text-gray-700 dark:text-gray-200">{t(lang, 'formEmail')}</span>
                <input
                  type="email"
                  name="email"
                  required
                  class="rounded-2xl border border-white/20 bg-white/80 px-4 py-3 text-sm shadow-inner focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-surface-muted/80"
                />
              </label>
            </div>
            <div class={`grid gap-4 md:grid-cols-2 ${isRTL ? 'md:text-right' : ''}`}>
              <label class="flex flex-col gap-2 text-sm">
                <span class="font-semibold text-gray-700 dark:text-gray-200">{t(lang, 'formWebsite')}</span>
                <input
                  type="url"
                  name="website"
                  placeholder="https://"
                  class="rounded-2xl border border-white/20 bg-white/80 px-4 py-3 text-sm shadow-inner focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-surface-muted/80"
                />
              </label>
              <label class="flex flex-col gap-2 text-sm">
                <span class="font-semibold text-gray-700 dark:text-gray-200">
                  {lang === 'en' ? 'Preferred language' : lang === 'fa' ? 'زبان ترجیحی' : 'اللغة المفضلة'}
                </span>
                <select
                  name="language"
                  class="rounded-2xl border border-white/20 bg-white/80 px-4 py-3 text-sm shadow-inner focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-surface-muted/80"
                >
                  <option value="fa">فارسی</option>
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </label>
            </div>
            <div class={`grid gap-4 md:grid-cols-2 ${isRTL ? 'md:text-right' : ''}`}>
              <label class="flex flex-col gap-2 text-sm">
                <span class="font-semibold text-gray-700 dark:text-gray-200">
                  {lang === 'en' ? 'Company size' : lang === 'fa' ? 'اندازه سازمان' : 'حجم الشركة'}
                </span>
                <select
                  name="companySize"
                  class="rounded-2xl border border-white/20 bg-white/80 px-4 py-3 text-sm shadow-inner focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-surface-muted/80"
                >
                  <option value="growth">50-200</option>
                  <option value="scale">200-1000</option>
                  <option value="enterprise">1000+</option>
                </select>
              </label>
              <label class="flex flex-col gap-2 text-sm">
                <span class="font-semibold text-gray-700 dark:text-gray-200">
                  {lang === 'en' ? 'Engagement model' : lang === 'fa' ? 'نوع همکاری' : 'نموذج التعاون'}
                </span>
                <select
                  name="engagement"
                  class="rounded-2xl border border-white/20 bg-white/80 px-4 py-3 text-sm shadow-inner focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-surface-muted/80"
                >
                  <option value="audit">Audit / Sprint (3-4 months)</option>
                  <option value="retainer">Growth Retainer (6 months)</option>
                  <option value="scale">Scale Retainer (12 months)</option>
                  <option value="custom">Enterprise Custom</option>
                </select>
              </label>
            </div>
            <label class="flex flex-col gap-2 text-sm">
              <span class="font-semibold text-gray-700 dark:text-gray-200">{t(lang, 'formMessage')}</span>
              <textarea
                name="message"
                rows={5}
                required
                class="rounded-2xl border border-white/20 bg-white/80 px-4 py-3 text-sm shadow-inner focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-surface-muted/80"
              ></textarea>
            </label>
            <div class={`flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <p>
                {lang === 'en'
                  ? 'We respond within two business days. NDAs available on request.'
                  : lang === 'fa'
                  ? 'در کمتر از دو روز کاری پاسخ می‌دهیم. NDA در صورت نیاز امضا می‌شود.'
                  : 'نرد خلال يومي عمل. يمكن توقيع اتفاقية عدم إفشاء عند الطلب.'}
              </p>
              <Button type="submit" variant="primary">
                {t(lang, 'formSubmit')}
              </Button>
            </div>
            <div role="status" aria-live="polite" class="text-xs text-accent-500"></div>
          </form>
        </Card>
        <Card variant="solid" interactive={false} className="space-y-6">
          <h2 class="font-display text-2xl font-semibold text-gray-900 dark:text-white">
            {lang === 'en' ? 'What happens next?' : lang === 'fa' ? 'گام بعد چیست؟' : 'ما الخطوات التالية؟'}
          </h2>
          <ol class={`space-y-4 text-sm text-gray-600 dark:text-gray-300 ${isRTL ? 'text-right' : ''}`}>
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-500/15 font-semibold text-brand-600 dark:text-accent-200">1</span>
              <span>
                {lang === 'en'
                  ? 'Discovery call to align on objectives, stakeholders, and timelines.'
                  : lang === 'fa'
                  ? 'تماس Discovery برای همسویی اهداف، ذی‌نفعان و زمان‌بندی.'
                  : 'جلسة استكشافية لمواءمة الأهداف وأصحاب المصلحة والجداول الزمنية.'}
              </span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-500/15 font-semibold text-brand-600 dark:text-accent-200">2</span>
              <span>
                {lang === 'en'
                  ? 'We deliver a tailored roadmap with technical, content, and market workstreams.'
                  : lang === 'fa'
                  ? 'نقشه راهی اختصاصی شامل جریان‌های تکنیکال، محتوا و بازار ارائه می‌دهیم.'
                  : 'نقدم خارطة طريق مخصصة تشمل المسارات التقنية والمحتوى والسوق.'}
              </span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-500/15 font-semibold text-brand-600 dark:text-accent-200">3</span>
              <span>
                {lang === 'en'
                  ? 'Kickoff with shared dashboards, comms channels, and experiment backlog.'
                  : lang === 'fa'
                  ? 'شروع همکاری با داشبورد مشترک، کانال‌های ارتباطی و بک‌لاگ تست.'
                  : 'الانطلاق مع لوحات تحكم مشتركة وقنوات تواصل وقائمة اختبارات.'}
              </span>
            </li>
          </ol>
          <div class="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <h3 class="font-semibold text-gray-900 dark:text-white">
              {lang === 'en' ? 'Enterprise support desk' : lang === 'fa' ? 'میز پشتیبانی سازمانی' : 'مكتب دعم المؤسسات'}
            </h3>
            <p>
              {lang === 'en'
                ? 'Need to onboard legal, procurement, or security? We provide compliance packs, DPAs, and SOC II documentation.'
                : lang === 'fa'
                ? 'برای تطبیق حقوقی، خرید یا امنیت نیاز دارید؟ بسته‌های کامپلاینس، DPA و مستندات SOC II ارائه می‌کنیم.'
                : 'هل تحتاج إلى إشراك فرق القانون أو المشتريات أو الأمن؟ نوفر حزم الامتثال واتفاقيات حماية البيانات ووثائق SOC II.'}
            </p>
            <a href="mailto:enterprise@quantumseo.agency" class="font-semibold text-brand-600 transition hover:text-brand-800 dark:text-accent-200 dark:hover:text-white">
              enterprise@quantumseo.agency
            </a>
          </div>
        </Card>
      </section>
    </Layout>
  );
};
