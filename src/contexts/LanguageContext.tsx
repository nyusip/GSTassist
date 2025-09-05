import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'gu';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<any>({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const en = await import('../locales/en.json');
        const hi = await import('../locales/hi.json');
        const gu = await import('../locales/gu.json');
        setTranslations({ en: en.default, hi: hi.default, gu: gu.default });
      } catch (error) {
        console.error("Failed to load translations:", error);
      }
    };
    loadTranslations();
  }, []);

  const t = (key: string): string => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        return key; 
      }
    }
    return result || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};