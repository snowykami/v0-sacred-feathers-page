import type { Language } from "./empire-data"

export interface NavigationItem {
  id: string
  href: string
  icon: string
  isExternal?: boolean
}

export interface NavigationData {
  items: NavigationItem[]
  labels: Record<Language, Record<string, string>>
}

export const NAVIGATION_DATA: NavigationData = {
  items: [
    {
      id: "home",
      href: "/",
      icon: "Home",
    },
    {
      id: "about",
      href: "#about",
      icon: "Shield",
    },
    {
      id: "achievements",
      href: "#achievements",
      icon: "Trophy",
    },
    {
      id: "history",
      href: "#history",
      icon: "Scroll",
    },
    {
      id: "members",
      href: "/members",
      icon: "Users",
    },
    {
      id: "join",
      href: "#join",
      icon: "Heart",
    },
  ],
  labels: {
    zh: {
      home: "首页",
      about: "关于帝国",
      achievements: "帝国成就",
      history: "历史",
      members: "帝国成员",
      join: "加入我们",
    },
    en: {
      home: "Home",
      about: "About",
      achievements: "Achievements",
      history: "History",
      members: "Members",
      join: "Join Us",
    },
    ja: {
      home: "ホーム",
      about: "帝国について",
      achievements: "成果",
      history: "歴史",
      members: "メンバー",
      join: "参加",
    },
  },
}

export function getNavigationLabel(itemId: string, language: Language): string {
  return NAVIGATION_DATA.labels[language][itemId] || itemId
}
