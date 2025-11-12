// src/utils/i18n.ts

export type Language = 'fa' | 'en' | 'ar';

export interface LanguageDetails {
  code: Language;
  dir: 'rtl' | 'ltr';
  name: string;
}

export const languages: Record<Language, LanguageDetails> = {
  fa: { code: 'fa', dir: 'rtl', name: 'فارسی' },
  en: { code: 'en', dir: 'ltr', name: 'English' },
  ar: { code: 'ar', dir: 'rtl', name: 'العربية' },
};

export const defaultLang: Language = 'fa';

export const getLangDetails = (lang: string): LanguageDetails | undefined => {
  return languages[lang as Language];
};

export const translations = {
  fa: {
    // General
    greeting: 'سلام دنیا!',
    learnMore: 'بیشتر بدانید',
    readMore: 'ادامه مطلب',
    viewPlans: 'مشاهده پلن‌ها',
    viewCaseStudy: 'مشاهده نمونه کار',
    // Layout
    skipToContent: 'پرش به محتوای اصلی',
    navHome: 'خانه',
    navServices: 'خدمات',
    navCaseStudies: 'نمونه‌کارها',
    navPricing: 'قیمت‌گذاری',
    navBlog: 'بلاگ',
    navFaq: 'سوالات متداول',
    navContact: 'تماس',
    headerCTA: 'درخواست جلسه مشاوره',
    footerHeading: 'به رشد ارگانیک قابل پیش‌بینی سلام کنید',
    footerTagline: 'Quantum SEO Labs شریک استراتژیک برندهای داده‌محور برای مقیاس جهانی، ورود به بازارهای جدید و تجربه دیجیتال بهتر است.',
    footerCTA: 'شروع همکاری',
    footerNavigation: 'مسیرهای کلیدی',
    footerContact: 'تماس با تیم',
    footerPhone: '+98 21 8888 0000',
    footerEnterpriseDesk: 'میز پشتیبانی مشتریان سازمانی',
    footerAbout: 'درباره ما',
    footerPrivacy: 'حریم خصوصی',
    footerTerms: 'شرایط خدمات',
    footerRights: 'تمامی حقوق محفوظ است.',
    // Home Page
    homepageTitle: 'آژانس سئو | خدمات حرفه‌ای بهینه‌سازی موتور جستجو',
    homepageDescription: 'آژانس سئو کوانتوم خدمات حرفه‌ای بهینه‌سازی موتور جستجو را برای کسب‌وکارهای بزرگ ارائه می‌دهد. با ما به صفحه اول گوگل برسید.',
    homeHeroTitle: 'آژانس سئو داده‌محور برای رشد واقعی کسب‌وکار شما',
    homeHeroSubtitle: 'ما تیم‌های بازاریابی و محصول را با بینش تحلیلی، مهندسی سئو و محتوا به رشد پایدار متصل می‌کنیم.',
    homeHeroCtaPrimary: 'درخواست آنالیز رایگان',
    homeHeroCtaSecondary: 'مشاهده پلن‌ها',
    homeServicesTitle: 'خدمات ما',
    homePricingTitle: 'پلن‌های ما',
    homeCaseStudiesTitle: 'نمونه‌کارهای موفق',
    // Services Page
    servicesPageTitle: 'خدمات سئو',
    servicesPageDescription: 'با خدمات جامع سئو ما، از سئو تکنیکال و بین‌المللی تا استراتژی محتوا و لینک‌سازی، رتبه سایت خود را بهبود دهید.',
    servicesTitle: 'خدمات سئو ۳۶۰ درجه',
    servicesSubtitle: 'از زیرساخت تا استراتژی محتوا، ما تمام جنبه‌های سئو را پوشش می‌دهیم.',
    // Pricing Page
    pricingPageTitle: 'قیمت‌گذاری سئو',
    pricingPageDescription: 'پلن‌های قیمت‌گذاری شفاف و منطعف سئو برای کسب‌وکارهای کوچک و بزرگ. بهترین پکیج را متناسب با نیاز خود انتخاب کنید.',
    pricingTitle: 'پلن‌های شفاف و منعطف',
    pricingSubtitle: 'ما معتقدیم سئو یک سرمایه‌گذاری بلندمدت است.',
    shortTermPackages: 'پکیج‌های کوتاه‌مدت',
    longTermPackages: 'پکیج‌های بلندمدت',
    // Blog Page
    blogPageTitle: 'بلاگ سئو',
    blogPageDescription: 'آخرین مقالات، تحلیل‌ها و اخبار دنیای سئو را در بلاگ ما بخوانید. از متخصصان سئو بیاموزید.',
    blogTitle: 'آخرین مقالات و تحلیل‌ها',
    // Case Studies Page
    caseStudiesPageTitle: 'نمونه‌کارها',
    caseStudiesPageDescription: 'نمونه‌کارهای موفق ما در زمینه سئو را ببینید. ما به کسب‌وکارهای مختلف کمک کرده‌ایم تا به نتایج دلخواه خود برسند.',
    caseStudiesTitle: 'نتایج واقعی برای مشتریان ما',
    caseStudyProblem: 'چالش',
    caseStudySolution: 'راهکار',
    caseStudyResults: 'نتایج',
    caseStudiesFiltersTitle: 'فیلتر پروژه‌ها',
    // FAQ Page
    faqPageTitle: 'سوالات متداول سئو',
    faqPageDescription: 'پاسخ به سوالات متداول در مورد سئو، خدمات ما، قیمت‌گذاری و فرآیندهای کاری.',
    // Contact Page
    contactPageTitle: 'تماس با ما',
    contactPageDescription: 'برای دریافت مشاوره رایگان سئو و یا ثبت سفارش، با تیم متخصص ما در تماس باشید.',
    contactTitle: 'بیایید صحبت کنیم',
    contactSubtitle: 'فرم زیر را پر کنید تا یک جلسه مشاوره رایگان داشته باشیم.',
    ctaButton: 'درخواست جلسه استراتژی',
    formName: 'نام',
    formEmail: 'ایمیل',
    formWebsite: 'وب‌سایت',
    formMessage: 'پیام شما',
    formSubmit: 'ارسال',
  },
  en: {
    // General
    greeting: 'Hello World!',
    learnMore: 'Learn More',
    readMore: 'Read More',
    viewPlans: 'View Plans',
    viewCaseStudy: 'View Case Study',
    // Layout
    skipToContent: 'Skip to main content',
    navHome: 'Home',
    navServices: 'Services',
    navCaseStudies: 'Case Studies',
    navPricing: 'Pricing',
    navBlog: 'Blog',
    navFaq: 'FAQ',
    navContact: 'Contact',
    headerCTA: 'Book a strategy session',
    footerHeading: 'Unlock predictable organic growth',
    footerTagline: 'Quantum SEO Labs partners with data-driven brands to scale globally, enter new markets, and elevate digital experiences.',
    footerCTA: 'Start a partnership',
    footerNavigation: 'Key journeys',
    footerContact: 'Talk to us',
    footerPhone: '+44 20 3000 1200',
    footerEnterpriseDesk: 'Enterprise success desk',
    footerAbout: 'About Us',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
    footerRights: 'All rights reserved.',
    // Home Page
    homepageTitle: 'SEO Agency | Professional Search Engine Optimization Services',
    homepageDescription: 'Quantum SEO Agency offers professional search engine optimization services for large businesses. Get to the first page of Google with us.',
    homeHeroTitle: 'Data-Driven SEO Agency for Real Business Growth',
    homeHeroSubtitle: 'We connect marketing and product teams with analytics insight, technical SEO, and content engines built for scale.',
    homeHeroCtaPrimary: 'Request Free Analysis',
    homeHeroCtaSecondary: 'View Plans',
    homeServicesTitle: 'Our Services',
    homePricingTitle: 'Our Plans',
    homeCaseStudiesTitle: 'Successful Case Studies',
    // Services Page
    servicesPageTitle: 'SEO Services',
    servicesPageDescription: 'Improve your website ranking with our comprehensive SEO services, from technical and international SEO to content strategy and link building.',
    servicesTitle: '360° SEO Services',
    servicesSubtitle: 'From infrastructure to content strategy, we cover all aspects of SEO.',
    // Pricing Page
    pricingPageTitle: 'SEO Pricing',
    pricingPageDescription: 'Transparent and flexible SEO pricing plans for small and large businesses. Choose the best package for your needs.',
    pricingTitle: 'Transparent and Flexible Plans',
    pricingSubtitle: 'We believe SEO is a long-term investment.',
    shortTermPackages: 'Short-Term Packages',
    longTermPackages: 'Long-Term Packages',
    // Blog Page
    blogPageTitle: 'SEO Blog',
    blogPageDescription: 'Read the latest articles, analysis, and news from the SEO world on our blog. Learn from SEO experts.',
    blogTitle: 'Latest Articles and Insights',
    // Case Studies Page
    caseStudiesPageTitle: 'Case Studies',
    caseStudiesPageDescription: 'See our successful SEO case studies. We have helped various businesses achieve their desired results.',
    caseStudiesTitle: 'Real Results for Our Clients',
    caseStudyProblem: 'The Challenge',
    caseStudySolution: 'The Solution',
    caseStudyResults: 'The Results',
    caseStudiesFiltersTitle: 'Filter projects',
    // FAQ Page
    faqPageTitle: 'SEO FAQ',
    faqPageDescription: 'Answers to frequently asked questions about SEO, our services, pricing, and work processes.',
    // Contact Page
    contactPageTitle: 'Contact Us',
    contactPageDescription: 'Contact our expert team for a free SEO consultation or to place an order.',
    contactTitle: "Let's Talk",
    contactSubtitle: 'Fill out the form below for a free consultation.',
    ctaButton: 'Book a strategy session',
    formName: 'Name',
    formEmail: 'Email',
    formWebsite: 'Website',
    formMessage: 'Your Message',
    formSubmit: 'Submit',
  },
  ar: {
    // General
    greeting: 'مرحبا بالعالم!',
    learnMore: 'اعرف المزيد',
    readMore: 'اقرأ المزيد',
    viewPlans: 'عرض الخطط',
    viewCaseStudy: 'عرض دراسة الحالة',
    // Layout
    skipToContent: 'تخطي إلى المحتوى الرئيسي',
    navHome: 'الرئيسية',
    navServices: 'الخدمات',
    navCaseStudies: 'دراسات الحالة',
    navPricing: 'التسعير',
    navBlog: 'المدونة',
    navFaq: 'الأسئلة الشائعة',
    navContact: 'اتصل',
    headerCTA: 'احجز جلسة استراتيجية',
    footerHeading: 'افتح باب النمو العضوي الموثوق',
    footerTagline: 'شراكتنا في Quantum SEO Labs مع العلامات المعتمدة على البيانات تمكّنها من التوسع عالميًا ودخول أسواق جديدة وتحسين التجربة الرقمية.',
    footerCTA: 'ابدأ الشراكة',
    footerNavigation: 'روابط أساسية',
    footerContact: 'تواصل معنا',
    footerPhone: '+971 4 555 2100',
    footerEnterpriseDesk: 'مكتب دعم المؤسسات',
    footerAbout: 'معلومات عنا',
    footerPrivacy: 'سياسة الخصوصية',
    footerTerms: 'شروط الخدمة',
    footerRights: 'كل الحقوق محفوظة.',
    // Home Page
    homepageTitle: 'وكالة سيو | خدمات تحسين محركات البحث الاحترافية',
    homepageDescription: 'تقدم وكالة كوانتوم للسيو خدمات تحسين محركات البحث الاحترافية للشركات الكبيرة. معنا، تصل إلى الصفحة الأولى في جوجل.',
    homeHeroTitle: 'وكالة سيو تعتمد على البيانات لتحقيق نمو حقيقي للأعمال',
    homeHeroSubtitle: 'نربط فرق التسويق والمنتج برؤى تحليلية وهندسة سيو ومحتوى قابل للتوسع.',
    homeHeroCtaPrimary: 'اطلب تحليلًا مجانيًا',
    homeHeroCtaSecondary: 'عرض الخطط',
    homeServicesTitle: 'خدماتنا',
    homePricingTitle: 'خططنا',
    homeCaseStudiesTitle: 'دراسات حالة ناجحة',
    // Services Page
    servicesPageTitle: 'خدمات السيو',
    servicesPageDescription: 'حسّن ترتيب موقعك مع خدماتنا الشاملة للسيو، من السيو التقني والدولي إلى استراتيجية المحتوى وبناء الروابط.',
    servicesTitle: 'خدمات سيو ٣٦٠ درجة',
    servicesSubtitle: 'من البنية التحتية إلى استراتيجية المحتوى، نغطي جميع جوانب السيو.',
    // Pricing Page
    pricingPageTitle: 'تسعير السيو',
    pricingPageDescription: 'خطط أسعار سيو شفافة ومرنة للشركات الصغيرة والكبيرة. اختر الباقة الأنسب لاحتياجاتك.',
    pricingTitle: 'خطط شفافة ومرنة',
    pricingSubtitle: 'نعتقد أن السيو استثمار طويل الأجل.',
    shortTermPackages: 'باقات قصيرة الأجل',
    longTermPackages: 'باقات طويلة الأجل',
    // Blog Page
    blogPageTitle: 'مدونة السيو',
    blogPageDescription: 'اقرأ أحدث المقالات والتحليلات والأخبار من عالم السيو على مدونتنا. تعلم من خبراء السيو.',
    blogTitle: 'أحدث المقالات والرؤى',
    // Case Studies Page
    caseStudiesPageTitle: 'دراسات الحالة',
    caseStudiesPageDescription: 'شاهد دراسات الحالة الناجحة في مجال السيو. لقد ساعدنا العديد من الشركات على تحقيق النتائج المرجوة.',
    caseStudiesTitle: 'نتائج حقيقية لعملائنا',
    caseStudyProblem: 'التحدي',
    caseStudySolution: 'الحل',
    caseStudyResults: 'النتائج',
    caseStudiesFiltersTitle: 'تصفية المشاريع',
    // FAQ Page
    faqPageTitle: 'أسئلة شائعة حول السيو',
    faqPageDescription: 'إجابات على الأسئلة الشائعة حول السيو، خدماتنا، الأسعار، وعمليات العمل.',
    // Contact Page
    contactPageTitle: 'اتصل بنا',
    contactPageDescription: 'تواصل مع فريق خبرائنا للحصول على استشارة مجانية في السيو أو لتقديم طلب.',
    contactTitle: 'دعنا نتحدث',
    contactSubtitle: 'املأ النموذج أدناه للحصول على استشارة مجانية.',
    ctaButton: 'احجز جلسة استراتيجية',
    formName: 'الاسم',
    formEmail: 'البريد الإلكتروني',
    formWebsite: 'الموقع الإلكتروني',
    formMessage: 'رسالتك',
    formSubmit: 'إرسال',
  },
};

export const t = (lang: Language, key: keyof (typeof translations)[Language]) => {
  return translations[lang][key] || translations[defaultLang][key];
};
