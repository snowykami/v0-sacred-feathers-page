"use client"

import { useState } from "react"
import Link from "next/link"
import { Crown, Feather } from "lucide-react"
import { GlowingOrb } from "@/components/glowing-orb"
import { LanguageSelector } from "@/components/language-selector"
import { MobileMenuButton } from "@/components/mobile-menu-button"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { useLanguage } from "@/contexts/language-context"
import { getEmpireData } from "@/data/empire-data"
import { NAVIGATION_DATA, getNavigationLabel } from "@/data/navigation-data"

interface NavigationHeaderProps {
  currentPath?: string
}

export function NavigationHeader({ currentPath = "/" }: NavigationHeaderProps) {
  const { language } = useLanguage()
  const empireData = getEmpireData(language)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="border-b border-amber-500/20 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent"></div>
        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative transform transition-all duration-300 group-hover:scale-110">
                <GlowingOrb className="w-10 h-10" />
                <Crown className="absolute inset-0 m-auto h-6 w-6 text-white z-10" />
                <Feather className="h-3 w-3 text-amber-200 absolute -top-1 -right-1 animate-bounce" />
              </div>
              <div className="transform transition-all duration-300 group-hover:translate-x-1">
                <h1 className="text-xl font-bold text-white">{empireData.name.english}</h1>
                <p className="text-xs text-amber-400 animate-pulse">{empireData.name.chinese}</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-6">
                {NAVIGATION_DATA.items.slice(1).map((item) => {
                  const label = getNavigationLabel(item.id, language)
                  const isActive = currentPath === item.href || (item.href !== "/" && currentPath.startsWith(item.href))
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`transition-all duration-300 relative group px-2 py-1 ${
                        isActive ? "text-amber-400" : "text-white hover:text-amber-400"
                      }`}
                    >
                      <span className="relative z-10">{label}</span>
                      <div
                        className={`absolute inset-0 rounded-lg transition-transform duration-300 ${
                          isActive ? "bg-amber-400/20 scale-100" : "bg-amber-400/10 scale-0 group-hover:scale-100"
                        }`}
                      ></div>
                    </Link>
                  )
                })}
              </nav>

              {/* Language Selector */}
              <div className="hidden md:block">
                <LanguageSelector />
              </div>

              {/* Mobile Menu Button */}
              <MobileMenuButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  )
}
