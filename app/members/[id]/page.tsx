"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Mail, Github, ExternalLink, Twitter, Star, Trophy, Code, Target, Award } from "lucide-react"
import Link from "next/link"
import { ParticleBackground } from "@/components/particle-background"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useLanguage } from "@/contexts/language-context"
import { getEmpireData, formatDate } from "@/data/empire-data"
import { getMemberById, roleColors } from "@/data/members-data"

export default function MemberProfilePage() {
  const params = useParams()
  const { language } = useLanguage()
  const empireData = getEmpireData(language)

  const member = getMemberById(params.id as string)

  if (!member) {
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

  const roleColor = roleColors[member.role]
  const roleName = empireData.content.members.roles[member.role]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <ParticleBackground />

      {/* Profile Hero */}
      <section className="relative py-20 overflow-hidden">
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

                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">{member.bio[language]}</p>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={200}>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-slate-900/50 border-amber-500/20 text-center">
                  <CardContent className="p-6">
                    <Trophy className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-2">{member.stats.projectsLed}</div>
                    <div className="text-gray-400">
                      {language === "zh" ? "领导项目" : language === "ja" ? "リードプロジェクト" : "Projects Led"}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-amber-500/20 text-center">
                  <CardContent className="p-6">
                    <Code className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-2">{member.stats.contributionsCount}</div>
                    <div className="text-gray-400">
                      {language === "zh" ? "总贡献" : language === "ja" ? "総貢献" : "Contributions"}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-amber-500/20 text-center">
                  <CardContent className="p-6">
                    <Star className="h-8 w-8 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-2">{member.stats.yearsActive}</div>
                    <div className="text-gray-400">
                      {language === "zh" ? "活跃年数" : language === "ja" ? "活動年数" : "Years Active"}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Specialties */}
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
                    {member.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="border-amber-400/30 text-amber-400">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Join Date */}
            <ScrollReveal delay={100}>
              <Card className="bg-slate-900/50 border-amber-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Calendar className="h-6 w-6 text-amber-400" />
                    <span>{empireData.content.members.joinDate}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-lg">{formatDate(member.joinDate, language)}</p>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Achievements */}
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
                    {member.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Star className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Contact */}
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
                    {member.contact.email && (
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
                    {member.contact.github && (
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
                    {member.contact.website && (
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
                    {member.contact.twitter && (
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
          </div>
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
