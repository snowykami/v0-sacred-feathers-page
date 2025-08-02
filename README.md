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
   - 在 `Member interface` 的 ` role` 字段中添加新的角色
   - 在 `roleColors` 中添加对应的颜色

2. 在 `app/members/page.tsx` MembersPage 组件中
   - 在 `roles` 常量数组中参照现有角色添加新的角色