import { fetchPage } from "@/entities/page/services"
import { SectionsProvider } from "@/features/sections/provider"
import { generatePageMetadata } from "@/shared/lib/generate-page-metadata"
import { generateSeoViewport } from "@/shared/lib/generate-seo-viewport"
import { PageLayoutMain } from "@/shared/ui"
import { ContactsPage } from "@/views/contacts/ui"
import { Metadata, Viewport } from "next"
import * as React from "react"
import slugify from "slugify"

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetchPage(
    slugify("Контакты", { lower: true, strict: true })
  )
  const data = response.data

  return generatePageMetadata(data)
}

export async function generateViewport(): Promise<Viewport | string> {
  const response = await fetchPage(
    slugify("Контакты", { lower: true, strict: true })
  )
  const data = response.data

  return generateSeoViewport(data)
}

const Contacts = async () => {
  const content = await fetchPage(
    slugify("Контакты", { lower: true, strict: true })
  )
  const sections = content.data.sections
  return (
    <SectionsProvider initialState={{ sections }}>
      <PageLayoutMain>
        <ContactsPage />
      </PageLayoutMain>
    </SectionsProvider>
  )
}

export default Contacts
