"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
}

export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="md:hidden p-2">
        <div className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="md:hidden p-2 text-white hover:text-amber-400 hover:bg-amber-400/10 transition-all duration-300 relative group"
      aria-label="Toggle menu"
    >
      <div className="w-6 h-6 flex flex-col justify-center items-center relative">
        {/* Top line */}
        <span
          className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        {/* Middle line */}
        <span
          className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out mt-1 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        {/* Bottom line */}
        <span
          className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out mt-1 ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </div>
      <div className="absolute inset-0 bg-amber-400/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
    </Button>
  )
}
