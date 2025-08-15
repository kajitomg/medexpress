import { fetchNavigationCategoriesList } from "@/entities/category/services"
import { CategoriesListProvider } from "@/features/catalog/provider"
import { MenuCatalog } from "@/widgets/menu-catalog/ui"
import * as React from "react"

const HeaderMenuCatalog = async () => {
  const responseCategories = await fetchNavigationCategoriesList()

  const categories = responseCategories.data

  return (
    <CategoriesListProvider initialState={{ categories }}>
      <MenuCatalog />
    </CategoriesListProvider>
  )
}

export { HeaderMenuCatalog }
