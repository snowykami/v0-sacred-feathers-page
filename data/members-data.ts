import type { Language } from "./empire-data"
import MEMBERS_DATA_JSON from "./members-data.json"

export const MEMBERS_DATA: Member[] = MEMBERS_DATA_JSON as Member[]


export interface Member {
  id: string
  name: string
  avatar: string
  role: "emperor" | "minister" | "guardian" | "creator" | "explorer" | "prince" | "princess" | "catgirl" | "mascot" | "member" | "medic"
  labels?: string[]
  joinDate?: string
  specialties?: string[]
  achievements?: string[]
  contact?: {
    email?: string
    github?: string
    website?: string
    twitter?: string
  }
  bio?: Record<Language, string>
  stats?: {
    projectsLed: number
    contributionsCount: number
    yearsActive: number
  }
  isActive?: boolean
  pictures?: string[]
}

export const roleColors = {
  emperor: "from-amber-500 to-amber-600",
  minister: "from-blue-500 to-blue-600",
  guardian: "from-green-500 to-green-600",
  creator: "from-purple-500 to-purple-600",
  explorer: "from-indigo-500 to-indigo-600",
  prince: "from-pink-500 to-pink-600",
  princess: "from-rose-500 to-rose-600",
  catgirl: "from-teal-500 to-teal-600",
  mascot: "from-rose-300 to-rose-400",
  member: "from-gray-500 to-gray-600",
  medic: "from-teal-500 to-cyan-400"
}



export function getMemberById(id: string): Member | undefined {
  return MEMBERS_DATA.find((member) => member.id === id)
}

export function getMembersByRole(role: Member["role"]): Member[] {
  return MEMBERS_DATA.filter((member) => member.role === role)
}

export function getActiveMembersCount(): number {
  return MEMBERS_DATA.filter((member) => member.isActive).length
}
