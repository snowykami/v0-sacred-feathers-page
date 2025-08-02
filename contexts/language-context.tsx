"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Language } from "@/data/empire-data"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh")

  useEffect(() => {
    // 从localStorage读取保存的语言设置
    const savedLanguage = localStorage.getItem("empire-language") as Language
    if (savedLanguage && ["zh", "en", "ja"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    } else {
      // 根据浏览器语言自动设置
      const browserLanguage = navigator.language.toLowerCase()
      if (browserLanguage.startsWith("zh")) {
        setLanguage("zh")
      } else if (browserLanguage.startsWith("ja")) {
        setLanguage("ja")
      } else {
        setLanguage("en")
      }
    }
  }, [])

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("empire-language", newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
