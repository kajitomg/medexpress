import { fetchDetailCategoryItem } from "@/entities/category/services/fetch-detail-category-item"
import { fetchCategoriesProductsList } from "@/entities/product/services"
import {
  CatalogOptionsProvider,
  ProductsListProvider,
} from "@/features/catalog/provider"
import { CategoryDetailsProvider } from "@/features/category-details/provider"
import { CategoryProductsPage } from "@/pages/category-products/ui"
import { NextPage } from "next"

interface CatalogPageProps {
  params: Promise<{ category_slug: string }>
  searchParams: Promise<{ options?: string }>
}

const Page: NextPage<CatalogPageProps> = async ({ params, searchParams }) => {
  const { category_slug } = await params
  const search = await searchParams
  const searchQuery: string | undefined =
    search?.options && JSON.parse(search?.options).state.searchQuery

  const page = (search?.options && +JSON.parse(search?.options).state.page) || 1
  const responseCategory = await fetchDetailCategoryItem(category_slug)
  const response = await fetchCategoriesProductsList(
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
