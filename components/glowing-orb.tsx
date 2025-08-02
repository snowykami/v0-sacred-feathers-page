"use client"

export function GlowingOrb({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-full blur-xl animate-pulse bg-gradient-to-r from-amber-400 to-amber-600 opacity-30"></div>
      <div className="absolute inset-0 rounded-full blur-lg animate-ping bg-gradient-to-r from-amber-500 to-amber-700 opacity-50"></div>
      <div className="relative rounded-full bg-gradient-to-r from-amber-400 to-amber-600"></div>
    </div>
  )
}
