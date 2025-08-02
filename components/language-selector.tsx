"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Languages, ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { SUPPORTED_LANGUAGES } from "@/data/empire-data"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const currentLanguage = SUPPORTED_LANGUAGES.find((lang) => lang.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-amber-400 hover:bg-amber-400/10 transition-all duration-300 relative group"
        >
          <div className="flex items-center space-x-2">
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">{currentLanguage?.flag}</span>
            <span className="hidden md:inline">{currentLanguage?.name}</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className="absolute inset-0 bg-amber-400/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-900/95 backdrop-blur-sm border-amber-500/20 min-w-[160px]">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center space-x-3 px-3 py-2 cursor-pointer transition-all duration-200 ${
              language === lang.code
                ? "bg-amber-500/20 text-amber-400"
                : "text-gray-300 hover:bg-amber-500/10 hover:text-amber-400"
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
            {language === lang.code && <div className="ml-auto w-2 h-2 bg-amber-400 rounded-full"></div>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
