import type { Language } from "./empire-data"

export interface Member {
  id: string
  name: string
  avatar: string
  role: "emperor" | "minister" | "guardian" | "creator" | "explorer" | "prince" | "princess" | "catgirl" | "mascot"
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
}

export const MEMBERS_DATA: Member[] = [
  {
    id: "chengyza",
    name: "金日橙",
    avatar: "https://github.com/chengyza.png",
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
      github: "https://github.com/chengyza",
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
    id: "snowykami",
    name: "远野 千束",
    avatar: "https://cdn.liteyuki.org/snowykami/avatar.jpg",
    role: "minister",
    joinDate: "2024-02-18",
    specialties: ["Full stack", "Backend", "CloudNative", "Education", "Cultural Development"],
    achievements: ["Established Empire Library", "Created Learning Pathways", "Mentored 200+ Citizens"],
    contact: {
      email: "a@sfkm.me",
      github: "https://github.com/snowykami",
      twitter: "https://x.com/snowykami1145",
      website: "https://sfkm.me"
    },
    bio: {
      zh: "帝国的摄政王，负责知识管理和文化发展。拥有深厚的学识和丰富的教学经验，致力于提升帝国公民的整体素质。",
      en: "Regent of the empire responsible for knowledge management and cultural development. Possesses profound knowledge and extensive teaching experience, dedicated to enhancing the overall quality of the empire's citizens.",
      ja: "帝国の摂政で、知識管理と文化発展を担当。深い知識と豊富な教育経験を持ち、帝国市民の全体的な素質向上に尽力している。",
    },
    stats: {
      projectsLed: 8,
      contributionsCount: 350,
      yearsActive: 1,
    },
    isActive: true,
  },
  {
    id: "synodriver",
    name: "帝国皇家近卫军",
    avatar: "https://github.com/synodriver.png",
    role: "guardian",
    joinDate: "2024-03-15",
    specialties: ["Cython", "C", "Matlab", "Embedded"],
    achievements: ["Maintained 100% Peace Index", "Resolved 50+ Disputes", "Protected Empire Integrity"],
    contact: {
      email: "synodriver@outlook.com",
      github: "https://github.com/synodriver",
    },
    bio: {
      zh: "帝国的钢铁守护者，馒头山大王，负责维护社区安全和秩序。以公正和勇气著称，是帝国和平与稳定的坚实保障。",
      en: "The empire's steel guardian, known as the Bread Mountain King, responsible for maintaining community safety and order. Renowned for justice and courage, serving as a solid guarantee of peace and stability in the empire.",
      ja: "帝国の鋼鉄の守護者、パン山の王として知られ、コミュニティの安全と秩序を維持する責任を負う。正義と勇気で有名で、帝国の平和と安定の確固たる保証となっている。",
    },
    stats: {
      projectsLed: 5,
      contributionsCount: 280,
      yearsActive: 1,
    },
    isActive: true,
  },
  {
    id: "redish101",
    name: "数据库姐姐",
    avatar: "https://github.com/redish101.png",
    role: "princess",
    joinDate: "2024-04-01",
    specialties: ["CloudNative", "Design", "Creative Projects"],
    achievements: ["Designed Empire Visual Identity", "Created 100+ Digital Artworks", "Led Creative Workshops"],
    contact: {
      email: "redish101@outlook.com",
      github: "https://github.com/redish101",
      website: "https://redish101.top",
    },
    bio: {
      zh: "帝国的年龄最小的公主，拥有无限的创造力和技术力，可爱的外表下隐藏着强大的技术实力。负责帝国的视觉设计和创意项目，为帝国注入独特的艺术氛围。",
      en: "The youngest princess of the empire, possessing boundless creativity and technical prowess. Beneath her cute appearance lies powerful technical strength. Responsible for the empire's visual design and creative projects, injecting a unique artistic atmosphere into the empire.",
      ja: "帝国で最も若い姫君で、無限の創造力と技術力を持つ。可愛らしい外見の下には強力な技術力が隠されている。帝国のビジュアルデザインとクリエイティブプロジェクトを担当し、帝国に独自の芸術的雰囲気を注入している。",
    },
    stats: {
      projectsLed: 12,
      contributionsCount: 420,
      yearsActive: 1,
    },
    isActive: true,
  },
  {
    id: "xuan",
    name: "轩某",
    avatar: "https://github.com/xuanmou.png",
    role: "explorer",
    joinDate: "2024-05-01",
    specialties: ["Machine Learning", "Data Analysis", "AI Research"],
    achievements: ["Discovered 20+ New Technologies", "Mapped Virtual Territories", "Led Exploration Missions"],
    contact: {
    },
    bio: {
      zh: "帝国的Baka王，专门管理帝国的笨蛋，自己也是其中之一。负责探索和创新，为帝国开辟新的技术领域。",
      en: "The president of the empire's Baka association, responsible for managing the empire's fools, of which he is one. Focused on exploration and innovation, opening up new technological fields for the empire.",
      ja: "帝国のバカ協会の会長で、帝国のバカを管理する責任を負う。自らもその一員であり、探索と革新に注力し、帝国の新しい技術分野を切り開いている。",
    },
    stats: {
      projectsLed: 10,
      contributionsCount: 380,
      yearsActive: 1,
    },
    isActive: true,
  },
  {
    id: "nanaloveyuki",
    name: "若水宁",
    avatar: "https://github.com/nanaloveyuki.png",
    role: "catgirl",
    joinDate: "2024-05-01",
    specialties: ["Research", "Innovation", "Technology Scouting"],
    achievements: ["Discovered 20+ New Technologies", "Mapped Virtual Territories", "Led Exploration Missions"],
    contact: {
      email: "nanaloveyuki@outlook.com",
      github: "https://github.com/nanaloveyuki",
      twitter: "https://twitter.com/nanaloveyuki",
    },
    bio: {
      zh: "帝国的大猫娘，宇宙探索者，永远在寻找新的可能性和机会。负责技术研究和创新探索，为帝国的发展开辟新的道路。",
      en: "The empire's cosmic explorer, always seeking new possibilities and opportunities. Responsible for technology research and innovative exploration, paving new paths for the empire's development.",
      ja: "帝国の宇宙探検者で、常に新しい可能性と機会を求めている。技術研究と革新探索を担当し、帝国の発展のために新しい道を切り開いている。",
    },
    stats: {
      projectsLed: 10,
      contributionsCount: 380,
      yearsActive: 1,
    },
    isActive: true,
  },
  {
    id: "chenxu233",
    name: "沐浴晨煦",
    avatar: "https://github.com/chenxu233.png",
    role: "catgirl",
    joinDate: "2024-05-01",
    specialties: ["Machine Learning", "Data Analysis", "AI Research"],
    achievements: ["Discovered 20+ New Technologies", "Mapped Virtual Territories", "Led Exploration Missions"],
    contact: {
      email: "chenxu233@outlook.com",
      github: "https://github.com/chenxu233",
      twitter: "https://x.com/chenxu233",
    },
    bio: {
      zh: "帝国的猫协会长，负责猫咪福利和社区建设。以其温柔和关怀著称，致力于为帝国的每一位成员创造一个温暖和谐的环境。",
      en: "The president of the empire's cat association, responsible for cat welfare and community building. Renowned for her gentleness and care, dedicated to creating a warm and harmonious environment for every member of the empire.",
      ja: "帝国の猫協会の会長で、猫の福祉とコミュニティの構築を担当。優しさと配慮で有名で、帝国のすべてのメンバーに温かく調和のとれた環境を提供することに尽力している。",
    },
    stats: {
      projectsLed: 10,
      contributionsCount: 380,
      yearsActive: 1,
    },
    isActive: true,
  },
  {
    id: "Twisuki",
    name: "苏阳",
    avatar: "https://github.com/Twisuki.png",
    role: "catgirl",
    joinDate: "2024-05-01",
    specialties: ["Machine Learning", "Data Analysis", "AI Research"],
    achievements: ["Discovered 20+ New Technologies", "Mapped Virtual Territories", "Led Exploration Missions"],
    contact: {
      email: "Twisuki@outlook.com",
      github: "https://github.com/Twisuki",
      twitter: "https://x.com/Twisuki",
    },
    bio: {
      zh: "帝国的猫娘，负责探索和创新，为帝国开辟新的技术领域。以其可爱的外表和强大的技术实力著称，是帝国数字文明的重要一员。",
      en: "The empire's catgirl, responsible for exploration and innovation, opening up new technological fields for the empire. Renowned for her cute appearance and powerful technical strength, she is an important member of the empire's digital civilization.",
      ja: "帝国の猫娘で、探索と革新を担当し、帝国の新しい技術分野を切り開いている。可愛らしい外見と強力な技術力で有名で、帝国のデジタル文明の重要な一員となっている。",
    },
    stats: {
      projectsLed: 10,
      contributionsCount: 380,
      yearsActive: 1,
    },
    isActive: true,
  },
  {
    id: "ChuranNeko",
    name: "初然Neko",
    avatar: "https://github.com/ChuranNeko.png",
    role: "catgirl",
    joinDate: "2024-08-02",
    specialties: ["Mixed", "Lazy"],
    achievements: ["Survived in the Empire"],
    contact: {
      email: "churanneko@qq.com",
      github: "https://github.com/ChuranNeko/",
      website: "https://crneko.top",
    },
    bio: {
      zh: "帝国的一只混的小猫咪，主打一个混QwQ",
      en: "A lazy cat in the empire, mainly focusing on being lazy QwQ",
      ja: "帝国の一匹の怠け猫、主に怠けることに専念しているQwQ",
    },
    stats: {
      projectsLed: 0,
      contributionsCount: 0,
      yearsActive: 0,
    },
    isActive: true,
  },
  {
    id: "GreatFood404",
    name: "似梦玄",
    avatar: "https://github.com/GreatFood404.png",
    role: "mascot",
    joinDate: "2024-08-02",
    specialties: ["Fishing"],
    achievements: ["Improve The Luck Of The Empire"],
    contact:{
      email: "GreatFood404@outlook.com",
      github: "https://github.com/GreatFood404",
      twitter: "https://twitter.com/GreatFood404",
    },
    bio:{
      zh: "一只吉祥物，存在总会莫名其妙提高幸运，但大部分时候都失灵 。",
      en: "A happy character, which will sometimes increase the luck of the empire, but most of the time will fail. ",
      ja: "一匹吉祥物で、帝国の運気を向上させることがありますが、大部分の場合、運気が失敗します。",
    },
    stats:{
      projectsLed: 0,
      contributionsCount: 114,
      yearsActive: 1,
    },
    isActive: true,
  },
  {
    id: "starset",
    name: "川崎星夕",
    avatar: "https://starset.top/images/StarsetICON.webp",
    role: "medic agent",
    joinDate: "2024-02-18",
    specialties: ["Planning", "Organization Management", "Communicating"],
    achievements: [
      "Made Uncountable Citizens Alive",
      "Won the Hearts of Every Citizens",
      "Helped to Organize the Council",
    ],
    contact: {
      email: "starsetnight@outlook.com",
      github: "https://github.com/StarsetNight",
      website: "https://starset.top",
    },
    bio: {
      zh: "神圣羽毛帝国医疗干员，通常负责心理医学工作，不参与其他医学工作，力求保证帝国人民的心理健康。",
      en: "Medic agent of the Sacred Feather Empire are usually responsible for psychological medicine and do not participate in other medical work, striving to ensure the mental health of the empire's people.",
      ja: "聖なる羽根帝国医療スタッフで、通常は心理医学を担当し、他の医学には関与せず、帝国の人々の心の健康を追求しています。",
    },
    stats: {
      projectsLed: 23,
      contributionsCount: 621,
      yearsActive: 1,
    },
    isActive: true,
  },
]
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
