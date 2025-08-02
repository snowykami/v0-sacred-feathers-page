"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useLanguage } from "@/contexts/language-context"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { language } = useLanguage()

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-foreground hover:text-amber-400 hover:bg-amber-400/10 transition-all duration-300 relative group"
        >
          <div className="flex items-center space-x-2">
            <CurrentIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{currentTheme?.label}</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          <div className="absolute inset-0 bg-amber-400/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm border-amber-500/20 min-w-[140px]">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon
          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className={`flex items-center space-x-3 px-3 py-2 cursor-pointer transition-all duration-200 ${
                theme === themeOption.value
                  ? "bg-amber-500/20 text-amber-400"
                  : "text-muted-foreground hover:bg-amber-500/10 hover:text-amber-400"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{themeOption.label}</span>
              {theme === themeOption.value && <div className="ml-auto w-2 h-2 bg-amber-400 rounded-full"></div>}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
