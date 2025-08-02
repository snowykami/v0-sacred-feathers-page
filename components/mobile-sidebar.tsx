"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Feather, Home, Shield, Trophy, Scroll, Users, Heart, X } from "lucide-react"
import { GlowingOrb } from "@/components/glowing-orb"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"
import { getEmpireData } from "@/data/empire-data"
import { NAVIGATION_DATA, getNavigationLabel } from "@/data/navigation-data"

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const iconMap = {
  Home,
  Shield,
  Trophy,
  Scroll,
  Users,
  Heart,
} as const

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const { language } = useLanguage()
  const empireData = getEmpireData(language)

  // 防止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // ESC键关闭侧边栏
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-slate-900/80 backdrop-blur-sm border-l border-amber-500/20 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-500/20">
          <div className="flex items-center space-x-3 group">
            <div className="relative transform transition-all duration-300 group-hover:scale-110">
              <GlowingOrb className="w-10 h-10" />
              <Crown className="absolute inset-0 m-auto h-6 w-6 text-white z-10" />
              <Feather className="h-3 w-3 text-amber-200 absolute -top-1 -right-1 animate-bounce" />
            </div>
            <div className="transform transition-all duration-300 group-hover:translate-x-1">
              <h1 className="text-lg font-bold text-white bg-gradient-to-r from-current to-amber-200 bg-clip-text text-transparent">
                {empireData.name.english}
              </h1>
              <p className="text-xs text-amber-400 animate-pulse">{empireData.name.chinese}</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:text-amber-400 hover:bg-amber-400/10 transition-all duration-300 p-2"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 py-8">
          <div className="space-y-2">
            {NAVIGATION_DATA.items.map((item, index) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap]
              const label = getNavigationLabel(item.id, language)

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="flex items-center space-x-4 px-4 py-3 rounded-lg text-white hover:text-amber-400 hover:bg-amber-400/10 transition-all duration-300 group relative overflow-hidden"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen ? "slideInRight 0.3s ease-out forwards" : "none",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center space-x-4 w-full">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-lg flex items-center justify-center group-hover:from-amber-500/30 group-hover:to-amber-600/30 transition-all duration-300">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{label}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Settings */}
        <div className="px-6 py-4 border-t border-amber-500/20 space-y-4">
          {/* Language Selector */}
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">
              {language === "zh" ? "语言" : language === "ja" ? "言語" : "Language"}
            </span>
            <LanguageSelector />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-amber-500/20">
          <div className="text-center">
            <Badge variant="outline" className="border-amber-400/30 text-amber-400 text-xs">
              {empireData.content.footer.tagline}
            </Badge>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}
