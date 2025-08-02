"use client"

import { Button } from "@/components/ui/button"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Languages, ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { SUPPORTED_LANGUAGES } from "@/data/empire-data"
import { useState } from "react"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const currentLanguage = SUPPORTED_LANGUAGES.find((lang) => lang.code === language)

  return (
    <DropdownMenu.Root onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-amber-400 hover:bg-amber-400/10 transition-all duration-300 relative group"
        >
          <div className="flex items-center space-x-2">
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">{currentLanguage?.flag}</span>
            <span className="hidden md:inline font-medium">{currentLanguage?.name}</span>
            <ChevronDown
              className={`h-3 w-3 transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`}
            />
          </div>
          <div className="absolute inset-0 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 bg-amber-400/10"></div>
        </Button>
      </DropdownMenu.Trigger>
      
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="backdrop-blur-sm min-w-[160px] bg-slate-900/95 border border-amber-500/20 rounded-md shadow-lg p-1 z-50"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <DropdownMenu.Item
              key={lang.code}
              onSelect={() => setLanguage(lang.code)}
              className={`flex items-center space-x-3 px-3 py-2 cursor-pointer transition-all duration-200 rounded-sm outline-none ${
                language === lang.code
                  ? "bg-amber-500/20 text-amber-400"
                  : "text-gray-300 hover:bg-amber-500/10 hover:text-amber-400 focus:bg-amber-500/10 focus:text-amber-400"
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
              {language === lang.code && <div className="ml-auto w-2 h-2 rounded-full bg-amber-400"></div>}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
