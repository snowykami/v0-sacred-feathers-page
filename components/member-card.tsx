"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Trophy, Code } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { getEmpireData, formatDate } from "@/data/empire-data"
import { roleColors, type Member } from "@/data/members-data"

interface MemberCardProps {
  member: Member
  variant?: "grid" | "list"
}


export function MemberCard({ member, variant = "grid" }: MemberCardProps) {
  const { language } = useLanguage()
  const empireData = getEmpireData(language)

  const roleColor = roleColors[member.role as keyof typeof roleColors] ?? "bg-gray-500"
  const roleName = empireData.content.members.roles[member.role as keyof typeof empireData.content.members.roles]

  if (variant === "list") {
    return (
      <Card className="bg-slate-900/50 border-amber-500/20 hover:border-amber-500/40 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/10 group backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 ring-2 ring-amber-400/30 group-hover:ring-amber-400/60 transition-all duration-300">
              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
              <AvatarFallback className="bg-gradient-to-br from-amber-400 to-amber-600 text-white text-lg font-bold">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-200 transition-colors duration-300">
                  {member.name}
                </h3>
                <Badge className={`bg-gradient-to-r ${roleColor} text-white shrink-0`}>{roleName}</Badge>
              </div>

              <p className="text-gray-400 mb-3 line-clamp-2 text-sm sm:text-base">{member.bio?.[language]}</p>

              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <div className="flex items-center gap-1 shrink-0">
                  <Calendar className="h-4 w-4" />
                  <span className="whitespace-nowrap">{member.joinDate ? formatDate(member.joinDate, language) : "-"}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Trophy className="h-4 w-4" />
                  <span className="whitespace-nowrap">
                    {member.stats?.projectsLed}{" "}
                    {language === "zh" ? "项目" : language === "ja" ? "プロジェクト" : "Projects"}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Code className="h-4 w-4" />
                  <span className="whitespace-nowrap">
                    {member.stats?.contributionsCount}{" "}
                    {language === "zh" ? "贡献" : language === "ja" ? "貢献" : "Contributions"}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-auto mt-3 sm:mt-0">
              <Link href={`/members/${member.id}`} className="block">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 bg-transparent"
                >
                  {empireData.content.members.viewProfile}
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-900/50 border-amber-500/20 hover:border-amber-500/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10 group backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <CardHeader className="text-center relative z-10">
        <Avatar className="h-24 w-24 mx-auto mb-4 ring-2 ring-amber-400/30 group-hover:ring-amber-400/60 transition-all duration-300">
          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
          <AvatarFallback className="bg-gradient-to-br from-amber-400 to-amber-600 text-white text-xl font-bold">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors duration-300 mb-2">
          {member.name}
        </h3>

        <div className="flex justify-center">
          <Badge className={`bg-gradient-to-r ${roleColor} text-white mb-3`}>{roleName}</Badge>
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{member.bio?.[language]}</p>

        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div>
            <div className="text-lg font-bold text-amber-400">{member.stats?.projectsLed}</div>
            <div className="text-xs text-gray-500">
              {language === "zh" ? "项目" : language === "ja" ? "プロジェクト" : "Projects"}
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-400">{member.stats?.contributionsCount}</div>
            <div className="text-xs text-gray-500">
              {language === "zh" ? "贡献" : language === "ja" ? "貢献" : "Contributions"}
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-400">{member.stats?.yearsActive}</div>
            <div className="text-xs text-gray-500">{language === "zh" ? "年" : language === "ja" ? "年" : "Years"}</div>
          </div>
        </div>

        <Link href={`/members/${member.id}`} className="block">
          <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white">
            {empireData.content.members.viewProfile}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
