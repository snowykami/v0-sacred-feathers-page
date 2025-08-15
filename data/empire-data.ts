export type Language = "zh" | "en" | "ja"

export interface EmpireData {
  // 基本信息
  name: {
    english: string
    chinese: string
  }
  foundingDate: string
  contact: {
    email: string
    github: string
  }

  // 多语言内容
  content: {
    hero: {
      subtitle: string
      foundedOn: string
      description: string
      exploreButton: string
      joinButton: string
      labButton: string
    }
    about: {
      title: string
      subtitle: string
      items: Array<{
        icon: string
        title: string
        description: string
        color: string
      }>
    }
    achievements: {
      title: string
      subtitle: string
      items: Array<{
        icon: string
        number: string
        label: string
        color: string
      }>
    }
    history: {
      title: string
      subtitle: string
      items: Array<{
        date: string
        icon: string
        badge: string
        title: string
        description: string
        color: string
      }>
    }
    join: {
      title: string
      subtitle: string
      roles: Array<{
        icon: string
        title: string
        description: string
        color: string
      }>
      button: string
      qrDescription?: string // 可选的二维码描述
    }
    footer: {
      tagline: string
      disclaimer: {
        title: string
        content: string[]
      }
    }
    nav: {
      about: string
      achievements: string
      history: string
      join: string
    }
    members: {
      title: string
      subtitle: string
      roles: {
        emperor: string
        minister: string
        guardian: string
        creator: string
        explorer: string
        prince: string
        princess: string
        catgirl: string
        mascot: string
        member: string
      }
      gallery: string
      viewProfile: string
      backToMembers: string
      joinDate: string
      specialties: string
      achievements: string
      contact: string
    }
  }
}

