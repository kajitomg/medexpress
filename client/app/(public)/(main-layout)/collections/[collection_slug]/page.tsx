import { fetchDetailCollectionItem } from "@/entities/collection/services"
import { fetchCollectionsProductsList } from "@/entities/product/services"
import {
  CatalogOptionsProvider,
  ProductsListProvider,
} from "@/features/catalog/provider"
import { CollectionDetailsProvider } from "@/features/collection-details/provider"
import { CollectionProductsPage } from "@/pages/collection-products/ui"

interface CompilationPageProps {
  params: Promise<{ collection_slug: string }>
  searchParams: Promise<{ options?: string }>
}

const Page = async ({ params, searchParams }: CompilationPageProps) => {
  const { collection_slug } = await params
  const search = await searchParams
  const searchQuery: string | undefined =
    search?.options && JSON.parse(search?.options).state.searchQuery

  const page = (search?.options && +JSON.parse(search?.options).state.page) || 1
  const responseCollection = await fetchDetailCollectionItem(collection_slug)
  const response = await fetchCollectionsProductsList(
    collection_slug,
    page,
    searchQuery
  )

  const collection = responseCollection?.data
  const products = response?.data
  const maxPages = response?.meta.pagination.pageCount

  return (
    <CollectionDetailsProvider initialState={{ collection }}>
      <CatalogOptionsProvider
        initialState={{ searchQuery, page, maxPages }}
        skipHydration
      >
        <ProductsListProvider initialState={{ products }}>
          <CollectionProductsPage slug={collection_slug} />
        </ProductsListProvider>
      </CatalogOptionsProvider>
    </CollectionDetailsProvider>
  )
}

export default Page
