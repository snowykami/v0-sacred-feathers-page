import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '公民们 | Citizens',
  description: '神圣羽毛帝国的优秀成员们 - 来自各个领域的杰出人才，共同构建着这个充满创意与活力的数字文明。',
  keywords: ['成员', 'Members', '帝国公民', 'Empire Citizens', '团队', 'Team'],
  openGraph: {
    title: 'Members - Sacred Feathers Empire',
    description: '神圣羽毛帝国的优秀成员们 - 来自各个领域的杰出人才，共同构建着这个充满创意与活力的数字文明。',
    type: 'website',
  },
}

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
