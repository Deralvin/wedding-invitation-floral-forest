"use client";

import React, { createContext, useContext, useState, useSyncExternalStore } from "react";
import { id, LocaleTranslations } from "@/locales/id";
import { en } from "@/locales/en";

type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: LocaleTranslations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "id",
  setLanguage: () => {},
  t: id,
});

const emptySubscribe = () => () => {};

export function LanguageProvider({
  children,
  initialLanguage = "id",
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const [manualLang, setManualLang] = useState<Language | null>(null);

  const urlLang = useSyncExternalStore(
    emptySubscribe,
    () => {
      if (typeof window === "undefined") return null;
      const params = new URLSearchParams(window.location.search);
      const p = params.get("lang");
      return p === "en" || p === "id" ? (p as Language) : null;
    },
    () => null
  );

  const language = manualLang ?? urlLang ?? initialLanguage;

  const setLanguage = (lang: Language) => {
    setManualLang(lang);
  };

  const t = language === "en" ? en : id;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
