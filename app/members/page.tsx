"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Crown, Feather, Search, Users, Grid, List } from "lucide-react"
import Link from "next/link"
import { ParticleBackground } from "@/components/particle-background"
import { ScrollReveal } from "@/components/scroll-reveal"
import { GlowingOrb } from "@/components/glowing-orb"
import { LanguageSelector } from "@/components/language-selector"
import { MemberCard } from "@/components/member-card"
import { useLanguage } from "@/contexts/language-context"
import { getEmpireData } from "@/data/empire-data"
import { MEMBERS_DATA, getActiveMembersCount } from "@/data/members-data"
import type { Member } from "@/data/members-data"

export default function MembersPage() {
  const { language } = useLanguage()
  const empireData = getEmpireData(language)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<Member["role"] | "all">("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredMembers = MEMBERS_DATA.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.bio[language].toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || member.role === selectedRole
    return matchesSearch && matchesRole && member.isActive
  })

  const roles: Array<{ key: Member["role"] | "all"; label: string; count: number }> = [
    {
      key: "all",
      label: language === "zh" ? "全部" : language === "ja" ? "全て" : "All",
      count: getActiveMembersCount(),
    },
    {
      key: "emperor",
      label: empireData.content.members.roles.emperor,
      count: MEMBERS_DATA.filter((m) => m.role === "emperor" && m.isActive).length,
    },
    {
      key: "minister",
      label: empireData.content.members.roles.minister,
      count: MEMBERS_DATA.filter((m) => m.role === "minister" && m.isActive).length,
    },
    {
      key: "guardian",
      label: empireData.content.members.roles.guardian,
      count: MEMBERS_DATA.filter((m) => m.role === "guardian" && m.isActive).length,
    },
    {
      key: "creator",
      label: empireData.content.members.roles.creator,
      count: MEMBERS_DATA.filter((m) => m.role === "creator" && m.isActive).length,
    },
    {
      key: "explorer",
      label: empireData.content.members.roles.explorer,
      count: MEMBERS_DATA.filter((m) => m.role === "explorer" && m.isActive).length,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <ParticleBackground />

      {/* Header */}
      <header className="border-b border-amber-500/20 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent"></div>
        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative transform transition-all duration-300 group-hover:scale-110">
                <GlowingOrb className="w-10 h-10" />
                <Crown className="absolute inset-0 m-auto h-6 w-6 text-white z-10" />
                <Feather className="h-3 w-3 text-amber-200 absolute -top-1 -right-1 animate-bounce" />
              </div>
              <div className="transform transition-all duration-300 group-hover:translate-x-1">
                <h1 className="text-xl font-bold text-white bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                  {empireData.name.english}
                </h1>
                <p className="text-xs text-amber-400 animate-pulse">{empireData.name.chinese}</p>
              </div>
            </Link>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  href="/"
                  className="text-white hover:text-amber-400 transition-all duration-300 relative group px-2 py-1"
                >
                  <span className="relative z-10">
                    {language === "zh" ? "首页" : language === "ja" ? "ホーム" : "Home"}
                  </span>
                  <div className="absolute inset-0 bg-amber-400/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Link>
                <Link href="/members" className="text-amber-400 relative group px-2 py-1">
                  <span className="relative z-10">{empireData.content.members.title}</span>
                  <div className="absolute inset-0 bg-amber-400/20 rounded-lg"></div>
                </Link>
              </nav>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="flex justify-center mb-8">
                <div className="relative group">
                  <GlowingOrb className="w-24 h-24" />
                  <Users className="absolute inset-0 m-auto h-12 w-12 text-white z-10 transform transition-all duration-500 group-hover:scale-110" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text mb-6 tracking-tight">
                {empireData.content.members.title}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
                {empireData.content.members.subtitle}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder={
                  language === "zh" ? "搜索成员..." : language === "ja" ? "メンバーを検索..." : "Search members..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-900/50 border-amber-500/20 text-white placeholder-gray-400 focus:border-amber-500/40"
              />
            </div>

            {/* Role Filter */}
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <Button
                  key={role.key}
                  variant={selectedRole === role.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRole(role.key)}
                  className={
                    selectedRole === role.key
                      ? "bg-amber-600 hover:bg-amber-700 text-white"
                      : "border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
                  }
                >
                  {role.label} ({role.count})
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
                }
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
                }
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Members Grid/List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-20">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl text-gray-400 mb-2">
                {language === "zh"
                  ? "未找到匹配的成员"
                  : language === "ja"
                    ? "一致するメンバーが見つかりません"
                    : "No members found"}
              </h3>
              <p className="text-gray-500">
                {language === "zh"
                  ? "尝试调整搜索条件或筛选器"
                  : language === "ja"
                    ? "検索条件やフィルターを調整してみてください"
                    : "Try adjusting your search terms or filters"}
              </p>
            </div>
          ) : (
            <div
              className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : "space-y-6"}
            >
              {filteredMembers.map((member, index) => (
                <ScrollReveal key={member.id} delay={index * 100}>
                  <MemberCard member={member} variant={viewMode} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-500/20 bg-slate-900/90 backdrop-blur-sm py-8 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 Sacred Feathers Empire. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
