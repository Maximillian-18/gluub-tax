"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import enDeCalc from "@/messages/en-de-calc.json";
import deCalc from "@/messages/de-calc.json";
import enDkCalc from "@/messages/en-dk-calc.json";
import daCalc from "@/messages/da-calc.json";

type Language = "en" | "de" | "da";
type Translations = Record<string, unknown>;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Translations> = {
  en: enDeCalc,
  de: deCalc,
  da: daCalc,
};

const dkTranslations: Record<Language, Translations> = {
  en: enDkCalc,
  de: deCalc,
  da: daCalc,
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({
  children,
  defaultLanguage = "en",
  calculator = "germany",
}: {
  children: ReactNode;
  defaultLanguage?: Language;
  calculator?: "germany" | "denmark";
}) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const translationSet = calculator === "denmark" ? dkTranslations : translations;

  useEffect(() => {
    const key = `calculator-${calculator}-language`;
    const saved = localStorage.getItem(key);
    if (saved && (saved === "en" || saved === "de" || saved === "da")) {
      setLanguage(saved as Language);
    }
  }, [calculator]);

  useEffect(() => {
    const key = `calculator-${calculator}-language`;
    localStorage.setItem(key, language);
  }, [language, calculator]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown = translationSet[language];
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    
    return typeof value === "string" ? value : key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export type { Language };
