"use client"

import { useTheme } from "@/contexts/theme-context"

export function GlowingOrb({ className = "" }: { className?: string }) {
  const { resolvedTheme } = useTheme()

  return (
    <div className={`relative ${className}`}>
      <div
        className={`absolute inset-0 rounded-full blur-xl animate-pulse ${
          resolvedTheme === "dark"
            ? "bg-gradient-to-r from-amber-400 to-amber-600 opacity-30"
            : "bg-gradient-to-r from-amber-500 to-amber-700 opacity-25"
        }`}
      ></div>
      <div
        className={`absolute inset-0 rounded-full blur-lg animate-ping ${
          resolvedTheme === "dark"
            ? "bg-gradient-to-r from-amber-500 to-amber-700 opacity-50"
            : "bg-gradient-to-r from-amber-600 to-amber-800 opacity-40"
        }`}
      ></div>
      <div
        className={`relative rounded-full ${
          resolvedTheme === "dark"
            ? "bg-gradient-to-r from-amber-400 to-amber-600"
            : "bg-gradient-to-r from-amber-500 to-amber-700"
        }`}
      ></div>
    </div>
  )
}
