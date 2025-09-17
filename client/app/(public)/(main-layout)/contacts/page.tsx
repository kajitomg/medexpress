import { fetchPage } from "@/entities/page/services"
import { SectionsProvider } from "@/features/sections/provider"
import { ContactsPage } from "@/views/contacts/ui"
import { Metadata } from "next"
import * as React from "react"
import slugify from "slugify"

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetchPage(
    slugify("Контакты", { lower: true, strict: true })
  )
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
  }
}

const Contacts = async () => {
  const response = await fetchPage(
    slugify("Контакты", { lower: true, strict: true })
  )
  const data = response.data
  return (
    <SectionsProvider initialState={{ sections: data.sections }}>
      <ContactsPage />
    </SectionsProvider>
  )
}

export default Contacts
