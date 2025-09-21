import { fetchCatalogCollectionsList } from "@/entities/collection/services"
import { fetchPage } from "@/entities/page/services"
import { CatalogOptionsProvider } from "@/features/catalog/provider"
import { CollectionsListProvider } from "@/features/catalog/provider/collections-list-provider"
import { SectionsProvider } from "@/features/sections/provider"
import { generatePageMetadata } from "@/shared/lib/generate-page-metadata"
import { CollectionsPage } from "@/views/collections/ui"
import { Metadata, NextPage, Viewport } from "next"
import slugify from "slugify"

interface CollectionsPageProps {
  searchParams: Promise<{ options?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetchPage(
    slugify("Подборки", { lower: true, strict: true })
  )

  const data = response.data

  return generatePageMetadata(data)
}

export async function generateViewport(): Promise<Viewport | string> {
  const response = await fetchPage(
    slugify("Подборки", { lower: true, strict: true })
  )
  const data = response.data
  if (!data || !data.seo.metaViewport) {
    return {}
  }
  return data.seo.metaViewport
}

const Page: NextPage<CollectionsPageProps> = async ({ searchParams }) => {
  const search = await searchParams
  const searchQuery: string | undefined =
    search?.options && JSON.parse(search?.options).state.searchQuery

  const content = await fetchPage(
    slugify("Подборки", { lower: true, strict: true })
  )
  const sections = content.data.sections

  const response = await fetchCatalogCollectionsList(searchQuery)
  const collections = response.data

  return (
    <SectionsProvider initialState={{ sections }}>
      <CatalogOptionsProvider initialState={{ searchQuery }} skipHydration>
        <CollectionsListProvider initialState={{ collections }}>
          <CollectionsPage />
        </CollectionsListProvider>
      </CatalogOptionsProvider>
    </SectionsProvider>
  )
}

export default Page
