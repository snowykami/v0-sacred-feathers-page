# Sacred Feathers Page

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/snowykamis-projects/v0-sacred-feathers-page)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/CK2o61fv9O8)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/snowykamis-projects/v0-sacred-feathers-page](https://vercel.com/snowykamis-projects/v0-sacred-feathers-page)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/CK2o61fv9O8](https://v0.dev/chat/projects/CK2o61fv9O8)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## 添加和更新个人信息

1. 先fork本仓库
2. 克隆fork的仓库，在 `data/members-data.ts` 中添加个人信息
   - 确保 `id` 是唯一的
   - `name` 是你的名字
   - `avatar` 是你的头像链接
3. push到你的分支，然后在GitHub上发起Pull Request

## 添加新的角色词条

1. 在 `data/members-data.ts` 中添加新的角色词条
   - 在 `ROLES` 常量数组中添加新的角色字符串
   - 在 `roleColors` 对象中添加对应的颜色样式
   - 类型系统会自动推导出新的 `Role` 类型

2. 在帝国数据文件中添加多语言支持
   - 在 `data/empire-data.ts` 的各语言角色翻译中添加新角色的翻译

3. 角色相关功能会自动支持新角色
   - 成员筛选功能
   - 角色统计计算
   - 角色颜色主题

## 页面标题和 SEO 优化

项目使用 Next.js App Router 的 Metadata API 来管理页面标题和 SEO：

### 全局设置
- `app/layout.tsx` 包含全局 metadata 和标题模板
- 模板格式：`页面标题 | Sacred Feathers`

### 页面级设置
- 静态页面：在页面组件中导出 `metadata` 对象
- 动态页面：使用 `generateMetadata` 函数
- 客户端组件：使用 `next/head` 的 `Head` 组件

### 示例
```typescript
// 静态 metadata
export const metadata: Metadata = {
  title: 'Members - Empire Citizens',
  description: '神圣羽毛帝国的优秀成员们...',
}

// 动态 metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const member = getMemberById(params.id)
  return {
    title: `${member.name} - Empire Member Profile`,
    description: member.bio.en,
  }
}
```