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
import Link from "next/link"
import { ParticleBackground } from "@/components/particle-background"
import { FloatingElements } from "@/components/floating-elements"
import { ScrollReveal } from "@/components/scroll-reveal"
import { GlowingOrb } from "@/components/glowing-orb"
import { useEffect, useState } from "react"
import {
  EMPIRE_DATA,
  calculateDaysSinceFounding,
  formatDate,
  getCopyrightYears,
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [daysSinceFounding, setDaysSinceFounding] = useState(0)
  const [copyrightYears, setCopyrightYears] = useState("2024")

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // 计算建国天数和版权年份
    setDaysSinceFounding(calculateDaysSinceFounding())
    setCopyrightYears(getCopyrightYears())

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // 更新成就数据中的建国天数
  const updatedAchievements = EMPIRE_DATA.achievements.map((achievement) =>
    achievement.label === "建国天数" ? { ...achievement, number: daysSinceFounding.toString() } : achievement,
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Cursor glow effect */}
      <div
        className="fixed w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none transition-all duration-300 ease-out z-0"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Header */}
      <header className="border-b border-amber-500/20 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent"></div>
        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group">
              <div className="relative transform transition-all duration-300 group-hover:scale-110">
                <GlowingOrb className="w-10 h-10" />
                <Crown className="absolute inset-0 m-auto h-6 w-6 text-white z-10" />
                <Feather className="h-3 w-3 text-amber-200 absolute -top-1 -right-1 animate-bounce" />
              </div>
              <div className="transform transition-all duration-300 group-hover:translate-x-1">
                <h1 className="text-xl font-bold text-white bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                  {EMPIRE_DATA.name.english}
                </h1>
                <p className="text-xs text-amber-400 animate-pulse">{EMPIRE_DATA.name.chinese}</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              {["关于帝国", "帝国成就", "历史", "加入我们"].map((item, index) => (
                <Link
                  key={item}
                  href={`#${["about", "achievements", "history", "join"][index]}`}
                  className="text-white hover:text-amber-400 transition-all duration-300 relative group px-2 py-1"
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-amber-400/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <FloatingElements />

        {/* Animated background gradients */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-transparent animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-3xl animate-ping"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="flex justify-center mb-8">
                <div className="relative group">
                  <GlowingOrb className="w-32 h-32" />
                  <Crown className="absolute inset-0 m-auto h-16 w-16 text-white z-10 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-white rounded-full flex items-center justify-center transform transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-2">
                    <Feather className="h-7 w-7 text-amber-600 animate-bounce" />
                  </div>
                  <Sparkles className="absolute -bottom-2 -left-2 h-8 w-8 text-amber-400 animate-spin" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text mb-4 tracking-tight animate-gradient">
                {EMPIRE_DATA.name.english}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <h2 className="text-3xl md:text-4xl text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text mb-8 font-light animate-gradient">
                {EMPIRE_DATA.name.chinese}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={500}>
              <div className="flex items-center justify-center space-x-2 mb-8">
                <Calendar className="h-5 w-5 text-amber-400" />
                <span className="text-amber-300 text-lg">建立于 {formatDate(EMPIRE_DATA.foundingDate)}</span>
                <span className="text-gray-400 text-sm">({getRelativeTime(EMPIRE_DATA.foundingDate)})</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                在虚拟世界中崛起的神圣帝国，以智慧与荣耀为基石，
                <br />
                用羽毛般轻盈的梦想承载着无限的可能
              </p>
            </ScrollReveal>

            <ScrollReveal delay={800}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-10 py-4 text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25 group relative overflow-hidden"
                  onClick={() => window.open(EMPIRE_DATA.contact.github, "_blank")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <Crown className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                  探索帝国
                  <ExternalLink className="ml-2 h-5 w-5 group-hover:animate-pulse" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 px-10 py-4 text-lg bg-transparent backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25 group relative overflow-hidden"
                  onClick={() => (window.location.href = `mailto:${EMPIRE_DATA.contact.email}`)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <Mail className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                  加入帝国
                  <Heart className="ml-2 h-5 w-5 group-hover:animate-ping" />
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/50 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-transparent bg-gradient-to-r from-white to-amber-200 bg-clip-text mb-6">
                帝国简介
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6 rounded-full"></div>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
                神圣羽毛帝国是一个充满创意与梦想的虚拟王国，致力于构建和谐、智慧、繁荣的数字文明
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {EMPIRE_DATA.about.map((item, index) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap]
              return (
                <ScrollReveal key={index} delay={index * 200}>
                  <Card className="bg-slate-900/50 border-amber-500/20 hover:border-amber-500/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10 group backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardHeader className="relative z-10">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-white text-xl group-hover:text-amber-200 transition-colors duration-300">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
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
      <section id="achievements" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl animate-ping"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-transparent bg-gradient-to-r from-white to-amber-200 bg-clip-text mb-6">
                帝国成就
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6 rounded-full"></div>
              <p className="text-gray-400 text-xl">见证神圣羽毛帝国的辉煌历程</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {updatedAchievements.map((item, index) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap]
              return (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="text-center p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10 group backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10`}
                    >
                      <IconComponent className="h-10 w-10 text-white" />
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
                    </div>
                    <h3 className="text-4xl font-bold text-transparent bg-gradient-to-r from-white to-amber-200 bg-clip-text mb-3 relative z-10">
                      {item.number}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 relative z-10">
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
      <section id="history" className="py-20 bg-slate-800/50 backdrop-blur-sm relative">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-transparent bg-gradient-to-r from-white to-amber-200 bg-clip-text mb-6">
                帝国历史
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6 rounded-full"></div>
              <p className="text-gray-400 text-xl">追溯神圣羽毛帝国的光辉足迹</p>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 via-blue-400 to-purple-400"></div>

            <div className="space-y-12">
              {EMPIRE_DATA.history.map((item, index) => {
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
                            <span>{formatDate(item.date)}</span>
                            <span className="text-gray-500">({getRelativeTime(item.date)})</span>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-200 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
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
      <section id="join" className="py-20 relative overflow-hidden">
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
                <h2 className="text-5xl font-bold text-transparent bg-gradient-to-r from-white to-amber-200 bg-clip-text mb-6">
                  加入神圣羽毛帝国
                </h2>
                <p className="text-2xl text-gray-400 mb-12 leading-relaxed">
                  成为帝国公民，与我们一起在虚拟世界中创造无限可能
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {EMPIRE_DATA.citizenRoles.map((role, index) => {
                const IconComponent = iconMap[role.icon as keyof typeof iconMap]
                return (
                  <ScrollReveal key={index} delay={index * 100}>
                    <div className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10 group backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${role.color} rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-lg animate-pulse"></div>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-amber-200 transition-colors duration-300 relative z-10">
                        {role.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed relative z-10">
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
                onClick={() => (window.location.href = `mailto:${EMPIRE_DATA.contact.email}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <Mail className="mr-3 h-8 w-8 group-hover:animate-bounce" />
                立即加入帝国
                <Zap className="ml-3 h-6 w-6 group-hover:animate-ping" />
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-amber-500/20 bg-slate-900/90 backdrop-blur-sm py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <ScrollReveal>
              <div className="flex items-center space-x-4 mb-8 md:mb-0 group">
                <div className="relative">
                  <GlowingOrb className="w-12 h-12" />
                  <Crown className="absolute inset-0 m-auto h-7 w-7 text-white z-10 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
                  <Feather className="h-4 w-4 text-amber-200 absolute -top-1 -right-1 animate-bounce" />
                </div>
                <div className="transform transition-all duration-300 group-hover:translate-x-1">
                  <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-white to-amber-200 bg-clip-text">
                    {EMPIRE_DATA.name.english}
                  </h3>
                  <p className="text-sm text-amber-400 animate-pulse">{EMPIRE_DATA.name.chinese}</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="text-center md:text-right">
                <p className="text-gray-400 text-lg mb-3 bg-gradient-to-r from-gray-400 to-amber-400 bg-clip-text text-transparent">
                  在虚拟世界中创造无限可能
                </p>
                <p className="text-gray-500 text-sm">© {copyrightYears} Sacred Feathers Empire. All rights reserved.</p>
              </div>
            </ScrollReveal>
          </div>
          {/* Disclaimer */}
          <ScrollReveal delay={400}>
            <div className="mt-12 pt-8 border-t border-amber-500/10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-amber-500/10">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-400/20 to-amber-600/20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-amber-400 text-sm">⚠️</span>
                    </div>
                    <h4 className="text-amber-400 font-semibold text-lg">免责声明</h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-2">
                    本"神圣羽毛帝国"(Sacred Feathers Empire) 为纯虚拟组织和创意项目， 仅用于娱乐、学习和创作目的。
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    本项目与现实世界的任何政治组织、政府机构或政治活动无关，
                    不涉及任何真实的政治主张、领土声明或政治立场。 所有内容均为虚构，请勿与现实政治混淆。
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </div>
  )
}
