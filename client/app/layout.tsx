import "@/application/styles/globals.css"
import { fetchGlobal } from "@/entities/_single-types/global/services"
import { generateGlobalMetadata } from "@/shared/lib/generate-global-metadata"
import { generateSeoViewport } from "@/shared/lib/generate-seo-viewport"
import { Metadata, Viewport } from "next"

import { Inter, Sora } from "next/font/google"
import Script from "next/script"
import * as React from "react"
import { Organization, WebSite, WithContext } from "schema-dts"

const website: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Медэкспресс",
  alternateName: ["Medexpress", "MedExpress", "Medekspress", "Med-ekspress"],
  url: "https://med-ekspress.ru/",
}

const organization: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Медэкспресс",
  url: "https://med-ekspress.ru/",
  logo: "https://med-ekspress.ru/api/favicon",
  sameAs: [
    "https://t.me/medexpressss",
    "https://www.instagram.com/_medexpress_?igsh=MXIwbWwwcjM4ZGJqag==",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Минераловодская 8А",
    addressLocality: "Георгевск",
    postalCode: "357820",
    addressCountry: "RU",
  },
}

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
      <Script
        id="website-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([website, organization]),
        }}
      />
      <body className={`${inter.variable} ${sora.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
