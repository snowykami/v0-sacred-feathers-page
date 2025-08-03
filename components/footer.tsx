"use client"

import { Crown, Feather } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { GlowingOrb } from "@/components/glowing-orb"
import { useLanguage } from "@/contexts/language-context"
import { getEmpireData, getCopyrightYears } from "@/data/empire-data"
import { useEffect, useState } from "react"

export function Footer() {
  const { language } = useLanguage()
  const [copyrightYears, setCopyrightYears] = useState("2024")
  const empireData = getEmpireData(language)

  useEffect(() => {
    setCopyrightYears(getCopyrightYears())
  }, [])

  return (
    <footer className="border-t border-amber-500/20 backdrop-empire py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <ScrollReveal>
            <div className="flex items-center space-x-4 mb-8 md:mb-0 group">
              <div className="relative">
                <GlowingOrb className="w-12 h-12" />
                <Crown className="absolute inset-0 m-auto h-7 w-7 text-empire-primary z-10 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
                <Feather className="h-4 w-4 text-amber-200 absolute -top-1 -right-1 animate-bounce" />
              </div>
              <div className="transform transition-all duration-300 group-hover:translate-x-1">
                <h3 className="text-xl font-bold text-empire-primary">{empireData.name.english}</h3>
                <p className="text-sm text-amber-400 animate-pulse">{empireData.name.chinese}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="text-center md:text-right">
              <p className="text-empire-muted text-lg mb-3">{empireData.content.footer.tagline}</p>
              <p className="text-empire-muted text-sm">
                © {copyrightYears} Sacred Feathers Empire. All rights reserved.
              </p>
            </div>
          </ScrollReveal>
        </div>
        
        {/* Disclaimer */}
        <ScrollReveal delay={400}>
          <div className="mt-12 pt-8 border-t border-amber-500/10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-slate-800/30 dark:bg-slate-800/30 light:bg-gray-100/50 backdrop-blur-sm rounded-lg p-6 border border-amber-500/10">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-400/20 to-amber-600/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-amber-400 text-sm">⚠️</span>
                  </div>
                  <h4 className="text-amber-400 font-semibold text-lg">
                    {empireData.content.footer.disclaimer.title}
                  </h4>
                </div>
                {empireData.content.footer.disclaimer.content.map((text, index) => (
                  <p
                    key={index}
                    className={`${index === 0 ? "text-empire-muted text-sm" : "text-empire-muted text-xs opacity-80"} leading-relaxed ${index < empireData.content.footer.disclaimer.content.length - 1 ? "mb-2" : ""}`}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}