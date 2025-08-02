import { fetchCatalogCategoriesList } from "@/entities/category/services"
import {
  CatalogOptionsProvider,
  CategoriesListProvider,
} from "@/features/catalog/provider"
import { CatalogCategoriesPage } from "@/pages/catalog-categories/ui"
import { NextPage } from "next"

interface CatalogPageProps {
  searchParams: Promise<{ options?: string }>
}

const Page: NextPage<CatalogPageProps> = async ({ searchParams }) => {
  const { options } = await searchParams
  const searchQuery: string | undefined =
    options && JSON.parse(options).state.searchQuery

  const response = await fetchCatalogCategoriesList(searchQuery)
  const categories = response.data

  return (
    <CatalogOptionsProvider initialState={{ searchQuery }} skipHydration>
      <CategoriesListProvider initialState={{ categories }}>
        <CatalogCategoriesPage />
      </CategoriesListProvider>
    </CatalogOptionsProvider>
  )
}

export default Page
