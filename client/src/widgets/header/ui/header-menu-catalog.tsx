import { fetchNavigationCategoryList } from "@/entities/category/services"
import { CategoryListProvider } from "@/features/category/provider"
import { DropdownCategoryList } from "@/widgets/dropdown-category-list/ui"
import * as React from "react"

const HeaderMenuCatalog = async () => {
  const response = await fetchNavigationCategoryList()

  const categories = response.data

  return (
    <CategoryListProvider initialState={{ list: categories }}>
      <DropdownCategoryList />
    </CategoryListProvider>
  )
}

export { HeaderMenuCatalog }
