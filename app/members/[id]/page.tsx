"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Mail, Github, ExternalLink, Twitter, Star, Trophy, Code, Target, Award } from "lucide-react"
import Link from "next/link"
import { ParticleBackground } from "@/components/particle-background"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ImageViewer } from "@/components/image-viewer"
import { useLanguage } from "@/contexts/language-context"
import { getEmpireData, formatDate } from "@/data/empire-data"
import { getMemberById, roleColors, type Member } from "@/data/members-data"
// Ensure roleColors includes "member" key in "@/data/members-data"
import type { Language } from "@/data/empire-data"

// Profile Hero Section Component
function ProfileHeroSection({ member, roleName, roleColor, language }: {
  member: Member
  roleName: string
  roleColor: string
  language: Language
}) {
  return (
    <section className="relative pt-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <Avatar className="h-32 w-32 mx-auto mb-6 ring-4 ring-amber-400/30">
                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback className="bg-gradient-to-br from-amber-400 to-amber-600 text-white text-3xl font-bold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text mb-4">
                {member.name}
              </h1>

              <Badge className={`bg-gradient-to-r ${roleColor} text-white text-lg px-4 py-2 mb-6`}>{roleName}</Badge>

              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">{member.bio?.[language]}</p>
            </div>
          </ScrollReveal>

          <MemberStatsSection member={member} language={language} />
        </div>
      </div>
    </section>
  )
}

// Member Stats Section Component
function MemberStatsSection({ member, language }: {
  member: Member
  language: Language
}) {
  return (
    <ScrollReveal delay={200}>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-slate-900/50 border-amber-500/20 text-center">
          <CardContent className="p-6">
            <Trophy className="h-8 w-8 text-amber-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-2">{member?.stats?.projectsLed}</div>
            <div className="text-gray-400">
              {language === "zh" ? "领导项目" : language === "ja" ? "リードプロジェクト" : "Projects Led"}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-amber-500/20 text-center">
          <CardContent className="p-6">
            <Code className="h-8 w-8 text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-2">{member?.stats?.contributionsCount}</div>
            <div className="text-gray-400">
              {language === "zh" ? "总贡献" : language === "ja" ? "総貢献" : "Contributions"}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-amber-500/20 text-center">
          <CardContent className="p-6">
            <Star className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-2">{member?.stats?.yearsActive}</div>
            <div className="text-gray-400">
              {language === "zh" ? "活跃年数" : language === "ja" ? "活動年数" : "Years Active"}
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollReveal>
  )
}

