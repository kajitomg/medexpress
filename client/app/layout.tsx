import "@/application/styles/globals.css"
import { fetchGlobal } from "@/entities/global/services"
import { generateGlobalMetadata } from "@/shared/lib/generate-global-metadata"
import { generateSeoViewport } from "@/shared/lib/generate-seo-viewport"
import { Metadata, Viewport } from "next"

import { Inter, Sora } from "next/font/google"
import * as React from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetchGlobal()
  const data = response.data

  return generateGlobalMetadata(data)
}

export async function generateViewport(): Promise<Viewport | string> {
  const response = await fetchGlobal()
  const data = response.data

  return generateSeoViewport(data)
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
