"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Crown,
  Feather,
  Shield,
  Users,
  Trophy,
  Scroll,
  Star,
  Globe,
  Sparkles,
  Zap,
  Heart,
  Calendar,
  ExternalLink,
  Mail,
} from "lucide-react"
import { ParticleBackground } from "@/components/particle-background"
import { FloatingElements } from "@/components/floating-elements"
import { ScrollReveal } from "@/components/scroll-reveal"
import { GlowingOrb } from "@/components/glowing-orb"
import { QRCodeModal } from "@/components/qr-code-modal"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import {
  getEmpireData,
  calculateDaysSinceFounding,
  formatDate,
  getRelativeTime,
} from "@/data/empire-data"


// 图标映射
const iconMap = {
  Shield,
  Feather,
  Globe,
  Trophy,
  Star,
  Crown,
  Scroll,
  Users,
} as const

export default function SacredFeathersEmpire() {
  const { language } = useLanguage()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [daysSinceFounding, setDaysSinceFounding] = useState(0)
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)

  const empireData = getEmpireData(language)

  useEffect(() => {
    // 计算建国天数
    setDaysSinceFounding(calculateDaysSinceFounding())

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, []) // Empty dependency array to run only once

  // 更新成就数据中的建国天数
  const updatedAchievements = empireData.content.achievements.items.map((achievement) =>
    achievement.label.includes("Days") || achievement.label.includes("天数") || achievement.label.includes("日数")
      ? { ...achievement, number: daysSinceFounding.toString() }
      : achievement,
  )

  return (
    <div className="min-h-screen bg-empire-gradient relative overflow-hidden">
      {/* Cursor glow effect */}
      <div
        className="fixed w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none z-0"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <FloatingElements />

        {/* Animated background gradients */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-transparent animate-pulse dark:opacity-100 light:opacity-30"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-3xl animate-ping"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="flex justify-center mb-8">
                <div className="relative group">
                  <GlowingOrb className="w-32 h-32" />
                  <Crown className="absolute inset-0 m-auto h-16 w-16 text-empire-primary z-10 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-white dark:bg-white light:bg-amber-100 rounded-full flex items-center justify-center transform transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-2">
                    <Feather className="h-7 w-7 text-amber-600 animate-bounce" />
                  </div>
                  <Sparkles className="absolute -bottom-2 -left-2 h-8 w-8 text-amber-400 animate-spin" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h1 className="text-6xl md:text-8xl font-bold text-empire-title-gradient mb-4 tracking-tight animate-gradient">
                {empireData.name.english}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <h2 className="text-3xl md:text-4xl text-empire-subtitle-gradient mb-8 font-light animate-gradient">
                {empireData.content.hero.subtitle}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={500}>
              <div className="flex items-center justify-center space-x-2 mb-8">
                <Calendar className="h-5 w-5 text-amber-400" />
                <span className="text-amber-400 text-lg">
                  {empireData.content.hero.foundedOn} {formatDate(empireData.foundingDate, language)}
                </span>
                <span className="text-empire-muted text-sm">
                  ({getRelativeTime(empireData.foundingDate, language)})
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <p className="text-xl md:text-2xl text-empire-secondary mb-12 leading-relaxed max-w-3xl mx-auto">
                {empireData.content.hero.description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={800}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-10 py-4 text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25 group relative overflow-hidden"
                  onClick={() => window.open(empireData.contact.github, "_blank")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <Crown className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                  {empireData.content.hero.exploreButton}
                  <ExternalLink className="ml-2 h-5 w-5 group-hover:animate-pulse" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 button-text-primary hover:bg-amber-400 hover:text-slate-900 px-10 py-4 text-lg bg-transparent backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25 group relative overflow-hidden border-amber-400"
                  onClick={() => setIsQRModalOpen(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <Mail className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                  {empireData.content.hero.joinButton}
                  <Heart className="ml-2 h-5 w-5 group-hover:animate-ping" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 button-text-primary hover:bg-blue-400 hover:text-slate-900 px-10 py-4 text-lg bg-transparent backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 group relative overflow-hidden border-blue-400"
                  onClick={() => window.open("https://lab.liteyuki.org/@sf_empire", "_blank")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <ExternalLink className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                  {empireData.content.hero.labButton}
                  <Star className="ml-2 h-5 w-5 group-hover:animate-spin" />
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-slate-800/50 dark:bg-slate-800/50 light:bg-white/50 backdrop-blur-sm relative scroll-mt-20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-empire-section-gradient mb-6">{empireData.content.about.title}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6 rounded-full"></div>
              <p className="text-empire-muted text-xl max-w-3xl mx-auto leading-relaxed">
                {empireData.content.about.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {empireData.content.about.items.map((item, index) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap]
              return (
                <ScrollReveal key={index} delay={index * 200}>
                  <Card className="bg-empire-card hover-empire-card transition-all duration-500 transform hover:scale-105 group backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardHeader className="relative z-10">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-empire-primary text-xl group-hover:text-amber-400 transition-colors duration-300">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-empire-muted group-hover:text-empire-secondary transition-colors duration-300 leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl animate-ping"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-empire-section-gradient mb-6">
                {empireData.content.achievements.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6 rounded-full"></div>
              <p className="text-empire-muted text-xl">{empireData.content.achievements.subtitle}</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {updatedAchievements.map((item, index) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap]
              return (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="text-center p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/80 dark:from-slate-900/80 dark:to-slate-800/80 light:from-white/90 light:to-gray-50/90 rounded-2xl border border-amber-500/20 hover-empire-card transition-all duration-500 transform hover:scale-105 group backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10`}
                    >
                      <IconComponent className="h-10 w-10 text-white" />
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
                    </div>
                    <h3 className="text-4xl font-bold text-empire-primary mb-3 relative z-10">{item.number}</h3>
                    <p className="text-empire-muted group-hover:text-empire-secondary transition-colors duration-300 relative z-10">
                      {item.label}
                    </p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced History Timeline */}
      <section
        id="history"
        className="py-20 bg-slate-800/50 dark:bg-slate-800/50 light:bg-white/50 backdrop-blur-sm relative scroll-mt-20"
      >
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-empire-section-gradient mb-6">
                {empireData.content.history.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6 rounded-full"></div>
              <p className="text-empire-muted text-xl">{empireData.content.history.subtitle}</p>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 timeline-gradient"></div>

            <div className="space-y-12">
              {empireData.content.history.items.map((item, index) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap]
                return (
                  <ScrollReveal key={index} delay={index * 200}>
                    <div className="flex items-start space-x-6 group">
                      <div
                        className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 relative z-10`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-lg animate-pulse"></div>
                      </div>
                      <div className="flex-1 transform transition-all duration-500 group-hover:translate-x-2">
                        <div className="flex items-center space-x-3 mb-3">
                          <Badge
                            className={`bg-gradient-to-r ${item.color} text-white transform transition-all duration-300 group-hover:scale-105`}
                          >
                            {item.badge}
                          </Badge>
                          <div className="flex items-center space-x-2 text-amber-400 text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(item.date, language)}</span>
                            <span className="text-empire-muted">({getRelativeTime(item.date, language)})</span>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-empire-primary mb-3 group-hover:text-amber-400 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-empire-muted group-hover:text-empire-secondary transition-colors duration-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Join Section */}
      <section id="join" className="py-20 relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="mb-12">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mb-8 relative group">
                  <Crown className="h-12 w-12 text-white transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
                  <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-amber-300 animate-spin" />
                </div>
                <h2 className="text-5xl font-bold text-empire-section-gradient mb-6">
                  {empireData.content.join.title}
                </h2>
                <p className="text-2xl text-empire-muted mb-12 leading-relaxed">{empireData.content.join.subtitle}</p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {empireData.content.join.roles.map((role, index) => {
                const IconComponent = iconMap[role.icon as keyof typeof iconMap]
                return (
                  <ScrollReveal key={index} delay={index * 100}>
                    <div className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/80 dark:from-slate-900/80 dark:to-slate-800/80 light:from-white/90 light:to-gray-50/90 rounded-2xl border border-amber-500/20 hover-empire-card transition-all duration-500 transform hover:scale-105 group backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${role.color} rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-lg animate-pulse"></div>
                      </div>
                      <h3 className="text-xl font-semibold text-empire-primary mb-4 group-hover:text-amber-400 transition-colors duration-300 relative z-10">
                        {role.title}
                      </h3>
                      <p className="text-empire-muted group-hover:text-empire-secondary transition-colors duration-300 leading-relaxed relative z-10">
                        {role.description}
                      </p>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>

            <ScrollReveal delay={400}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:via-amber-600 hover:to-amber-700 text-white px-16 py-6 text-xl transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-amber-500/25 group relative overflow-hidden animate-gradient"
                onClick={() => setIsQRModalOpen(true)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <Mail className="mr-3 h-8 w-8 group-hover:animate-bounce" />
                {empireData.content.join.button}
                <Zap className="ml-3 h-6 w-6 group-hover:animate-ping" />
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        title={empireData.content.join.title} // Use the title from the empire data
        qrCodeUrl="/qrcode.jpg"
        description={empireData.content.join.qrDescription} // Use the description from the empire data
      />
    </div>
  )
}
