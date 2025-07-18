import { fetchAllProducts } from "@/entities/product/services"
import { routes } from "@/shared/config/routes"
import { PageHeroRoutes } from "@/shared/ui"
import { Catalog } from "@/widgets/catalog/catalog"
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
    <div className="p-2">
      <PageHeroRoutes page={routes.CATALOG(category_id)} />
      <Catalog
        category_id={category_id}
        initProducts={products}
        initSearchQuery={searchQuery}
        initMaxPages={maxPages}
      />
    </div>
  )
}

export default Page
