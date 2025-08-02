import { fetchCategoriesProductsList } from "@/entities/product/services"
import {
  CatalogOptionsProvider,
  ProductsListProvider,
} from "@/features/catalog/provider"
import { CategoryProductsPage } from "@/pages/category-products/ui"
import { NextPage } from "next"

interface CatalogPageProps {
  params: Promise<{ category_id: string }>
  searchParams: Promise<{ options?: string }>
}

const Page: NextPage<CatalogPageProps> = async ({ params, searchParams }) => {
  const { category_id } = await params
  const search = await searchParams
  const searchQuery: string | undefined =
    search?.options && JSON.parse(search?.options).state.searchQuery

  const page = (search?.options && +JSON.parse(search?.options).state.page) || 1
  const response = await fetchCategoriesProductsList(
    +category_id,
    page,
    searchQuery
  )
  const products = response?.data
  const maxPages = response?.meta.pagination.pageCount

  return (
    <CatalogOptionsProvider
      initialState={{ searchQuery, page, maxPages }}
      skipHydration
    >
      <ProductsListProvider initialState={{ products }}>
        <CategoryProductsPage categoryId={+category_id} />
      </ProductsListProvider>
    </CatalogOptionsProvider>
  )
}

export default Page
