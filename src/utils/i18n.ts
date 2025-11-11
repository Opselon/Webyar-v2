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
    homepageTitle: 'صفحه اصلی',
  },
  en: {
    greeting: 'Hello World!',
    homepageTitle: 'Homepage',
  },
  ar: {
    greeting: 'مرحبا بالعالم!',
    homepageTitle: 'الصفحة الرئيسية',
  },
};

export const t = (lang: Language, key: keyof (typeof translations)[Language]) => {
    return translations[lang][key] || translations[defaultLang][key];
}
