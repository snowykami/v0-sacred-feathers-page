"use client"

export function GlowingOrb({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full blur-lg opacity-50 animate-ping"></div>
      <div className="relative bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
    </div>
  )
}
