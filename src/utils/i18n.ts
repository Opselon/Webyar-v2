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
    greeting: 'سلام دنیا!',
    homepageTitle: 'آژانس سئو | خدمات حرفه‌ای بهینه‌سازی موتور جستجو',
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
  },
  en: {
    greeting: 'Hello World!',
    homepageTitle: 'SEO Agency | Professional Search Engine Optimization Services',
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
  },
  ar: {
    greeting: 'مرحبا بالعالم!',
    homepageTitle: 'وكالة سيو | خدمات تحسين محركات البحث الاحترافية',
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
  },
};

export const t = (lang: Language, key: keyof (typeof translations)[Language]) => {
  return translations[lang][key] || translations[defaultLang][key];
};
