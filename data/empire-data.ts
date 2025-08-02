export const EMPIRE_DATA = {
  // 基本信息
  name: {
    english: "Sacred Feathers",
    chinese: "神圣羽毛帝国",
  },
  foundingDate: "2024-02-18",
  contact: {
    email: "contact@sacredfeathers.online",
    github: "https://github.com/SacredFeathers",
  },

  // 帝国简介
  about: [
    {
      icon: "Shield",
      title: "神圣使命",
      description: "以智慧和正义为指引，在虚拟世界中建立一个公平、和谐的理想国度，让每一位公民都能实现自己的梦想。",
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

  // 帝国成就
  achievements: [
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
      number: "365", // 这个会被动态计算替换
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

  // 帝国历史时间轴
  history: [
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

  // 公民角色
  citizenRoles: [
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
} as const

// 工具函数
export function calculateDaysSinceFounding(): number {
  const foundingDate = new Date(EMPIRE_DATA.foundingDate)
  const currentDate = new Date()
  const timeDifference = currentDate.getTime() - foundingDate.getTime()
  return Math.floor(timeDifference / (1000 * 3600 * 24))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getCopyrightYears(): string {
  const currentYear = new Date().getFullYear()
  return currentYear > 2024 ? `2024-${currentYear}` : "2024"
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return "今天"
  if (diffInDays === 1) return "昨天"
  if (diffInDays < 30) return `${diffInDays}天前`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}个月前`
  return `${Math.floor(diffInDays / 365)}年前`
}
