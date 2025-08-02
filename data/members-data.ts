import type { Language } from "./empire-data"

export interface Member {
  id: string
  name: string
  avatar: string
  role: "emperor" | "minister" | "guardian" | "creator" | "explorer"
  joinDate: string
  specialties: string[]
  achievements: string[]
  contact: {
    email?: string
    github?: string
    website?: string
    twitter?: string
  }
  bio: Record<Language, string>
  stats: {
    projectsLed: number
    contributionsCount: number
    yearsActive: number
  }
  isActive: boolean
}

export const MEMBERS_DATA: Member[] = [
  {
    id: "emperor-phoenix",
    name: "Phoenix Emperor",
    avatar: "/placeholder.svg?height=200&width=200",
    role: "emperor",
    joinDate: "2024-02-18",
    specialties: ["Leadership", "Strategic Planning", "Vision Setting"],
    achievements: [
      "Founded Sacred Feathers Empire",
      "Established Digital Civilization Framework",
      "United 1000+ Citizens",
    ],
    contact: {
      email: "emperor@sacredfeathers.online",
      github: "https://github.com/phoenix-emperor",
      website: "https://phoenix-emperor.dev",
    },
    bio: {
      zh: "神圣羽毛帝国的创始人和最高统治者，拥有卓越的领导才能和远见卓识。致力于在虚拟世界中建立一个和谐、创新的数字文明。",
      en: "Founder and supreme ruler of Sacred Feathers Empire, possessing exceptional leadership skills and visionary insight. Dedicated to building a harmonious and innovative digital civilization in the virtual world.",
      ja: "聖なる羽根帝国の創設者であり最高統治者。卓越したリーダーシップと先見の明を持ち、仮想世界で調和のとれた革新的なデジタル文明の構築に専念している。",
    },
    stats: {
      projectsLed: 15,
      contributionsCount: 500,
      yearsActive: 1,
    },
    isActive: true,
  },
  {
    id: "minister-sage",
    name: "Sage Minister",
    avatar: "/placeholder.svg?height=200&width=200",
    role: "minister",
    joinDate: "2024-03-01",
    specialties: ["Knowledge Management", "Education", "Cultural Development"],
    achievements: ["Established Empire Library", "Created Learning Pathways", "Mentored 200+ Citizens"],
    contact: {
      email: "sage@sacredfeathers.online",
      github: "https://github.com/sage-minister",
    },
    bio: {
      zh: "帝国的智慧大臣，负责知识管理和文化发展。拥有深厚的学识和丰富的教学经验，致力于提升帝国公民的整体素质。",
      en: "The empire's wise minister responsible for knowledge management and cultural development. Possesses profound knowledge and rich teaching experience, dedicated to improving the overall quality of empire citizens.",
      ja: "帝国の賢明な大臣で、知識管理と文化発展を担当。深い学識と豊富な教育経験を持ち、帝国市民の総合的な資質向上に専念している。",
    },
    stats: {
      projectsLed: 8,
      contributionsCount: 350,
      yearsActive: 1,
    },
    isActive: true,
  },
  {
    id: "guardian-steel",
    name: "Steel Guardian",
    avatar: "/placeholder.svg?height=200&width=200",
    role: "guardian",
    joinDate: "2024-03-15",
    specialties: ["Security", "Community Protection", "Conflict Resolution"],
    achievements: ["Maintained 100% Peace Index", "Resolved 50+ Disputes", "Protected Empire Integrity"],
    contact: {
      email: "guardian@sacredfeathers.online",
      github: "https://github.com/steel-guardian",
    },
    bio: {
      zh: "帝国的钢铁守护者，负责维护社区安全和秩序。以公正和勇气著称，是帝国和平与稳定的坚实保障。",
      en: "The empire's steel guardian responsible for maintaining community security and order. Known for justice and courage, serving as a solid guarantee for the empire's peace and stability.",
      ja: "帝国の鋼鉄の守護者で、コミュニティの安全と秩序の維持を担当。正義と勇気で知られ、帝国の平和と安定の確固たる保証となっている。",
    },
    stats: {
      projectsLed: 5,
      contributionsCount: 280,
      yearsActive: 1,
    },
    isActive: true,
  },
  {
    id: "creator-nova",
    name: "Nova Creator",
    avatar: "/placeholder.svg?height=200&width=200",
    role: "creator",
    joinDate: "2024-04-01",
    specialties: ["Digital Art", "UI/UX Design", "Creative Direction"],
    achievements: ["Designed Empire Visual Identity", "Created 100+ Digital Artworks", "Led Creative Workshops"],
    contact: {
      email: "nova@sacredfeathers.online",
      github: "https://github.com/nova-creator",
      website: "https://nova-art.studio",
    },
    bio: {
      zh: "帝国的首席创造者，拥有无限的创意和艺术天赋。负责帝国的视觉设计和创意项目，为帝国注入了独特的艺术气息。",
      en: "The empire's chief creator with unlimited creativity and artistic talent. Responsible for the empire's visual design and creative projects, infusing the empire with unique artistic atmosphere.",
      ja: "帝国の主任創造者で、無限の創造性と芸術的才能を持つ。帝国のビジュアルデザインと創造的プロジェクトを担当し、帝国に独特の芸術的雰囲気を注入している。",
    },
    stats: {
      projectsLed: 12,
      contributionsCount: 420,
      yearsActive: 1,
    },
    isActive: true,
  },
  {
    id: "explorer-cosmos",
    name: "Cosmos Explorer",
    avatar: "/placeholder.svg?height=200&width=200",
    role: "explorer",
    joinDate: "2024-05-01",
    specialties: ["Research", "Innovation", "Technology Scouting"],
    achievements: ["Discovered 20+ New Technologies", "Mapped Virtual Territories", "Led Exploration Missions"],
    contact: {
      email: "cosmos@sacredfeathers.online",
      github: "https://github.com/cosmos-explorer",
      twitter: "https://twitter.com/cosmos_explorer",
    },
    bio: {
      zh: "帝国的宇宙探索者，永远在寻找新的可能性和机遇。负责技术研究和创新探索，为帝国的发展开辟新的道路。",
      en: "The empire's cosmos explorer, always seeking new possibilities and opportunities. Responsible for technology research and innovation exploration, opening new paths for the empire's development.",
      ja: "帝国の宇宙探検家で、常に新しい可能性と機会を求めている。技術研究と革新的探索を担当し、帝国の発展のための新しい道を切り開いている。",
    },
    stats: {
      projectsLed: 10,
      contributionsCount: 380,
      yearsActive: 1,
    },
    isActive: true,
  },
]

export function getMemberById(id: string): Member | undefined {
  return MEMBERS_DATA.find((member) => member.id === id)
}

export function getMembersByRole(role: Member["role"]): Member[] {
  return MEMBERS_DATA.filter((member) => member.role === role)
}

export function getActiveMembersCount(): number {
  return MEMBERS_DATA.filter((member) => member.isActive).length
}
