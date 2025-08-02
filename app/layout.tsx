import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { LanguageProvider } from "@/contexts/language-context"
import { NavigationHeader } from "@/components/navigation-header"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Sacred Feathers | 神圣羽毛帝国",
    template: "%s | Sacred Feathers",
  },
  description:
    "神圣羽毛帝国 - 在虚拟世界中崛起的神圣帝国，以智慧与荣耀为基石，用羽毛般轻盈的梦想承载着无限的可能。加入我们，在数字文明中创造属于你的传奇。",
  keywords: ["神圣羽毛帝国", "Sacred Feathers", "虚拟帝国", "数字文明", "在线社区", "创新", "梦想"],
  authors: [{ name: "Sacred Feathers Empire" }],
  creator: "Sacred Feathers Empire",
  publisher: "Sacred Feathers Empire",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://sacredfeathers.com",
    title: "Sacred Feathers | 神圣羽毛帝国",
    description: "神圣羽毛帝国 - 在虚拟世界中崛起的神圣帝国，以智慧与荣耀为基石，用羽毛般轻盈的梦想承载着无限的可能。",
    siteName: "Sacred Feathers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sacred Feathers | 神圣羽毛帝国",
    description: "神圣羽毛帝国 - 在虚拟世界中崛起的神圣帝国，以智慧与荣耀为基石，用羽毛般轻盈的梦想承载着无限的可能。",
    creator: "@SacredFeathers",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0f172a" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <LanguageProvider>
          <NavigationHeader />
          {children}
          </LanguageProvider>
      </body>
    </html>
  )
}
