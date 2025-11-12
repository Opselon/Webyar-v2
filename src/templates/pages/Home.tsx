import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Layout } from '../layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { SectionHeader } from '../components/SectionHeader';
import { MetricCard } from '../components/MetricCard';
import { Accordion } from '../components/Accordion';
import { Icon } from '../components/Icon';
import { Badge } from '../components/Badge';
import { Language, languages, t } from '../../utils/i18n';
import servicesData from '../../data/services.json';
import caseStudiesData from '../../data/case-studies.json';
import postsData from '../../data/posts.json';

type Service = (typeof servicesData)['services'][number];
type CaseStudy = (typeof caseStudiesData)['caseStudies'][number];
type Post = (typeof postsData)['posts'][number];

interface HomeProps {
  lang: Language;
}

const copy = {
  fa: {
    heroBadge: 'آژانس سئوی سازمانی',
    heroHighlights: ['داشبورد تحلیلی لحظه‌ای', 'یکپارچه با تیم‌های محصول و دیتا', 'پشتیبانی کامل چندزبانه'],
    heroPanelTitle: 'پنل کنترل سازمانی',
    heroPanelBadge: 'همگام‌سازی لحظه‌ای',
    heroPanelGrowthLabel: 'مسیر رشد ارگانیک',
    heroPanelIndustry: 'SaaS / EMEA',
    heroPanelQoQ: 'QoQ ‎+38%',
    heroPanelCoverageLabel: 'پوشش شاخص ۷ روزه',
    heroPanelCoverageValue: '۹۹.۳٪ موفق',
    metrics: [
      { icon: 'growth', label: 'میانگین رشد ۱۲ ماهه', value: '+164%', trend: '+27% YoY' },
      { icon: 'speed', label: 'امتیاز LCP میانگین', value: '1.9s', trend: '‎-38%‎' },
      { icon: 'analytics', label: 'آزمایش‌های انجام‌شده', value: '420+', trend: 'در ۹ بازار' },
    ],
    whyEyebrow: 'چرا کوانتوم سئو؟',
    whyTitle: 'فرآیند سازمانی، نه پروژه‌ای',
    whyDescription:
      'تیم ما با استفاده از معماری داده، هوش رقابتی و مهندسی سئو، مدل رشد پایدار و قابل سنجش برای برندهای شما خلق می‌کند.',
    whyItems: [
      {
        icon: 'analytics',
        title: 'تصمیم‌گیری بر مبنای داده',
        description: 'داشبوردهای بلادرنگ، مدل‌سازی سناریو و اتوماسیون گزارش‌دهی برای تیم مدیریت.',
      },
      {
        icon: 'code',
        title: 'مهندسی تکنیکال عمیق',
        description: 'دسترسی به تیم DevOps سئو، تحلیل لاگ، CI/CD و بهینه‌سازی Core Web Vitals.',
      },
      {
        icon: 'globe',
        title: 'سئوی بین‌المللی آماده مقیاس',
        description: 'برنامه‌ریزی برای چند بازار، محلی‌سازی تخصصی و پیاده‌سازی hreflang بدون خطا.',
      },
      {
        icon: 'network',
        title: 'شراکت‌های بلندمدت',
        description: 'همکاری ماهانه با تیم‌های محصول، بازاریابی و محتوا برای همسویی اهداف کسب‌وکار.',
      },
    ],
    businessPanel: {
      title: 'برای مدیران کسب‌وکار',
      description: 'گزارش‌های مدیریتی، مدل‌سازی درآمد و نقشه راه رشد که در هیئت مدیره قابل دفاع باشد.',
      bullets: ['KPIهای قابل اقدام در هر فصل', 'پیش‌بینی رشد ارگانیک و سهم بازار', 'رودمپ تحول دیجیتال ۱۲ ماهه'],
    },
    developerPanel: {
      title: 'برای تیم‌های فنی',
      description: 'چک‌لیست‌های تکنیکال، تست خودکار و پشتیبانی مهندسی برای هر نسخه محصول.',
      bullets: ['پایش Core Web Vitals و Performance Budget', 'Pipeline‌های QA در CI/CD', 'مستندسازی ساختار داده و Schema'],
    },
    featureEyebrow: 'تجربه کاربری نوین',
    featureTitle: 'ویژگی‌هایی که احساس می‌شوند',
    featureDescription: 'کیت UX/UI شفاف، پرسرعت و مخصوص دستگاه‌های همراه که پیام برند را در هر لمس منتقل می‌کند.',
    featureHighlights: [
      {
        icon: 'automation',
        title: 'به‌روزرسانی پیوسته',
        description: 'توکن‌های طراحی، تعاملات ریز و متن داده‌محور که با هر اسپرینت تطبیق پیدا می‌کنند.',
      },
      {
        icon: 'shield',
        title: 'جریان‌های قابل اعتماد',
        description: 'الگوهای دسترس‌پذیر، فاصله‌بندی ثابت و بازخوردهایی که تیم و مشتری را مطمئن می‌سازد.',
      },
      {
        icon: 'stack',
        title: 'چیدمان آماده‌پلتفرم',
        description: 'سیستم‌های شبکه‌ای، نقاط شکست واکنش‌گرا و کارت‌هایی که در هر بازار به‌راحتی چیده می‌شوند.',
      },
    ],
    currencyEyebrow: 'صورتحساب و پرداخت',
    currencyHeading: 'انتخاب ارزهای انعطاف‌پذیر',
    currencyDescription: 'صورتحساب‌های خودکار در USD، ریال یا ارز محلی تا رشد بین‌المللی متوقف نشود.',
    currencyLabel: 'ارز صورتحساب',
    currencyBadge: 'نرخ زنده',
    selectedCurrencyLabel: 'USD',
    currencyOptions: ['USD', 'ریال ایران (IRR)', 'یورو (EUR)'],
    currencyFootnote: 'تغییر ارز با گزارش‌های یکپارچه برای تیم‌های قانونی منطقه‌ای.',
    mobileEyebrow: 'اول موبایل',
    mobileHeading: 'تجربه موبایلی بهینه‌شده',
    mobileDescription: 'جریان‌هایی می‌سازیم که KPIهای پیچیده را روی گوشی خوانا نگه داشته و دکمه‌ها را برای انگشت شست قابل‌دسترسی می‌کنند.',
    mobileBullets: [
      'گریدهای واکنش‌گرا که بدون فشار برای هر پهنا بازآرایی می‌شوند',
      'تلِمتری فشرده و اکشن‌های فوری برای تیم‌های پرمشغله',
      'کنترل‌های قابل لمس با نشانه‌های واضح در تمام زبان‌ها',
    ],
    performanceEyebrow: 'عملکرد موبایل',
    performanceTitle: 'سرعت پیکسل به پیکسل برای هر گوشی',
    performanceDescription:
      'کش، رندر پیش‌بارگذاری و تلِمتری همگام نگه داشته می‌شوند تا لمس‌ها حتی در شبکه‌های شلوغ سریع بمانند.',
    performanceHighlights: [
      {
        icon: 'speed',
        title: 'تعاملات لحظه‌ای',
        value: 'TI < 0.9s',
        description: 'هیدراتاسیون تطبیقی و پیش‌بارگذاری هوشمند',
      },
      {
        icon: 'analytics',
        title: 'دید لحظه‌ای',
        value: '99.99% RH',
        description: 'نقاط شکست پاسخگو و ثبت Core Web Vitals هر بار',
      },
      {
        icon: 'automation',
        title: 'بایت‌های سبک',
        value: '<300ms bundles',
        description: 'CSS/JS تقسیم‌شده و تصاویر متناسب با دستگاه',
      },
    ],
    trustHeading: 'اعتماد برندهای فناوری، فین‌تک و رسانه',
    faqTitle: 'سوالات پرتکرار',
    faqItems: [
      {
        question: 'چرخه همکاری شما چگونه است؟',
        answer:
          'هر همکاری با یک فاز Discovery سه‌هفته‌ای آغاز می‌شود، سپس اسپرینت‌های ۹۰ روزه با اهداف مشخص و گزارش لحظه‌ای دنبال می‌شود.',
      },
      {
        question: 'چگونه با تیم‌های داخلی ما هماهنگ می‌شوید؟',
        answer:
          'یک مدیر برنامه اختصاصی و کانال مشترک Slack/Teams داریم و در جلسات محصول، مارکتینگ و داده به صورت منظم شرکت می‌کنیم.',
      },
      {
        question: 'نتایج را چگونه اندازه‌گیری می‌کنید؟',
        answer:
          'KPIهای مشترک تعریف می‌کنیم؛ از جمله رشد ترافیک، لید ارگانیک، سهم صدا و امتیاز Core Web Vitals، و همگی در داشبورد زنده قابل مشاهده‌اند.',
      },
    ],
    blogEyebrow: 'تحلیل و بینش',
    blogTitle: 'آخرین بینش‌های تیم مشاور',
  },
  en: {
    heroBadge: 'Enterprise SEO Lab',
    heroHighlights: ['Real-time analytics cockpit', 'Embedded with product & data teams', 'Full multilingual enablement'],
    heroPanelTitle: 'Enterprise Control Panel',
    heroPanelBadge: 'Live Sync',
    heroPanelGrowthLabel: 'Organic Growth Trajectory',
    heroPanelIndustry: 'SaaS / EMEA',
    heroPanelQoQ: '+38% QoQ',
    heroPanelCoverageLabel: 'Rolling 7-day index coverage',
    heroPanelCoverageValue: '99.3% passed',
    metrics: [
      { icon: 'growth', label: 'Average 12-month lift', value: '+164%', trend: '+27% YoY' },
      { icon: 'speed', label: 'Median LCP score', value: '1.9s', trend: '‎-38%‎' },
      { icon: 'analytics', label: 'Experiments shipped', value: '420+', trend: 'Across 9 markets' },
    ],
    whyEyebrow: 'Why Quantum?',
    whyTitle: 'An operating system, not a one-off project',
    whyDescription:
      'We align marketing, product, and engineering around data models, technical excellence, and content velocity to deliver measurable growth.',
    whyItems: [
      {
        icon: 'analytics',
        title: 'Data-led governance',
        description: 'Live dashboards, scenario modelling, and automated reporting trusted by leadership.',
      },
      {
        icon: 'code',
        title: 'Technical depth on tap',
        description: 'SEO DevOps squad with log analysis, CI/CD QA, and Core Web Vitals optimisation.',
      },
      {
        icon: 'globe',
        title: 'International ready',
        description: 'Market prioritisation, localisation playbooks, and flawless hreflang implementation.',
      },
      {
        icon: 'network',
        title: 'Long-term partnership',
        description: 'Monthly steering with product, marketing, and content to keep roadmaps aligned.',
      },
    ],
    businessPanel: {
      title: 'For business leaders',
      description: 'Executive-ready reporting, revenue modelling, and growth roadmaps the board understands.',
      bullets: ['Quarterly actionable KPIs', 'Organic share-of-voice forecasting', '12-month digital transformation plan'],
    },
    developerPanel: {
      title: 'For engineering teams',
      description: 'Technical checklists, automated testing, and hands-on SEO engineering for every release.',
      bullets: ['Core Web Vitals & performance budgets', 'CI/CD integrated QA pipelines', 'Structured data and schema governance'],
    },
    featureEyebrow: 'Experience upgrade',
    featureTitle: 'Futures that feel tangible',
    featureDescription: 'An enhanced UI/UX kit that keeps clarity, speed, and mobile control at the core of every interaction.',
    featureHighlights: [
      {
        icon: 'automation',
        title: 'Continuous refinement',
        description: 'Design tokens, micro-interactions, and data-driven copy that evolve with each sprint.',
      },
      {
        icon: 'shield',
        title: 'Trustworthy flows',
        description: 'Accessibility-first patterns, consistent spacing, and feedback loops that reassure teams and customers.',
      },
      {
        icon: 'stack',
        title: 'Platform-ready layouts',
        description: 'Grid systems, responsive breakpoints, and composable cards for every market.',
      },
    ],
    currencyEyebrow: 'Billing & payments',
    currencyHeading: 'Multi-currency options for global teams',
    currencyDescription: 'Automated invoicing in USD, Rial, or local currencies so expansion moments don’t stall because of payments.',
    currencyLabel: 'Billing currency',
    currencyBadge: 'Live FX',
    selectedCurrencyLabel: 'USD',
    currencyOptions: ['USD', 'IRR (Rial)', 'EUR'],
    currencyFootnote: 'Switchable billing for regional legal teams with consolidated reporting.',
    mobileEyebrow: 'Phone-first',
    mobileHeading: 'Tailored experience for small screens',
    mobileDescription: 'We craft flows that keep complex KPIs readable on phones and keep CTAs thumb-friendly.',
    mobileBullets: [
      'Responsive grids that reflow naturally for any width',
      'Condensed telemetry and quick actions for time-pressed teams',
      'Touch-safe controls with clear affordances across languages',
    ],
    performanceEyebrow: 'Mobile performance',
    performanceTitle: 'Pixel-perfect speed on every phone',
    performanceDescription:
      'Caching, pre-rendering, and telemetry keep touch journeys snappy even on congested networks.',
    performanceHighlights: [
      {
        icon: 'speed',
        title: 'Instant interactions',
        value: 'TI < 0.9s',
        description: 'Adaptive hydration and predictive prefetch',
      },
      {
        icon: 'analytics',
        title: 'Live visibility',
        value: '99.99% RH',
        description: 'Responsive breakpoints and Core Web Vitals tracking',
      },
      {
        icon: 'automation',
        title: 'Lean payloads',
        value: '<300ms bundles',
        description: 'Split CSS/JS and smart imagery keep scroll smooth',
      },
    ],
    trustHeading: 'Trusted by technology, fintech, and media leaders',
    faqTitle: 'Frequently asked questions',
    faqItems: [
      {
        question: 'What does onboarding look like?',
        answer:
          'We start with a three-week discovery sprint, then move into 90-day roadmaps with live analytics and monthly executive sessions.',
      },
      {
        question: 'How do you work with internal teams?',
        answer:
          'A dedicated program lead embeds with your squads via shared Slack/Teams channels and recurring product, marketing, and data ceremonies.',
      },
      {
        question: 'How is success measured?',
        answer:
          'We co-define KPIs such as organic traffic, pipeline contribution, share of voice, and Core Web Vitals—all visualised inside your live dashboard.',
      },
    ],
    blogEyebrow: 'Insights & analysis',
    blogTitle: 'Fresh thinking from our consultants',
  },
  ar: {
    heroBadge: 'مختبر السيو المؤسسي',
    heroHighlights: ['لوحة تحكم تحليلية لحظية', 'مندمج مع فرق المنتج والبيانات', 'تمكين كامل متعدد اللغات'],
    heroPanelTitle: 'لوحة التحكم المؤسسية',
    heroPanelBadge: 'المزامنة اللحظية',
    heroPanelGrowthLabel: 'مسار النمو العضوي',
    heroPanelIndustry: 'SaaS / EMEA',
    heroPanelQoQ: 'QoQ ‎+38%',
    heroPanelCoverageLabel: 'تغطية مؤشرات ٧ أيام',
    heroPanelCoverageValue: '٩٩.٣٪ اجتازت',
    metrics: [
      { icon: 'growth', label: 'متوسط النمو خلال 12 شهرًا', value: '+164%', trend: '+27% سنويًا' },
      { icon: 'speed', label: 'متوسط مؤشر LCP', value: '1.9s', trend: '‎-38%‎' },
      { icon: 'analytics', label: 'عدد التجارب المنفذة', value: '420+', trend: 'في 9 أسواق' },
    ],
    whyEyebrow: 'لماذا كوانتوم؟',
    whyTitle: 'نظام تشغيلي متكامل وليس مشروعًا عابرًا',
    whyDescription:
      'ننسق جهود التسويق والمنتج والهندسة عبر نماذج البيانات، والتميز التقني، وسرعة المحتوى لنحقق نموًا قابلًا للقياس.',
    whyItems: [
      {
        icon: 'analytics',
        title: 'حوكمة مدفوعة بالبيانات',
        description: 'لوحات تحكم مباشرة، نمذجة سيناريوهات، وتقرير آلي يثق به التنفيذيون.',
      },
      {
        icon: 'code',
        title: 'عمق تقني دائم',
        description: 'فريق DevOps للسيو مع تحليل السجلات، واختبارات CI/CD، وتحسين Core Web Vitals.',
      },
      {
        icon: 'globe',
        title: 'جاهزية للتوسع الدولي',
        description: 'تحديد أولويات الأسواق، ودلائل التوطين، وتطبيق hreflang بلا أخطاء.',
      },
      {
        icon: 'network',
        title: 'شراكة طويلة الأمد',
        description: 'توجيه شهري مع فرق المنتج والتسويق والمحتوى للحفاظ على توافق الأهداف.',
      },
    ],
    businessPanel: {
      title: 'لصنّاع القرار',
      description: 'تقارير تنفيذية، نمذجة للإيرادات، وخارطة نمو يفهمها مجلس الإدارة.',
      bullets: ['مؤشرات قابلة للتنفيذ كل ربع سنة', 'توقعات لحصة الصوت العضوية', 'خطة تحول رقمية لمدة 12 شهرًا'],
    },
    developerPanel: {
      title: 'لفرق التطوير',
      description: 'قوائم تحقق تقنية، اختبارات مؤتمتة، ودعم هندسي لإصدارات المنتج.',
      bullets: ['مراقبة Core Web Vitals والميزانيات الأداء', 'قنوات QA مدمجة مع CI/CD', 'حوكمة للبيانات المنظمة و Schema'],
    },
    featureEyebrow: 'تجربة محسنة',
    featureTitle: 'ميزات جديدة تُشعر بها الفرق',
    featureDescription: 'منهجية UX/UI للوضوح والسرعة والتحكم عبر الجوال في كل تفاعل.',
    featureHighlights: [
      {
        icon: 'automation',
        title: 'تحسين مستمر',
        description: 'رموز تصميم، تفاعلات دقيقة، ونصوص تعتمد على البيانات مع كل Sprint.',
      },
      {
        icon: 'shield',
        title: 'مسارات موثوقة',
        description: 'أنماط متاحة، تباعد متسق، وردود فعل تريح الفرق والعملاء.',
      },
      {
        icon: 'stack',
        title: 'تصاميم جاهزة للنشر',
        description: 'شبكات مرنة، نقاط توقف استجابة، وبطاقات قابلة للتركيب لأي سوق.',
      },
    ],
    currencyEyebrow: 'الفواتير وطرق الدفع',
    currencyHeading: 'خيارات عملة متعددة للفرق العالمية',
    currencyDescription: 'فواتير مؤتمتة بالدولار، الريال أو أي عملة محلية حتى لا تتوقف المبادرات.',
    currencyLabel: 'عملة الفاتورة',
    currencyBadge: 'سعر صرف مباشر',
    selectedCurrencyLabel: 'USD',
    currencyOptions: ['USD', 'ريال (IRR)', 'يورو (EUR)'],
    currencyFootnote: 'تحويل عملة سريع مع تقارير موحدة للفرق القانونية.',
    mobileEyebrow: 'أولوية الهاتف',
    mobileHeading: 'تجربة مصممة للشاشات الصغيرة',
    mobileDescription: 'نصمم مسارات تجعل KPIs المعقدة قابلة للقراءة وتضع الأزرار ضمن متناول الإبهام.',
    mobileBullets: [
      'شبكات يتكيف فيها المحتوى بكل سلاسة لأي عرض',
      'مقاييس موجزة وعمليات سريعة للفرق المرهقة',
      'ضوابط لمس آمنة مع إشارات واضحة في كل لغة',
    ],
    performanceEyebrow: 'أداء الجوال',
    performanceTitle: 'سرعة دقيقة على كل هاتف',
    performanceDescription:
      'التخزين المسبق، العرض المسبق، والقياس المباشر تحافظ على لمسٍ سريع حتى عبر الشبكات المزدحمة.',
    performanceHighlights: [
      {
        icon: 'speed',
        title: 'تفاعلات فورية',
        value: 'TI < 0.9s',
        description: 'تزاوج ذكي بين التحميل والتنبؤ بالأحداث',
      },
      {
        icon: 'analytics',
        title: 'رصد حي',
        value: '99.99% RH',
        description: 'نقاط توقف متجاوبة وقياس Core Web Vitals لكل رحلة',
      },
      {
        icon: 'automation',
        title: 'حزم خفيفة',
        value: '<300ms bundles',
        description: 'تقسيم CSS/JS وصور متوازنة للأجهزة',
      },
    ],
    trustHeading: 'موثوق من قادة التقنية والمال والإعلام',
    faqTitle: 'الأسئلة الأكثر شيوعًا',
    faqItems: [
      {
        question: 'كيف تتم مرحلة الانطلاق؟',
        answer:
          'نبدأ بسبر استكشافي لثلاثة أسابيع ثم ننتقل إلى خطط مدتها 90 يومًا مع تحليلات مباشرة وجلسات تنفيذية شهرية.',
      },
      {
        question: 'كيف تتعاونون مع فرقنا الداخلية؟',
        answer:
          'مدير برنامج مخصص ينضم إلى فرقكم عبر Slack أو Teams مع حضور منتظم لاجتماعات المنتج والتسويق والبيانات.',
      },
      {
        question: 'كيف نقيس النجاح؟',
        answer:
          'نحدد مؤشرات أداء مشتركة مثل الزيارات العضوية، مساهمة القمع، حصة الصوت، ومؤشرات الويب الأساسية ونعرضها في لوحة تحكم مباشرة.',
      },
    ],
    blogEyebrow: 'رؤى وتحليلات',
    blogTitle: 'أحدث أفكار مستشارينا',
  },
};

