'use server';

import { client } from '../../sanity/lib/client';
import { Translations } from './LocalizationContext';

type TranslationItem = {
  key: string;
  label: {
    en: string;
    ru: string;
  };
};

export async function getServerTranslations(): Promise<Translations> {
  try {
    const query = `*[_type == "navigation"]{ key, label }`;
    const items: TranslationItem[] = await client.fetch(query);
    
    const translationsObj: Translations = {};
    items.forEach(item => {
      translationsObj[item.key] = item.label;
    });
    
    return translationsObj;
  } catch (error) {
    console.error("Failed to fetch translations on server:", error);
    // Fallback to hardcoded translations if Sanity fetch fails
    return {
      about: { en: "About", ru: "О Нас" },
      awards: { en: "Awards", ru: "Награды" },
      resume: { en: "Resume", ru: "Резюме" },
      contact: { en: "Contact", ru: "Контакты" },
      more: { en: "More", ru: "Еще" },
      writing: { en: "Writing", ru: "Статьи" },
      volunteering: { en: "Volunteering", ru: "Волонтерство" },
      testimonials: { en: "Testimonials", ru: "Отзывы" },
      copyEmail: { en: "Copy email", ru: "Копировать email" },
    };
  }
} 