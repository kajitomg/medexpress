import "@/application/styles/globals.css"
import { CartProvider } from "@/features/cart/provider"
import { SettingsProvider } from "@/features/settings/provider"
import { Toaster } from "@/shared/ui/sonner"
import { Metadata } from "next"

import { Inter, Sora } from "next/font/google"
import * as React from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })

export const metadata: Metadata = {
  title: "Medexpress",
}
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sora.variable} font-sans`}>
        <SettingsProvider>
          <CartProvider>{children}</CartProvider>
        </SettingsProvider>
        <Toaster />
      </body>
    </html>
  )
}

export default RootLayout
