import "@/application/styles/globals.css"
import { fetchGlobal } from "@/entities/global/services"
import { Metadata } from "next"

import { Inter, Sora } from "next/font/google"
import * as React from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetchGlobal()
  const data = response.data
  if (!data || !data.seo) {
    return {
      title: "Страница не найдена",
    }
  }
  const { metaTitle, metaDescription } = data.seo
  return {
    title: metaTitle,
    description: metaDescription,
    icons: {
      icon: new URL(data.favicon.url, process.env.NEXT_PUBLIC_API_URL),
    },
  }
}

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sora.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
