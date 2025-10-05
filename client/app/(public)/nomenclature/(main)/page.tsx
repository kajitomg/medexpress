import { fetchClassificationsDeviceSectionList } from "@/entities/device-section/services"
import { fetchPage } from "@/entities/page/services"
import {
  CatalogOptionsProvider,
  ClassificationListProvider,
} from "@/features/catalog/provider"
import { SectionsProvider } from "@/features/sections/provider"
import { generatePageMetadata } from "@/shared/lib/generate-page-metadata"
import { generateSeoViewport } from "@/shared/lib/generate-seo-viewport"
import { NomenclaturesPage } from "@/views/nomenclatures/ui"
import { Metadata, NextPage, Viewport } from "next"
import slugify from "slugify"

interface CatalogPageProps {
  searchParams: Promise<{ options?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetchPage(
    slugify("Классификация", { lower: true, strict: true })
  )

  const data = response.data

  return generatePageMetadata(data)
}

export async function generateViewport(): Promise<Viewport | string> {
  const response = await fetchPage(
    slugify("Классификация", { lower: true, strict: true })
  )
  const data = response.data

  return generateSeoViewport(data)
}

const Page: NextPage<CatalogPageProps> = async ({ searchParams }) => {
  const { options } = await searchParams
  const searchQuery: string | undefined =
    options && JSON.parse(options).state.searchQuery

  const content = await fetchPage(
    slugify("Каталог", { lower: true, strict: true })
  )
  const sections = content.data.sections

  const response = await fetchClassificationsDeviceSectionList(1, searchQuery)
  const classifications = response?.data

  return (
    <SectionsProvider initialState={{ sections }}>
      <CatalogOptionsProvider initialState={{ searchQuery }} skipHydration>
        <ClassificationListProvider initialState={{ list: classifications }}>
          <NomenclaturesPage />
        </ClassificationListProvider>
      </CatalogOptionsProvider>
    </SectionsProvider>
  )
}

export default Page
