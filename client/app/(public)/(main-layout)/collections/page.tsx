import { fetchCatalogCollectionsList } from "@/entities/collection/services"
import { CatalogOptionsProvider } from "@/features/catalog/provider"
import { CollectionsListProvider } from "@/features/catalog/provider/collections-list-provider"
import { CollectionsPage } from "@/pages/collections/ui"
import { NextPage } from "next"

interface CollectionsPageProps {
  searchParams: Promise<{ options?: string }>
}

const Page: NextPage<CollectionsPageProps> = async ({ searchParams }) => {
  const search = await searchParams
  const searchQuery: string | undefined =
    search?.options && JSON.parse(search?.options).state.searchQuery

  const response = await fetchCatalogCollectionsList(searchQuery)
  const collections = response.data

  return (
    <CatalogOptionsProvider initialState={{ searchQuery }} skipHydration>
      <CollectionsListProvider initialState={{ collections }}>
        <CollectionsPage />
      </CollectionsListProvider>
    </CatalogOptionsProvider>
  )
}

export default Page