const EMPIRE_DATA_MULTILANG: Record<Language, EmpireData> = {
  zh: {
    name: {
      english: "Sacred Feathers",
      chinese: "神圣羽毛帝国",
    },
    foundingDate: "2024-02-18",
    contact: {
      email: "contact@sacredfeathers.online",
      github: "https://github.com/SacredFeathers",
    },
    content: {
      hero: {
        subtitle: "神圣羽毛帝国",
        foundedOn: "建立于",
        description: "在虚拟世界中崛起的神圣帝国，以智慧与荣耀为基石，用羽毛般轻盈的梦想承载着无限的可能",
        exploreButton: "探索帝国",
        joinButton: "加入帝国",
        labButton: "轻雪社区",
      },
      about: {
        title: "帝国简介",
        subtitle: "神圣羽毛帝国是一个充满创意与梦想的虚拟王国，致力于构建和谐、智慧、繁荣的数字文明",
        items: [
          {
            icon: "Shield",
            title: "神圣使命",
            description:
              "以智慧和正义为指引，在虚拟世界中建立一个公平、和谐的理想国度，让每一位公民都能实现自己的梦想。",
            color: "from-amber-500 to-amber-600",
          },
          {
            icon: "Feather",
            title: "羽毛精神",
            description: "如羽毛般轻盈而坚韧，我们相信最轻的梦想能够承载最重的希望，用创新和包容书写帝国的传奇。",
            color: "from-blue-500 to-blue-600",
          },
          {
            icon: "Globe",
            title: "数字文明",
            description: "在数字时代的浪潮中，我们致力于创造一个跨越现实与虚拟边界的新型文明形态。",
            color: "from-purple-500 to-purple-600",
          },
        ],
      },
      achievements: {
        title: "帝国成就",
        subtitle: "见证神圣羽毛帝国的辉煌历程",
        items: [
          {
            icon: "Trophy",
            number: "1000+",
            label: "忠诚公民",
            color: "from-amber-500 to-amber-600",
          },
          {
            icon: "Star",
            number: "50+",
            label: "创新项目",
            color: "from-blue-500 to-blue-600",
          },
          {
            icon: "Crown",
            number: "365",
            label: "建国天数",
            color: "from-purple-500 to-purple-600",
          },
          {
            icon: "Shield",
            number: "100%",
            label: "和平指数",
            color: "from-green-500 to-green-600",
          },
        ],
      },
      history: {
        title: "帝国历史",
        subtitle: "追溯神圣羽毛帝国的光辉足迹",
        items: [
          {
            date: "2024-02-18",
            icon: "Scroll",
            badge: "建国纪元",
            title: "神圣羽毛帝国成立",
            description: "在虚拟世界的广阔天地中，神圣羽毛帝国正式宣告成立，以智慧、和谐、创新为立国之本。",
            color: "from-amber-600 to-amber-700",
          },
          {
            date: "2024-03-15",
            icon: "Users",
            badge: "繁荣发展",
            title: "公民社区建立",
            description: "建立了完善的公民体系，吸引了来自世界各地的梦想家和创造者加入帝国大家庭。",
            color: "from-blue-600 to-blue-700",
          },
          {
            date: "2024-06-01",
            icon: "Star",
            badge: "创新时代",
            title: "数字文明新纪元",
            description: "开启了数字文明的新篇章，在虚拟与现实的交汇点上创造出独特的文化和价值体系。",
            color: "from-purple-600 to-purple-700",
          },
          {
            date: "2024-09-12",
            icon: "Globe",
            badge: "技术突破",
            title: "开源项目启动",
            description: "在GitHub上建立官方代码仓库，开始与全球开发者社区分享技术成果和创新理念。",
            color: "from-green-600 to-green-700",
          },
          {
            date: "2024-12-01",
            icon: "Crown",
            badge: "里程碑",
            title: "帝国展示页面发布",
            description: "正式发布神圣羽毛帝国官方展示页面，向世界展示我们的愿景、成就和未来规划。",
            color: "from-indigo-600 to-indigo-700",
          },
        ],
      },
      join: {
        title: "加入神圣羽毛帝国",
        subtitle: "成为帝国公民，与我们一起在虚拟世界中创造无限可能",
        roles: [
          {
            icon: "Feather",
            title: "创造者",
            description: "发挥你的创意，为帝国贡献独特的想法和项目",
            color: "from-amber-500 to-amber-600",
          },
          {
            icon: "Shield",
            title: "守护者",
            description: "维护帝国的和谐与秩序，保护公民的权益",
            color: "from-blue-500 to-blue-600",
          },
          {
            icon: "Star",
            title: "探索者",
            description: "探索虚拟世界的边界，发现新的可能性",
            color: "from-purple-500 to-purple-600",
          },
        ],
        button: "立即加入帝国",
      },
      footer: {
        tagline: "在虚拟世界中创造无限可能",
        disclaimer: {
          title: "免责声明",
          content: [
            "本「神圣羽毛帝国」(Sacred Feathers Empire) 为纯虚拟组织和创意项目，仅用于娱乐、学习和创作目的。",
            "本项目与现实世界的任何政治组织、政府机构或政治活动无关，不涉及任何真实的政治主张、领土声明或政治立场。所有内容均为虚构，请勿与现实政治混淆。",
          ],
        },
      },
      nav: {
        about: "关于",
        achievements: "成就",
        history: "历史",
        join: "加入",
      },
      members: {
        title: "成员",
        subtitle: "认识神圣羽毛帝国的杰出成员们",
        roles: {
          emperor: "皇帝",
          minister: "大臣",
          guardian: "守护者",
          creator: "创造者",
          explorer: "探索者",
          prince: "王子",
          princess: "公主",
          catgirl: "猫娘",
          mascot: " 吉祥物",
          member: "成员",
        },
        gallery: "画廊",
        viewProfile: "查看详情",
        backToMembers: "返回成员列表",
        joinDate: "加入日期",
        specialties: "专长领域",
        achievements: "主要成就",
        contact: "联系方式",
      },
    },
  },
  en: {
    name: {
      english: "Sacred Feathers",
      chinese: "神圣羽毛帝国",
    },
    foundingDate: "2024-02-18",
    contact: {
      email: "contact@sacredfeathers.online",
      github: "https://github.com/SacredFeathers",
    },
    content: {
      hero: {
        subtitle: "Sacred Feathers Empire",
        foundedOn: "Founded on",
        description:
          "A sacred empire rising in the virtual world, built on the foundation of wisdom and glory, carrying infinite possibilities with dreams as light as feathers",
        exploreButton: "Explore Empire",
        joinButton: "Join Empire",
        labButton: "Liteyuki Lab",
      },
      about: {
        title: "About Empire",
        subtitle:
          "Sacred Feathers Empire is a virtual kingdom full of creativity and dreams, dedicated to building a harmonious, wise, and prosperous digital civilization",
        items: [
          {
            icon: "Shield",
            title: "Sacred Mission",
            description:
              "Guided by wisdom and justice, we establish a fair and harmonious ideal nation in the virtual world, enabling every citizen to realize their dreams.",
            color: "from-amber-500 to-amber-600",
          },
          {
            icon: "Feather",
            title: "Feather Spirit",
            description:
              "Light yet resilient like feathers, we believe the lightest dreams can carry the heaviest hopes, writing the empire's legend with innovation and inclusivity.",
            color: "from-blue-500 to-blue-600",
          },
          {
            icon: "Globe",
            title: "Digital Civilization",
            description:
              "In the wave of the digital age, we are committed to creating a new form of civilization that transcends the boundaries between reality and virtuality.",
            color: "from-purple-500 to-purple-600",
          },
        ],
      },
      achievements: {
        title: "Empire Achievements",
        subtitle: "Witness the glorious journey of Sacred Feathers Empire",
        items: [
          {
            icon: "Trophy",
            number: "1000+",
            label: "Loyal Citizens",
            color: "from-amber-500 to-amber-600",
          },
          {
            icon: "Star",
            number: "50+",
            label: "Innovation Projects",
            color: "from-blue-500 to-blue-600",
          },
          {
            icon: "Crown",
            number: "365",
            label: "Days Since Founding",
            color: "from-purple-500 to-purple-600",
          },
          {
            icon: "Shield",
            number: "100%",
            label: "Peace Index",
            color: "from-green-500 to-green-600",
          },
        ],
      },
      history: {
        title: "Empire History",
        subtitle: "Trace the glorious footsteps of Sacred Feathers Empire",
        items: [
          {
            date: "2024-02-18",
            icon: "Scroll",
            badge: "Foundation Era",
            title: "Sacred Feathers Empire Established",
            description:
              "In the vast expanse of the virtual world, Sacred Feathers Empire was officially proclaimed, founded on wisdom, harmony, and innovation.",
            color: "from-amber-600 to-amber-700",
          },
          {
            date: "2024-03-15",
            icon: "Users",
            badge: "Prosperity Development",
            title: "Citizen Community Established",
            description:
              "Established a comprehensive citizen system, attracting dreamers and creators from around the world to join the empire family.",
            color: "from-blue-600 to-blue-700",
          },
          {
            date: "2024-06-01",
            icon: "Star",
            badge: "Innovation Era",
            title: "New Era of Digital Civilization",
            description:
              "Opened a new chapter of digital civilization, creating unique culture and value systems at the intersection of virtual and reality.",
            color: "from-purple-600 to-purple-700",
          },
          {
            date: "2024-09-12",
            icon: "Globe",
            badge: "Technical Breakthrough",
            title: "Open Source Project Launch",
            description:
              "Established official code repository on GitHub, began sharing technical achievements and innovative ideas with the global developer community.",
            color: "from-green-600 to-green-700",
          },
          {
            date: "2024-12-01",
            icon: "Crown",
            badge: "Milestone",
            title: "Empire Showcase Page Released",
            description:
              "Officially released the Sacred Feathers Empire showcase page, presenting our vision, achievements, and future plans to the world.",
            color: "from-indigo-600 to-indigo-700",
          },
        ],
      },
      join: {
        title: "Join Sacred Feathers Empire",
        subtitle: "Become an empire citizen and create infinite possibilities with us in the virtual world",
        roles: [
          {
            icon: "Feather",
            title: "Creator",
            description: "Unleash your creativity and contribute unique ideas and projects to the empire",
            color: "from-amber-500 to-amber-600",
          },
          {
            icon: "Shield",
            title: "Guardian",
            description: "Maintain the harmony and order of the empire, protect the rights of citizens",
            color: "from-blue-500 to-blue-600",
          },
          {
            icon: "Star",
            title: "Explorer",
            description: "Explore the boundaries of the virtual world and discover new possibilities",
            color: "from-purple-500 to-purple-600",
          },
        ],
        button: "Join Empire Now",
      },
      footer: {
        tagline: "Creating infinite possibilities in the virtual world",
        disclaimer: {
          title: "Disclaimer",
          content: [
            "This 'Sacred Feathers Empire' is a purely virtual organization and creative project, intended solely for entertainment, learning, and creative purposes.",
            "This project is not related to any real-world political organizations, government institutions, or political activities, and does not involve any actual political claims, territorial assertions, or political positions. All content is fictional and should not be confused with real-world politics.",
          ],
        },
      },
      nav: {
        about: "About",
        achievements: "Achievements",
        history: "History",
        join: "Join Us",
      },
      members: {
        title: "Empire Members",
        subtitle: "Meet the outstanding members of Sacred Feathers Empire",
        roles: {
          emperor: "Emperor",
          minister: "Minister",
          guardian: "Guardian",
          creator: "Creator",
          explorer: "Explorer",
          prince: "Prince",
          princess: "Princess",
          catgirl: "Catgirl",
          mascot: "Mascot",
          member: "成员",
        },
        gallery: "Gallery",
        viewProfile: "View Profile",
        backToMembers: "Back to Members",
        joinDate: "Join Date",
        specialties: "Specialties",
        achievements: "Achievements",
        contact: "Contact",
      },
    },
  },
  ja: {
    name: {
      english: "Sacred Feathers",
      chinese: "神圣羽毛帝国",
    },
    foundingDate: "2024-02-18",
    contact: {
      email: "contact@sacredfeathers.online",
      github: "https://github.com/SacredFeathers",
    },
    content: {
      hero: {
        subtitle: "聖なる羽根帝国",
        foundedOn: "設立日",
        description:
          "仮想世界に立ち上がった神聖な帝国。知恵と栄光を基盤とし、羽根のように軽やかな夢で無限の可能性を担う",
        exploreButton: "帝国を探索",
        joinButton: "帝国に参加",
        labButton: "Liteyuki Lab",
      },
      about: {
        title: "帝国について",
        subtitle:
          "聖なる羽根帝国は創造性と夢に満ちた仮想王国であり、調和のとれた賢明で繁栄するデジタル文明の構築に専念しています",
        items: [
          {
            icon: "Shield",
            title: "神聖な使命",
            description:
              "知恵と正義に導かれ、仮想世界に公正で調和のとれた理想的な国家を建設し、すべての市民が夢を実現できるようにします。",
            color: "from-amber-500 to-amber-600",
          },
          {
            icon: "Feather",
            title: "羽根の精神",
            description:
              "羽根のように軽やかでありながら強靭で、最も軽い夢が最も重い希望を担うことができると信じ、革新と包容で帝国の伝説を書きます。",
            color: "from-blue-500 to-blue-600",
          },
          {
            icon: "Globe",
            title: "デジタル文明",
            description: "デジタル時代の波の中で、現実と仮想の境界を超えた新しい文明形態の創造に取り組んでいます。",
            color: "from-purple-500 to-purple-600",
          },
        ],
      },
      achievements: {
        title: "帝国の成果",
        subtitle: "聖なる羽根帝国の輝かしい歩みを見届ける",
        items: [
          {
            icon: "Trophy",
            number: "1000+",
            label: "忠実な市民",
            color: "from-amber-500 to-amber-600",
          },
          {
            icon: "Star",
            number: "50+",
            label: "革新プロジェクト",
            color: "from-blue-500 to-blue-600",
          },
          {
            icon: "Crown",
            number: "365",
            label: "建国からの日数",
            color: "from-purple-500 to-purple-600",
          },
          {
            icon: "Shield",
            number: "100%",
            label: "平和指数",
            color: "from-green-500 to-green-600",
          },
        ],
      },
      history: {
        title: "帝国の歴史",
        subtitle: "聖なる羽根帝国の輝かしい足跡をたどる",
        items: [
          {
            date: "2024-02-18",
            icon: "Scroll",
            badge: "建国時代",
            title: "聖なる羽根帝国設立",
            description:
              "仮想世界の広大な天地において、聖なる羽根帝国が正式に設立を宣言し、知恵、調和、革新を建国の基本としました。",
            color: "from-amber-600 to-amber-700",
          },
          {
            date: "2024-03-15",
            icon: "Users",
            badge: "繁栄発展",
            title: "市民コミュニティ設立",
            description: "完全な市民システムを構築し、世界各地の夢想家と創造者を帝国の大家族に迎え入れました。",
            color: "from-blue-600 to-blue-700",
          },
          {
            date: "2024-06-01",
            icon: "Star",
            badge: "革新時代",
            title: "デジタル文明新紀元",
            description: "デジタル文明の新たな章を開き、仮想と現実の交差点で独特な文化と価値体系を創造しました。",
            color: "from-purple-600 to-purple-700",
          },
          {
            date: "2024-09-12",
            icon: "Globe",
            badge: "技術的突破",
            title: "オープンソースプロジェクト開始",
            description:
              "GitHubに公式コードリポジトリを設立し、グローバル開発者コミュニティと技術成果と革新的アイデアの共有を開始しました。",
            color: "from-green-600 to-green-700",
          },
          {
            date: "2024-12-01",
            icon: "Crown",
            badge: "マイルストーン",
            title: "帝国ショーケースページ公開",
            description:
              "聖なる羽根帝国の公式ショーケースページを正式に公開し、私たちのビジョン、成果、将来計画を世界に示しました。",
            color: "from-indigo-600 to-indigo-700",
          },
        ],
      },
      join: {
        title: "聖なる羽根帝国に参加",
        subtitle: "帝国の市民となり、仮想世界で私たちと一緒に無限の可能性を創造しま��ょう",
        roles: [
          {
            icon: "Feather",
            title: "創造者",
            description: "あなたの創造性を発揮し、帝国にユニークなアイデアとプロジェクトを貢献してください",
            color: "from-amber-500 to-amber-600",
          },
          {
            icon: "Shield",
            title: "守護者",
            description: "帝国の調和と秩序を維持し、市民の権利を保護してください",
            color: "from-blue-500 to-blue-600",
          },
          {
            icon: "Star",
            title: "探検家",
            description: "仮想世界の境界を探索し、新しい可能性を発見してください",
            color: "from-purple-500 to-purple-600",
          },
        ],
        button: "今すぐ帝国に参加",
      },
      footer: {
        tagline: "仮想世界で無限の可能性を創造",
        disclaimer: {
          title: "免責事項",
          content: [
            "この「聖なる羽根帝国」は純粋に仮想的な組織と創造的プロジェクトであり、娯楽、学習、創作目的のみに使用されます。",
            "このプロジェクトは現実世界のいかなる政治組織、政府機関、政治活動とも関係がなく、実際の政治的主張、領土主張、政治的立場を含みません。すべての内容は架空のものであり、現実の政治と混同しないでください。",
          ],
        },
      },
      nav: {
        about: "帝国について",
        achievements: "成果",
        history: "歴史",
        join: "参加",
      },
      members: {
        title: "帝国メンバー",
        subtitle: "聖なる羽根帝国の優秀なメンバーたちをご紹介",
        roles: {
          emperor: "皇帝",
          minister: "大臣",
          guardian: "守護者",
          creator: "創造者",
          explorer: "探検家",
          prince: "王子",
          princess: "王女",
          catgirl: "猫娘",
          mascot: "マスコット",
          member: "メンバー",
        },
        gallery: "ギャラリー",
        viewProfile: "プロフィール表示",
        backToMembers: "メンバー一覧に戻る",
        joinDate: "参加日",
        specialties: "専門分野",
        achievements: "主な成果",
        contact: "連絡先",
      },
    },
  },
}

