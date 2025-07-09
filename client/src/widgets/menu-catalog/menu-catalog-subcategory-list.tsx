import { CategoryBase } from "@/entities/category/model"
import { List } from "@/shared/ui/list"
import { MenuCatalogSubcategoryItem } from "@/widgets/menu-catalog/menu-catalog-subcategory-item"
import { ComponentProps } from "react"

interface MenuCatalogSubcategoryListProps {
  subcategories: CategoryBase[]
}

const MenuCatalogSubcategoryList = ({
  subcategories,
}: ComponentProps<"div"> & MenuCatalogSubcategoryListProps) => {
  const renders = {
    menuCatalogSubcategoryItem: (item: (typeof subcategories)[0]) => (
      <MenuCatalogSubcategoryItem key={item.id} category={item} />
    ),
  }

  return (
    <List
      items={subcategories}
      renderItem={renders.menuCatalogSubcategoryItem}
      className="block gap-2 p-4 columns-3"
    />
  )
}

export { MenuCatalogSubcategoryList }
