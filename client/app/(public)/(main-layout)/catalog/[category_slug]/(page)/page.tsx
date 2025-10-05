import { fetchDetailCategoryItem } from "@/entities/category/services"
import { fetchCategoriesProductList } from "@/entities/product/services"
import {
  CatalogOptionsProvider,
  ProductsListProvider,
} from "@/features/catalog/provider"
import { CategoryDetailsProvider } from "@/features/category-details/provider"
import { generatePageMetadata } from "@/shared/lib/generate-page-metadata"
import { generateSeoViewport } from "@/shared/lib/generate-seo-viewport"
import { CategoryProductsPage } from "@/views/category-products/ui"
import { Metadata, NextPage, Viewport } from "next"

interface CatalogPageProps {
  params: Promise<{ category_slug: string }>
  searchParams: Promise<{ options?: string }>
}

export async function generateMetadata({
  params,
}: CatalogPageProps): Promise<Metadata> {
  const { category_slug } = await params

  const response = await fetchDetailCategoryItem(category_slug)

  const data = response.data

  return generatePageMetadata(data, {
    defaultTitle: data.name || "Страница не найдена",
  })
}

export async function generateViewport({
  params,
}: CatalogPageProps): Promise<Viewport | string> {
  const { category_slug } = await params

  const response = await fetchDetailCategoryItem(category_slug)

  const data = response.data

  return generateSeoViewport(data)
}

const Page: NextPage<CatalogPageProps> = async ({ params, searchParams }) => {
  const { category_slug } = await params
  const search = await searchParams
  const searchQuery: string | undefined =
    search?.options && JSON.parse(search?.options).state.searchQuery

  const page = (search?.options && +JSON.parse(search?.options).state.page) || 1
  const responseCategory = await fetchDetailCategoryItem(category_slug)
  const response = await fetchCategoriesProductList(
    category_slug,
    page,
    searchQuery
  )

  const category = responseCategory?.data
  const products = response?.data
  const maxPages = response?.meta.pagination.pageCount

  return (
    <CategoryDetailsProvider initialState={{ category }}>
      <CatalogOptionsProvider
        initialState={{ searchQuery, page, maxPages }}
        skipHydration
      >
        <ProductsListProvider initialState={{ products }}>
          <CategoryProductsPage slug={category_slug} />
        </ProductsListProvider>
      </CatalogOptionsProvider>
    </CategoryDetailsProvider>
  )
}

export default Page