// 工具函数
export function calculateDaysSinceFounding(): number {
  const foundingDate = new Date("2024-02-18")
  const currentDate = new Date()
  const timeDifference = currentDate.getTime() - foundingDate.getTime()
  return Math.floor(timeDifference / (1000 * 3600 * 24))
}

export function formatDate(dateString: string, language: Language): string {
  const date = new Date(dateString)

  const localeMap = {
    zh: "zh-CN",
    en: "en-US",
    ja: "ja-JP",
  }

  return date.toLocaleDateString(localeMap[language], {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getCopyrightYears(): string {
  const currentYear = new Date().getFullYear()
  return currentYear > 2024 ? `2024-${currentYear}` : "2024"
}

export function getRelativeTime(dateString: string, language: Language): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  const timeTexts = {
    zh: {
      today: "今天",
      yesterday: "昨天",
      daysAgo: (days: number) => `${days}天前`,
      monthsAgo: (months: number) => `${months}个月前`,
      yearsAgo: (years: number) => `${years}年前`,
    },
    en: {
      today: "Today",
      yesterday: "Yesterday",
      daysAgo: (days: number) => `${days} days ago`,
      monthsAgo: (months: number) => `${months} months ago`,
      yearsAgo: (years: number) => `${years} years ago`,
    },
    ja: {
      today: "今日",
      yesterday: "昨日",
      daysAgo: (days: number) => `${days}日前`,
      monthsAgo: (months: number) => `${months}ヶ月前`,
      yearsAgo: (years: number) => `${years}年前`,
    },
  }

  const texts = timeTexts[language]

  if (diffInDays === 0) return texts.today
  if (diffInDays === 1) return texts.yesterday
  if (diffInDays < 30) return texts.daysAgo(diffInDays)
  if (diffInDays < 365) return texts.monthsAgo(Math.floor(diffInDays / 30))
  return texts.yearsAgo(Math.floor(diffInDays / 365))
}

export function getEmpireData(language: Language): EmpireData {
  return EMPIRE_DATA_MULTILANG[language]
}

export const SUPPORTED_LANGUAGES = [
  { code: "zh" as Language, name: "中文", flag: "🇨🇳" },
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "ja" as Language, name: "日本語", flag: "🇯🇵" },
]
