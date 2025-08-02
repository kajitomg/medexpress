import { fetchCollectionsProductsList } from "@/entities/product/services"
import {
  CatalogOptionsProvider,
  ProductsListProvider,
} from "@/features/catalog/provider"
import { CollectionProductsPage } from "@/pages/collection-products/ui"

interface CompilationPageProps {
  params: Promise<{ collection_id: string }>
  searchParams: Promise<{ options?: string }>
}

const Page = async ({ params, searchParams }: CompilationPageProps) => {
  const { collection_id } = await params
  const search = await searchParams
  const searchQuery: string | undefined =
    search?.options && JSON.parse(search?.options).state.searchQuery

  const page = (search?.options && +JSON.parse(search?.options).state.page) || 1
  const response = await fetchCollectionsProductsList(
    +collection_id,
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
        <CollectionProductsPage collectionId={+collection_id} />
      </ProductsListProvider>
    </CatalogOptionsProvider>
  )
}

export default Page
