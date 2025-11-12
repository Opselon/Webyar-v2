import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Layout } from '../layout';
import { SectionHeader } from '../components/SectionHeader';
import { Accordion } from '../components/Accordion';
import { Card } from '../components/Card';
import { Language, languages } from '../../utils/i18n';

interface FAQProps {
  lang: Language;
}

const faqContent = {
  fa: {
    title: 'سوالات متداول',
    intro: 'پرسش‌هایی که مشتریان سازمانی درباره فرآیند همکاری، تیم فنی و گزارش‌دهی دارند.',
    sections: [
      {
        name: 'قرارداد و زمان‌بندی',
        items: [
          {
            question: 'مدت زمان استاندارد همکاری چقدر است؟',
            answer: 'اکثر مشتریان با اسپرینت سه‌ماهه شروع می‌کنند و سپس به ریتینر شش یا دوازده‌ماهه می‌روند. ما هر ۹۰ روز نقاط تصمیم‌گیری تعریف می‌کنیم.',
          },
          {
            question: 'شرایط لغو یا مکث پروژه چیست؟',
            answer: 'قراردادها شامل اطلاع ۳۰ روزه برای مکث یا خاتمه هستند و تمامی داده‌ها و مستندات تا آن زمان تحویل داده می‌شود.',
          },
        ],
      },
      {
        name: 'تکنیکال و توسعه',
        items: [
          {
            question: 'چگونه با تیم فنی ما هماهنگ می‌شوید؟',
            answer: 'یک SEO Tech Lead در اسپرینت‌های توسعه شرکت می‌کند، تسک‌ها را در ابزارهای شما (Jira/Asana) تعریف می‌کند و CI/CD را رصد می‌کند.',
          },
          {
            question: 'آیا به محیط‌های staging دسترسی نیاز دارید؟',
            answer: 'بله، برای تست تگ‌ها، schema و عملکرد نیازمند دسترسی read-only به staging یا preview هستیم.',
          },
        ],
      },
      {
        name: 'گزارش‌دهی و KPI',
        items: [
          {
            question: 'چه نوع داشبوردی ارائه می‌کنید؟',
            answer: 'داشبورد Looker/PowerBI با اتصال به Search Console، آنالیتیکس و CRM که شاخص‌های کسب‌وکار و سئو را ترکیب می‌کند.',
          },
          {
            question: 'تکرار جلسات مدیریتی چگونه است؟',
            answer: 'جلسات استراتژیک ماهانه همراه با گزارش کتبی و خلاصه اجرایی برای هیئت مدیره برگزار می‌شود.',
          },
        ],
      },
    ],
  },
  en: {
    title: 'Frequently asked questions',
    intro: 'Answers to the most common questions from enterprise teams about our engagement model, engineering practice, and reporting.',
    sections: [
      {
        name: 'Contracts & timelines',
        items: [
          {
            question: 'How long is a typical engagement?',
            answer: 'Most partners begin with a 3-month sprint and then transition into 6 or 12-month retainers. We set 90-day checkpoints for strategy alignment.',
          },
          {
            question: 'Can we pause or cancel the programme?',
            answer: 'Agreements include a 30-day notice period. All documentation, dashboards, and experiments are handed over during the transition.',
          },
        ],
      },
      {
        name: 'Technical & engineering',
        items: [
          {
            question: 'How do you collaborate with our developers?',
            answer: 'An SEO tech lead joins your sprint ceremonies, creates tickets in your tooling (Jira/Asana), and monitors CI/CD pipelines for regressions.',
          },
          {
            question: 'Do you need access to staging environments?',
            answer: 'Yes, read-only access helps us validate markup, schema, and performance before release while respecting your security policies.',
          },
        ],
      },
      {
        name: 'Reporting & KPIs',
        items: [
          {
            question: 'What does reporting look like?',
            answer: 'We build Looker/Power BI workspaces connected to Search Console, analytics, and CRM to show business impact alongside SEO metrics.',
          },
          {
            question: 'How often do we meet with leadership?',
            answer: 'Monthly executive sessions with written readouts summarising wins, blockers, and the roadmap for the next sprint.',
          },
        ],
      },
    ],
  },
  ar: {
    title: 'الأسئلة الشائعة',
    intro: 'إجابات على أبرز الأسئلة من فرق المؤسسات حول نموذج التعاون والممارسات التقنية والتقارير.',
    sections: [
      {
        name: 'العقود والجداول الزمنية',
        items: [
          {
            question: 'ما مدة التعاون المعتادة؟',
            answer: 'نبدأ عادةً بسباق لمدة ثلاثة أشهر ثم ننتقل إلى عقود مستمرة لمدة ستة أو اثني عشر شهرًا مع نقاط مراجعة كل 90 يومًا.',
          },
          {
            question: 'هل يمكن إيقاف البرنامج مؤقتًا؟',
            answer: 'تتضمن الاتفاقيات إشعارًا قبل 30 يومًا، وخلال هذه الفترة نسلم جميع المستندات ولوحات المتابعة والتجارب الجارية.',
          },
        ],
      },
      {
        name: 'الجوانب التقنية',
        items: [
          {
            question: 'كيف تتعاونون مع مطوري الشركة؟',
            answer: 'يقوم قائد تقني للسيو بحضور اجتماعات السبرنت، وإنشاء التذاكر في أدواتكم مثل Jira، ومراقبة خطوط CI/CD لمنع أي تراجع.',
          },
          {
            question: 'هل تحتاجون إلى الوصول لبيئات staging؟',
            answer: 'نعم، الوصول للقراءة فقط يسمح لنا بالتحقق من العلامات والبيانات المنظمة والأداء قبل الإطلاق مع احترام سياسات الأمان.',
          },
        ],
      },
      {
        name: 'التقارير والمؤشرات',
        items: [
          {
            question: 'ما شكل التقارير؟',
            answer: 'ننشئ لوحات تحكم في Looker أو Power BI مرتبطة بـ Search Console والتحليلات وCRM لإظهار الأثر التجاري مع مؤشرات السيو.',
          },
          {
            question: 'ما تكرار الاجتماعات التنفيذية؟',
            answer: 'نجتمع شهريًا مع الإدارة العليا ونقدم تقارير مكتوبة تلخص الإنجازات والمعوقات وخطة السبرنت التالية.',
          },
        ],
      },
    ],
  },
};

export const FAQPage: FC<FAQProps> = ({ lang }) => {
  const locale = faqContent[lang];
  const isRTL = languages[lang].dir === 'rtl';

  return (
    <Layout lang={lang} title={locale.title} active="faq">
      <section class="space-y-10">
        <SectionHeader eyebrow={locale.title} title={locale.intro} align="start" />
        <div class="space-y-8">
          {locale.sections.map((section) => (
            <Card key={section.name} variant="glass" interactive={false} className="space-y-4">
              <h2 class="font-display text-xl font-semibold text-gray-900 dark:text-white">{section.name}</h2>
              <Accordion items={section.items} />
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
};
