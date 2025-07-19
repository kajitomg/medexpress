import { fetchAllProducts } from "@/entities/product/services"
import { CatalogPage } from "@/pages/catalog/ui/catalog-page"
import { NextPage } from "next"

interface CatalogPageProps {
  params: Promise<{ category_id: string }>
  searchParams: Promise<{ options?: string }>
}

const Page: NextPage<CatalogPageProps> = async ({ params, searchParams }) => {
  const { category_id } = await params
  const search = await searchParams
  const searchQuery: string | null = search?.options
    ? JSON.parse(search?.options).state.searchQuery
    : null
  const page: string =
    (search?.options && JSON.parse(search?.options).state.page) || 1
  const data = await fetchAllProducts(+page, [+category_id], searchQuery)
  const products = data?.data || []
  const maxPages = data?.meta.pagination.pageCount || null

  return (
    <CatalogPage
      category_id={category_id}
      initSearchQuery={searchQuery}
      initMaxPages={maxPages}
      initProducts={products}
    />
  )
}

export default Page
