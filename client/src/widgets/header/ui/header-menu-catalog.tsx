import { fetchNavigationCategoryList } from "@/entities/category/services"
import { CategoryListProvider } from "@/features/catalog/provider"
import { MenuCatalog } from "@/widgets/menu-catalog/ui"
import * as React from "react"

const HeaderMenuCatalog = async () => {
  const response = await fetchNavigationCategoryList()

  const categories = response.data

  return (
    <CategoryListProvider initialState={{ list: categories }}>
      <MenuCatalog />
    </CategoryListProvider>
  )
}

export { HeaderMenuCatalog }
