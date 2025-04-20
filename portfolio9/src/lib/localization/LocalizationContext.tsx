"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { client } from '../../sanity/lib/client';
import { usePathname, useRouter } from 'next/navigation';

type Language = "en" | "ru";

type LocaleString = {
  en: string;
  ru: string;
};

type TranslationItem = {
  key: string;
  label: LocaleString;
};

type Translations = {
  [key: string]: LocaleString;
};

type LocalizationContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
};

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);
  
  const pathname = usePathname();
  const router = useRouter();

  // Detect language from URL
  useEffect(() => {
    if (pathname) {
      const segments = pathname.split('/').filter(Boolean);
      const potentialLocale = segments[0];
      
      if (potentialLocale === 'ru') {
        setLanguage('ru');
      } else {
        setLanguage('en');
      }
    }
  }, [pathname]);

  // This function now handles changing the URL as well
  const handleLanguageChange = (lang: Language) => {
    // Set cookie for middleware to use
    document.cookie = `language=${lang}; path=/; max-age=31536000`; // 1 year
    
    // Update local state
    setLanguage(lang);
    
    // Update localStorage for backward compatibility
    localStorage.setItem("language", lang);
    
    // Update URL if needed
    if (pathname) {
      const segments = pathname.split('/').filter(Boolean);
      let newPathname = pathname;
      
      if (segments[0] === 'ru' || segments[0] === 'en') {
        // URL already has a locale, replace it
        segments.shift();
        newPathname = segments.length > 0 ? `/${segments.join('/')}` : '/';
      }
      
      // Add new locale prefix if not English (default)
      if (lang !== 'en') {
        newPathname = `/${lang}${newPathname === '/' ? '' : newPathname}`;
      }
      
      // Push the new URL without a full page reload
      if (newPathname !== pathname) {
        router.push(newPathname);
      }
    }
  };

  // Fetch translations
  useEffect(() => {
    const fetchTranslations = async () => {
      setIsLoading(true);
      try {
        const query = `*[_type == "navigation"]{ key, label }`;
        const items: TranslationItem[] = await client.fetch(query);
        
        const translationsObj: Translations = {};
        items.forEach(item => {
          translationsObj[item.key] = item.label;
        });
        
        setTranslations(translationsObj);
      } catch (error) {
        console.error("Failed to fetch translations:", error);
        // Fallback to hardcoded translations if Sanity fetch fails
        setTranslations({
          about: { en: "About", ru: "О Нас" },
          awards: { en: "Awards", ru: "Награды" },
          resume: { en: "Resume", ru: "Резюме" },
          contact: { en: "Contact", ru: "Контакты" },
          more: { en: "More", ru: "Еще" },
          writing: { en: "Writing", ru: "Статьи" },
          volunteering: { en: "Volunteering", ru: "Волонтерство" },
          testimonials: { en: "Testimonials", ru: "Отзывы" },
          copyEmail: { en: "Copy email", ru: "Копировать email" },
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranslations();
  }, []);

  // Check localStorage on initial load (client-side only)
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ru")) {
      if (language !== savedLanguage) {
        handleLanguageChange(savedLanguage);
      }
    }
  }, []);

  const t = (key: string): string => {
    if (!translations[key]) {
      return key;
    }
    return translations[key][language] || key;
  };

  return (
    <LocalizationContext.Provider value={{ 
      language, 
      setLanguage: handleLanguageChange, 
      t, 
      isLoading 
    }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
};
