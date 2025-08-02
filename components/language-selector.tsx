"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Languages, ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"
import { SUPPORTED_LANGUAGES } from "@/data/empire-data"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const { resolvedTheme } = useTheme()
  const currentLanguage = SUPPORTED_LANGUAGES.find((lang) => lang.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`transition-all duration-300 relative group ${
            resolvedTheme === "dark"
              ? "text-white hover:text-amber-400 hover:bg-amber-400/10"
              : "text-slate-700 hover:text-amber-700 hover:bg-amber-100/50 border border-transparent hover:border-amber-200/50"
          }`}
        >
          <div className="flex items-center space-x-2">
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">{currentLanguage?.flag}</span>
            <span className="hidden md:inline font-medium">{currentLanguage?.name}</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div
            className={`absolute inset-0 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ${
              resolvedTheme === "dark" ? "bg-amber-400/10" : "bg-amber-100/50"
            }`}
          ></div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={`backdrop-blur-sm min-w-[160px] ${
          resolvedTheme === "dark" ? "bg-slate-900/95 border-amber-500/20" : "bg-white/95 border-amber-500/30 shadow-lg"
        }`}
        sideOffset={8}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center space-x-3 px-3 py-2 cursor-pointer transition-all duration-200 ${
              language === lang.code
                ? resolvedTheme === "dark"
                  ? "bg-amber-500/20 text-amber-400"
                  : "bg-amber-100/80 text-amber-700"
                : resolvedTheme === "dark"
                  ? "text-gray-300 hover:bg-amber-500/10 hover:text-amber-400"
                  : "text-slate-600 hover:bg-amber-50 hover:text-amber-700"
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
            {language === lang.code && (
              <div
                className={`ml-auto w-2 h-2 rounded-full ${resolvedTheme === "dark" ? "bg-amber-400" : "bg-amber-600"}`}
              ></div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