export const HomePage: FC<HomeProps> = ({ lang }) => {
  const title = t(lang, 'homepageTitle');
  const locale = copy[lang];
  const isRTL = languages[lang].dir === 'rtl';
  const services: Service[] = servicesData.services;
  const heroCaseStudies: CaseStudy[] = caseStudiesData.caseStudies.slice(0, 3);
  const latestPosts: Post[] = postsData.posts.slice(0, 3);

  return (
    <Layout lang={lang} title={title} active="home">
      <section class="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-white via-brand-50 to-accent-50 p-8 shadow-soft dark:from-surface-muted dark:via-surface-muted/60 dark:to-midnight">
        <div class={`grid gap-10 lg:grid-cols-[1.1fr_0.9fr] ${isRTL ? 'lg:text-right' : ''}`}>
          <div class="flex flex-col gap-6">
            <Badge>{locale.heroBadge}</Badge>
            <h1 class="font-display text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
              {t(lang, 'homeHeroTitle')}
            </h1>
            <p class="max-w-xl text-base text-gray-600 dark:text-gray-300 md:text-lg">
              {t(lang, 'homeHeroSubtitle')}
            </p>
            <ul class={`flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300 ${isRTL ? 'lg:justify-end' : ''}`}>
              {locale.heroHighlights.map((item) => (
                <li key={item} class="flex items-center gap-2 rounded-full border border-brand-200/60 bg-white/80 px-4 py-2 shadow-inner dark:border-white/10 dark:bg-surface-muted/70">
                  <span class="inline-flex h-2 w-2 rounded-full bg-accent-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div class={`flex flex-col gap-4 sm:flex-row ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button href={`/${lang}/contact`} text={t(lang, 'homeHeroCtaPrimary')} />
              <Button href={`/${lang}/pricing`} text={t(lang, 'homeHeroCtaSecondary')} variant="secondary" />
            </div>
            <div class="grid gap-4 pt-4 sm:grid-cols-3">
              {locale.metrics.map((metric) => (
                <MetricCard key={metric.label} icon={metric.icon as Parameters<typeof Icon>[0]['name']} label={metric.label} value={metric.value} trend={metric.trend} />
              ))}
            </div>
          </div>
          <div class={`relative flex items-center justify-center ${isRTL ? 'lg:justify-start' : ''}`}>
            <Card className="relative z-10 w-full max-w-lg overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 p-0 text-white shadow-glass" variant="solid">
              <div class="flex flex-col gap-4 p-6">
                <div class="flex items-center justify-between text-xs uppercase tracking-wider">
                  <span class="opacity-80">{locale.heroPanelTitle}</span>
                  <span class="rounded-full bg-white/20 px-3 py-1">{locale.heroPanelBadge}</span>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80"
                  alt="Analytics dashboard preview"
                  class="h-48 w-full rounded-2xl object-cover object-center"
                  loading="lazy"
                />
                <div class="rounded-2xl bg-white/10 p-4">
                  <p class="text-sm font-semibold">{locale.heroPanelGrowthLabel}</p>
                  <div class="mt-3 flex items-center justify-between text-xs">
                    <span class="opacity-80">{locale.heroPanelIndustry}</span>
                    <span class="rounded-full bg-accent-500/20 px-3 py-1 text-accent-200">{locale.heroPanelQoQ}</span>
                  </div>
                  <div class="mt-4 flex items-center gap-3">
                    <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                      <Icon name="radar" className="h-5 w-5 text-white" />
                    </span>
                    <div class="text-xs opacity-90">
                      <p>{locale.heroPanelCoverageLabel}</p>
                      <p class="font-semibold text-white">{locale.heroPanelCoverageValue}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <div class="absolute -inset-y-12 inset-inline-end-6 hidden h-full w-[65%] rounded-full bg-hero-grid opacity-50 blur-3xl dark:opacity-70 lg:block" />
          </div>
        </div>
      </section>

      <section class="mt-20 space-y-12">
        <SectionHeader eyebrow={locale.whyEyebrow} title={locale.whyTitle} description={locale.whyDescription} align={isRTL ? 'start' : 'start'} />
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {locale.whyItems.map((item) => (
            <Card key={item.title} className="h-full">
              <div class="flex flex-col gap-4">
                <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-accent-200">
                  <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} />
                </span>
                <h3 class="font-display text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p class="text-sm leading-7">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section class="mt-20 space-y-10">
        <SectionHeader
          eyebrow={t(lang, 'homeServicesTitle')}
          title={t(lang, 'servicesTitle')}
          description={t(lang, 'servicesSubtitle')}
          align="center"
        />
        <div class="grid gap-6 lg:grid-cols-3">
          {services.map((service) => {
            const content = service.translations[lang];
            return (
              <Card key={service.id} className="h-full" variant="glass">
                <div class="flex flex-col gap-4">
                  <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-500/10 text-brand-600 dark:text-accent-200">
                    <Icon name={service.icon as Parameters<typeof Icon>[0]['name']} />
                  </span>
                  <div class="flex flex-col gap-2">
                    <h3 class="font-display text-xl font-semibold text-gray-900 dark:text-white">{content.title}</h3>
                    <p class="text-sm leading-7">{content.description}</p>
                  </div>
                  <ul class={`flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300 ${isRTL ? 'text-right' : ''}`}>
                    {content.details.slice(0, 3).map((detail) => (
                      <li key={detail} class="flex items-start gap-2">
                        <span class="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-brand-500" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`/${lang}/services#${service.id}`}
                    class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition hover:text-brand-800 dark:text-accent-200 dark:hover:text-white"
                  >
                    {t(lang, 'learnMore')}
                    <span class="text-lg">→</span>
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section class="mt-12 space-y-10">
        <SectionHeader
          eyebrow={locale.featureEyebrow}
          title={locale.featureTitle}
          description={locale.featureDescription}
          align="start"
        />
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {locale.featureHighlights.map((feature) => (
            <Card variant="glass" className="space-y-3 rounded-2xl" key={feature.title}>
              <div class="flex items-center gap-3">
                <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:bg-accent-200/10 dark:text-accent-200">
                  <Icon name={feature.icon as Parameters<typeof Icon>[0]['name']} />
                </span>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</p>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section class="mt-10 space-y-6">
        <SectionHeader
          eyebrow={locale.currencyEyebrow}
          title={locale.currencyHeading}
          description={locale.currencyDescription}
          align="start"
        />
        <div class="grid gap-6 lg:grid-cols-2">
          <Card variant="glass" className="space-y-5 rounded-2xl border border-brand-100/80 p-5">
            <div class="flex items-center justify-between">
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">{locale.currencyLabel}</p>
              <Badge tone="accent">{locale.currencyBadge}</Badge>
            </div>
            <p class="text-3xl font-semibold text-gray-900 dark:text-white">{locale.selectedCurrencyLabel}</p>
            <div class="flex flex-wrap gap-3">
              {locale.currencyOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  class="rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-brand-500 dark:border-white/20 dark:bg-white/5 dark:text-white"
                >
                  {option}
                </button>
              ))}
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400">{locale.currencyFootnote}</p>
          </Card>
          <Card variant="glass" className="space-y-6 rounded-2xl border border-accent-100/80 p-5">
            <div class="space-y-3">
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">{locale.mobileEyebrow}</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">{locale.mobileHeading}</p>
              <p class="text-sm text-gray-600 dark:text-gray-300">{locale.mobileDescription}</p>
            </div>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-200">
              {locale.mobileBullets.map((bullet) => (
                <li key={bullet} class="flex items-start gap-2">
                  <span class="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-brand-500 dark:bg-accent-200" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <Button href={`/${lang}/contact`} variant="secondary">
              {t(lang, 'homeHeroCtaPrimary')}
            </Button>
          </Card>
        </div>
      </section>

      <section class="mt-12 space-y-8">
        <SectionHeader
          eyebrow={locale.performanceEyebrow}
          title={locale.performanceTitle}
          description={locale.performanceDescription}
          align="start"
        />
        <div class="grid gap-6 md:grid-cols-3">
          {locale.performanceHighlights.map((highlight) => (
            <Card key={highlight.title} variant="glass" className="space-y-4 rounded-[28px] p-5">
              <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:bg-accent-200/10 dark:text-accent-200">
                    <Icon name={highlight.icon as Parameters<typeof Icon>[0]['name']} />
                  </span>
                  <div class="space-y-1">
                    <p class="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{highlight.title}</p>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{highlight.value}</p>
                  </div>
                </div>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300">{highlight.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section class="mt-20 grid gap-8 lg:grid-cols-2">
        <Card className="h-full" variant="solid">
          <div class="flex flex-col gap-4">
            <h3 class="font-display text-2xl font-semibold text-gray-900 dark:text-white">{locale.businessPanel.title}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">{locale.businessPanel.description}</p>
            <ul class={`flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-200 ${isRTL ? 'text-right' : ''}`}>
              {locale.businessPanel.bullets.map((bullet) => (
                <li key={bullet} class="flex items-start gap-3">
                  <span class="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-accent-500" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <Button href={`/${lang}/pricing`} variant="secondary">
              {t(lang, 'viewPlans')}
            </Button>
          </div>
        </Card>
        <Card className="h-full" variant="solid">
          <div class="flex flex-col gap-4">
            <h3 class="font-display text-2xl font-semibold text-gray-900 dark:text-white">{locale.developerPanel.title}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">{locale.developerPanel.description}</p>
            <ul class={`flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-200 ${isRTL ? 'text-right' : ''}`}>
              {locale.developerPanel.bullets.map((bullet) => (
                <li key={bullet} class="flex items-start gap-3">
                  <span class="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-brand-500" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <Button href={`/${lang}/services`} variant="ghost" className="justify-start">
              {t(lang, 'learnMore')}
            </Button>
          </div>
        </Card>
      </section>

      <section class="mt-20 space-y-10">
        <SectionHeader
          eyebrow={t(lang, 'homeCaseStudiesTitle')}
          title={t(lang, 'caseStudiesTitle')}
          description=""
          align="center"
        />
        <div class="grid gap-6 md:grid-cols-3">
          {heroCaseStudies.map((study) => {
            const content = study.translations[lang];
            return (
              <Card key={study.id} className="h-full" variant="glass">
                <div class="flex flex-col gap-4">
                  <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:text-accent-200">
                    {study.client.slice(0, 2)}
                  </span>
                  <div class="flex flex-col gap-1">
                    <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{study.industry}</p>
                    <h3 class="font-display text-lg font-semibold text-gray-900 dark:text-white">{content.title}</h3>
                  </div>
                  <div class="rounded-2xl bg-surface-light/60 p-4 text-sm text-gray-700 dark:bg-surface-muted/80 dark:text-gray-200">
                    <p class="font-semibold text-brand-700 dark:text-accent-200">{study.kpi}</p>
                    <p class="mt-2 leading-7">{content.solution}</p>
                  </div>
                  <a
                    href={`/${lang}/case-studies/${study.slug}`}
                    class="text-sm font-semibold text-brand-600 transition hover:text-brand-800 dark:text-accent-200 dark:hover:text-white"
                  >
                    {t(lang, 'viewCaseStudy')} →
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
        <div class="flex justify-center">
          <Button href={`/${lang}/case-studies`} variant="secondary">
            {t(lang, 'viewCaseStudy')}
          </Button>
        </div>
      </section>

      <section class="mt-20 rounded-3xl border border-white/20 bg-white/70 p-10 shadow-soft dark:border-white/10 dark:bg-surface-muted/80">
        <p class={`text-sm font-semibold uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400 ${isRTL ? 'text-right' : 'text-center'}`}>
          {locale.trustHeading}
        </p>
        <div class={`mt-8 grid gap-6 text-center text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 sm:grid-cols-3 lg:grid-cols-6 ${isRTL ? 'lg:direction-rtl' : ''}`}>
          {['Chronicle', 'Payzo', 'Northwind', 'Helix', 'Aurora', 'Nova Media'].map((brand) => (
            <div key={brand} class="rounded-2xl border border-white/30 bg-white/60 px-4 py-6 shadow-inner dark:border-white/10 dark:bg-white/5">
              {brand}
            </div>
          ))}
        </div>
      </section>

      <section class="mt-20 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div class="space-y-8">
          <SectionHeader eyebrow={locale.blogEyebrow} title={locale.blogTitle} align="start" />
          <div class="grid gap-6 md:grid-cols-2">
            {latestPosts.map((post) => {
              const content = post.translations[lang];
              return (
                <Card key={post.id} className="h-full" variant="glass">
                  <div class="flex flex-col gap-4">
                    <img
                      src={post.coverImage}
                      alt={content.title}
                      class="h-40 w-full rounded-2xl object-cover"
                      loading="lazy"
                    />
                    <div class="flex items-center justify-between text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      <span>{post.category}</span>
                      <span>
                        {post.readTime} min · {post.date}
                      </span>
                    </div>
                    <h3 class="font-display text-lg font-semibold text-gray-900 dark:text-white">{content.title}</h3>
                    <p class="text-sm leading-7 text-gray-600 dark:text-gray-300">{content.excerpt}</p>
                    <a
                      href={`/${lang}/blog/${post.slug}`}
                      class="text-sm font-semibold text-brand-600 transition hover:text-brand-800 dark:text-accent-200 dark:hover:text-white"
                    >
                      {t(lang, 'readMore')} →
                    </a>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        <div class="space-y-8">
          <SectionHeader title={locale.faqTitle} align="start" />
          <Accordion items={locale.faqItems} />
        </div>
      </section>

      <section class="mt-20">
        <Card variant="glass" className="relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-brand-500/10 via-accent-400/10 to-brand-500/10" />
          <div class={`relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            <div class="max-w-xl space-y-3">
              <Badge tone="accent">{t(lang, 'contactTitle')}</Badge>
              <h3 class="font-display text-3xl font-bold text-gray-900 dark:text-white">{t(lang, 'contactSubtitle')}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {lang === 'en'
                  ? 'Share your markets, product roadmap, and growth ambitions—we will assemble the squad and diagnostics within 48 hours.'
                  : lang === 'fa'
                  ? 'بازارهای هدف، نقشه محصول و اهداف رشد خود را بگویید؛ ظرف ۴۸ ساعت تیم و آنالیز اولیه را آماده می‌کنیم.'
                  : 'أخبرنا عن الأسواق المستهدفة وخارطة المنتج وأهداف النمو، وسنجهز الفريق والتشخيص الأولي خلال ٤٨ ساعة.'}
              </p>
            </div>
            <Button href={`/${lang}/contact`} variant="primary" className="self-start">
              {t(lang, 'ctaButton')}
            </Button>
          </div>
        </Card>
      </section>
    </Layout>
  );
};
