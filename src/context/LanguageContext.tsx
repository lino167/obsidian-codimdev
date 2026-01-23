import React, { createContext, useContext, useState, ReactNode } from 'react'
import { translations } from '@/constants/translations'

type Language = 'pt' | 'en'
export type Translations = typeof translations.pt

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
)

export { LanguageContext }

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pt')

  const value = {
    language,
    setLanguage,
    t: translations[language] as Translations,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
