"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    {
      value: "light" as const,
      label: language === "zh" ? "浅色" : language === "ja" ? "ライト" : "Light",
      icon: Sun,
    },
    {
      value: "dark" as const,
      label: language === "zh" ? "深色" : language === "ja" ? "ダーク" : "Dark",
      icon: Moon,
    },
    {
      value: "system" as const,
      label: language === "zh" ? "跟随系统" : language === "ja" ? "システム" : "System",
      icon: Monitor,
    },
  ]

  const currentTheme = themes.find((t) => t.value === theme)
  const CurrentIcon = currentTheme?.icon || Monitor

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
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
            <CurrentIcon className="h-4 w-4" />
            <span className="hidden sm:inline font-medium">{currentTheme?.label}</span>
            <ChevronDown
              className={`h-3 w-3 transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`}
            />
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
        className={`backdrop-blur-sm min-w-[140px] ${
          resolvedTheme === "dark" ? "bg-slate-900/95 border-amber-500/20" : "bg-white/95 border-amber-500/30 shadow-lg"
        }`}
        sideOffset={8}
      >
        {themes.map((themeOption) => {
          const Icon = themeOption.icon
          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className={`flex items-center space-x-3 px-3 py-2 cursor-pointer transition-all duration-200 ${
                theme === themeOption.value
                  ? resolvedTheme === "dark"
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-amber-100/80 text-amber-700"
                  : resolvedTheme === "dark"
                    ? "text-gray-300 hover:bg-amber-500/10 hover:text-amber-400"
                    : "text-slate-600 hover:bg-amber-50 hover:text-amber-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{themeOption.label}</span>
              {theme === themeOption.value && (
                <div
                  className={`ml-auto w-2 h-2 rounded-full ${
                    resolvedTheme === "dark" ? "bg-amber-400" : "bg-amber-600"
                  }`}
                ></div>
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