// Gallery Section Component
function MemberGallerySection({ member, empireData, language }: {
  member: Member
  empireData: any
  language: Language
}) {
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set())

  if (!member.pictures || member.pictures.length === 0) {
    return null
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
    setIsViewerOpen(true)
  }

  const handleImageError = (index: number) => {
    setFailedImages(prev => new Set(prev).add(index))
  }

  return (
    <>
      <section className="pb-10">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <Card className="bg-slate-900/50 border-amber-500/20 max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <span>{empireData.content.members.gallery || (language === "zh" ? "画廊" : language === "ja" ? "ギャラリー" : "Gallery")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {member.pictures.map((url, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg overflow-hidden border border-amber-400/20 bg-slate-800/40 cursor-pointer group relative"
                      onClick={() => handleImageClick(idx)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={failedImages.has(idx) ? "/placeholder.svg" : url}
                        alt={`Gallery image ${idx + 1}`}
                        className="w-full h-60 object-cover transition-transform duration-200 group-hover:scale-105"
                        onError={() => handleImageError(idx)}
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <div className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                          {language === "zh" ? "点击查看" : language === "ja" ? "クリックして表示" : "Click to view"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      <ImageViewer
        images={member.pictures}
        initialIndex={selectedImageIndex}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </>
  )
}

// Specialties Card Component
function SpecialtiesCard({ member, empireData }: {
  member: Member
  empireData: any
}) {
  return (
    <ScrollReveal>
      <Card className="bg-slate-900/50 border-amber-500/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Target className="h-6 w-6 text-amber-400" />
            <span>{empireData.content.members.specialties}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {member.specialties?.map((specialty, index) => (
              <Badge key={index} variant="outline" className="border-amber-400/30 text-amber-400">
                {specialty}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </ScrollReveal>
  )
}

// Join Date Card Component
function JoinDateCard({ member, empireData, language }: {
  member: Member
  empireData: any
  language: Language
}) {
  return (
    <ScrollReveal delay={100}>
      <Card className="bg-slate-900/50 border-amber-500/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Calendar className="h-6 w-6 text-amber-400" />
            <span>{empireData.content.members.joinDate}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 text-lg">{formatDate(member?.joinDate || "", language)}</p>
        </CardContent>
      </Card>
    </ScrollReveal>
  )
}

// Achievements Card Component
function AchievementsCard({ member, empireData }: {
  member: Member
  empireData: any
}) {
  return (
    <ScrollReveal delay={200}>
      <Card className="bg-slate-900/50 border-amber-500/20 md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Award className="h-6 w-6 text-amber-400" />
            <span>{empireData.content.members.achievements}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {member?.achievements?.map((achievement, index) => (
              <li key={index} className="flex items-start space-x-3">
                <Star className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{achievement}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </ScrollReveal>
  )
}

// Contact Card Component
function ContactCard({ member, empireData }: {
  member: Member
  empireData: any
}) {
  return (
    <ScrollReveal delay={300}>
      <Card className="bg-slate-900/50 border-amber-500/20 md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Mail className="h-6 w-6 text-amber-400" />
            <span>{empireData.content.members.contact}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {member.contact?.email && (
              <Button
                variant="outline"
                className="border-amber-400/30 text-amber-400 hover:bg-amber-400/10 bg-transparent"
                asChild
              >
                <a href={`mailto:${member.contact.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </a>
              </Button>
            )}
            {member.contact?.github && (
              <Button
                variant="outline"
                className="border-amber-400/30 text-amber-400 hover:bg-amber-400/10 bg-transparent"
                asChild
              >
                <a href={member.contact.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              </Button>
            )}
            {member.contact?.website && (
              <Button
                variant="outline"
                className="border-amber-400/30 text-amber-400 hover:bg-amber-400/10 bg-transparent"
                asChild
              >
                <a href={member.contact.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Website
                </a>
              </Button>
            )}
            {member.contact?.twitter && (
              <Button
                variant="outline"
                className="border-amber-400/30 text-amber-400 hover:bg-amber-400/10 bg-transparent"
                asChild
              >
                <a href={member.contact.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </ScrollReveal>
  )
}

// Member Details Section Component
function MemberDetailsSection({ member, empireData, language }: {
  member: Member
  empireData: any
  language: Language
}) {
  return (
    <section className="py-20 bg-slate-800/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <SpecialtiesCard member={member} empireData={empireData} />
          <JoinDateCard member={member} empireData={empireData} language={language} />
          <AchievementsCard member={member} empireData={empireData} />
          <ContactCard member={member} empireData={empireData} />
        </div>
      </div>
    </section>
  )
}

// Member Not Found Component
function MemberNotFound({ empireData, language }: {
  empireData: any
  language: Language
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          {language === "zh" ? "成员未找到" : language === "ja" ? "メンバーが見つかりません" : "Member Not Found"}
        </h1>
        <Link href="/members">
          <Button className="bg-amber-600 hover:bg-amber-700">{empireData.content.members.backToMembers}</Button>
        </Link>
      </div>
    </div>
  )
}

export default function MemberProfilePage() {
  const params = useParams()
  const { language } = useLanguage()
  const empireData = getEmpireData(language)

  const member = getMemberById(params.id as string)

  if (!member) {
    return <MemberNotFound empireData={empireData} language={language} />
  }

  const roleColor = roleColors[member.role] ?? "bg-gray-500"
  const roleName = empireData.content.members.roles[member.role] ?? member.role

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <ParticleBackground />

      <ProfileHeroSection
        member={member}
        roleName={roleName}
        roleColor={roleColor}
        language={language}
      />

      <MemberGallerySection
        member={member}
        empireData={empireData}
        language={language}
      />

      <MemberDetailsSection
        member={member}
        empireData={empireData}
        language={language}
      />
    </div>
  )
}
