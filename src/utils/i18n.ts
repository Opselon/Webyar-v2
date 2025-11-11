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
    navServices: 'خدمات',
    navPricing: 'قیمت‌گذاری',
    navBlog: 'بلاگ',
    navContact: 'تماس',
    ctaButton: 'درخواست مشاوره',
    footerAbout: 'درباره ما',
    footerPrivacy: 'حریم خصوصی',
    footerTerms: 'شرایط خدمات',
    footerRights: 'تمامی حقوق محفوظ است.',
    // Home Page
    homepageTitle: 'آژانس سئو | خدمات حرفه‌ای بهینه‌سازی موتور جستجو',
    homeHeroTitle: 'آژانس سئو داده‌محور برای رشد واقعی کسب‌وکار شما',
    homeHeroSubtitle: 'متخصص در سئوی تکنیکال، استراتژی محتوا، و سئوی بین‌المللی.',
    homeHeroCtaPrimary: 'درخواست آنالیز رایگان',
    homeHeroCtaSecondary: 'مشاهده پلن‌ها',
    homeServicesTitle: 'خدمات ما',
    homePricingTitle: 'پلن‌های ما',
    homeCaseStudiesTitle: 'نمونه‌کارهای موفق',
    // Services Page
    servicesPageTitle: 'خدمات سئو',
    servicesTitle: 'خدمات سئو ۳۶۰ درجه',
    servicesSubtitle: 'از زیرساخت تا استراتژی محتوا، ما تمام جنبه‌های سئو را پوشش می‌دهیم.',
    // Pricing Page
    pricingPageTitle: 'قیمت‌گذاری سئو',
    pricingTitle: 'پلن‌های شفاف و منعطف',
    pricingSubtitle: 'ما معتقدیم سئو یک سرمایه‌گذاری بلندمدت است.',
    shortTermPackages: 'پکیج‌های کوتاه‌مدت',
    longTermPackages: 'پکیج‌های بلندمدت',
    // Blog Page
    blogPageTitle: 'بلاگ سئو',
    blogTitle: 'آخرین مقالات و تحلیل‌ها',
    // Case Studies Page
    caseStudiesPageTitle: 'نمونه‌کارها',
    caseStudiesTitle: 'نتایج واقعی برای مشتریان ما',
    caseStudyProblem: 'چالش',
    caseStudySolution: 'راهکار',
    caseStudyResults: 'نتایج',
    // Contact Page
    contactPageTitle: 'تماس با ما',
    contactTitle: 'بیایید صحبت کنیم',
    contactSubtitle: 'فرم زیر را پر کنید تا یک جلسه مشاوره رایگان داشته باشیم.',
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
    navServices: 'Services',
    navPricing: 'Pricing',
    navBlog: 'Blog',
    navContact: 'Contact',
    ctaButton: 'Request a Consultation',
    footerAbout: 'About Us',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
    footerRights: 'All rights reserved.',
    // Home Page
    homepageTitle: 'SEO Agency | Professional Search Engine Optimization Services',
    homeHeroTitle: 'Data-Driven SEO Agency for Real Business Growth',
    homeHeroSubtitle: 'Specializing in Technical SEO, Content Strategy, and International SEO.',
    homeHeroCtaPrimary: 'Request Free Analysis',
    homeHeroCtaSecondary: 'View Plans',
    homeServicesTitle: 'Our Services',
    homePricingTitle: 'Our Plans',
    homeCaseStudiesTitle: 'Successful Case Studies',
    // Services Page
    servicesPageTitle: 'SEO Services',
    servicesTitle: '360° SEO Services',
    servicesSubtitle: 'From infrastructure to content strategy, we cover all aspects of SEO.',
    // Pricing Page
    pricingPageTitle: 'SEO Pricing',
    pricingTitle: 'Transparent and Flexible Plans',
    pricingSubtitle: 'We believe SEO is a long-term investment.',
    shortTermPackages: 'Short-Term Packages',
    longTermPackages: 'Long-Term Packages',
    // Blog Page
    blogPageTitle: 'SEO Blog',
    blogTitle: 'Latest Articles and Insights',
    // Case Studies Page
    caseStudiesPageTitle: 'Case Studies',
    caseStudiesTitle: 'Real Results for Our Clients',
    caseStudyProblem: 'The Challenge',
    caseStudySolution: 'The Solution',
    caseStudyResults: 'The Results',
    // Contact Page
    contactPageTitle: 'Contact Us',
    contactTitle: 'Let\'s Talk',
    contactSubtitle: 'Fill out the form below for a free consultation.',
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
    navServices: 'الخدمات',
    navPricing: 'التسعير',
    navBlog: 'المدونة',
    navContact: 'اتصل',
    ctaButton: 'اطلب استشارة',
    footerAbout: 'معلومات عنا',
    footerPrivacy: 'سياسة الخصوصية',
    footerTerms: 'شروط الخدمة',
    footerRights: 'كل الحقوق محفوظة.',
    // Home Page
    homepageTitle: 'وكالة سيو | خدمات تحسين محركات البحث الاحترافية',
    homeHeroTitle: 'وكالة سيو تعتمد على البيانات لتحقيق نمو حقيقي للأعمال',
    homeHeroSubtitle: 'متخصصون في السيو التقني واستراتيجية المحتوى والسيو الدولي.',
    homeHeroCtaPrimary: 'اطلب تحليلًا مجانيًا',
    homeHeroCtaSecondary: 'عرض الخطط',
    homeServicesTitle: 'خدماتنا',
    homePricingTitle: 'خططنا',
    homeCaseStudiesTitle: 'دراسات حالة ناجحة',
    // Services Page
    servicesPageTitle: 'خدمات السيو',
    servicesTitle: 'خدمات سيو ٣٦٠ درجة',
    servicesSubtitle: 'من البنية التحتية إلى استراتيجية المحتوى، نغطي جميع جوانب السيو.',
    // Pricing Page
    pricingPageTitle: 'تسعير السيو',
    pricingTitle: 'خطط شفافة ومرنة',
    pricingSubtitle: 'نعتقد أن السيو استثمار طويل الأجل.',
    shortTermPackages: 'باقات قصيرة الأجل',
    longTermPackages: 'باقات طويلة الأجل',
    // Blog Page
    blogPageTitle: 'مدونة السيو',
    blogTitle: 'أحدث المقالات والرؤى',
    // Case Studies Page
    caseStudiesPageTitle: 'دراسات الحالة',
    caseStudiesTitle: 'نتائج حقيقية لعملائنا',
    caseStudyProblem: 'التحدي',
    caseStudySolution: 'الحل',
    caseStudyResults: 'النتائج',
    // Contact Page
    contactPageTitle: 'اتصل بنا',
    contactTitle: 'دعنا نتحدث',
    contactSubtitle: 'املأ النموذج أدناه للحصول على استشارة مجانية.',
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
