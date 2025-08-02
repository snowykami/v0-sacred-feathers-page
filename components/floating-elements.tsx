"use client"

import type React from "react"

import { Crown, Feather, Star, Shield } from "lucide-react"
import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  icon: React.ReactNode
  x: number
  y: number
  delay: number
  duration: number
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const icons = [
      <Crown key="crown" className="h-6 w-6" />,
      <Feather key="feather" className="h-5 w-5" />,
      <Star key="star" className="h-4 w-4" />,
      <Shield key="shield" className="h-5 w-5" />,
    ]

    const newElements: FloatingElement[] = []
    for (let i = 0; i < 12; i++) {
      newElements.push({
        id: i,
        icon: icons[Math.floor(Math.random() * icons.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
      })
    }
    setElements(newElements)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute text-amber-400/20 animate-float"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`,
          }}
        >
          {element.icon}
        </div>
      ))}
    </div>
  )
}
