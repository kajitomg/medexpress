import { fetchCatalogCategoryList } from "@/entities/category/services"
import { fetchPage } from "@/entities/page/services"
import { CatalogCategoryOptionsProvider } from "@/features/catalog/provider"
import { CategoryListProvider } from "@/features/category/provider"
import { SectionListProvider } from "@/features/sections/provider"
import { generatePageMetadata } from "@/shared/lib/generate-page-metadata"
import { generateSeoViewport } from "@/shared/lib/generate-seo-viewport"
import { PageLayoutMain } from "@/shared/ui"
import { CatalogCategoryListPage } from "@/views/catalog-category-list/ui"
import { Metadata, NextPage, Viewport } from "next"
import slugify from "slugify"

interface CatalogPageProps {
  searchParams: Promise<{ options?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetchPage(
    slugify("Каталог", { lower: true, strict: true })
  )

  const data = response.data

  return generatePageMetadata(data)
}

export async function generateViewport(): Promise<Viewport | string> {
  const response = await fetchPage(
    slugify("Каталог", { lower: true, strict: true })
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
  const sections = content.data?.sections

  const response = await fetchCatalogCategoryList(1, searchQuery)
  const categories = response?.data

  return (
    <SectionListProvider initialState={{ sections }}>
      <CatalogCategoryOptionsProvider
        initialState={{ search: { query: searchQuery } }}
        skipHydration
      >
        <CategoryListProvider initialState={{ list: categories }}>
          <PageLayoutMain>
            <CatalogCategoryListPage />
          </PageLayoutMain>
        </CategoryListProvider>
      </CatalogCategoryOptionsProvider>
    </SectionListProvider>
  )
}

export default Page
