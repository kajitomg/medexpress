import { CategoryBase } from "@/entities/category/model"
import { cn } from "@/shared/lib"
import { List } from "@/shared/ui/list"
import { MenuCatalogSubcategoryItem } from "@/widgets/menu-catalog/menu-catalog-subcategory-item"
import { ComponentProps } from "react"

interface MenuCatalogSubcategoryListProps {
  subcategories: CategoryBase[]
}

const MenuCatalogSubcategoryList = ({
  subcategories,
  className,
}: ComponentProps<"ul"> & MenuCatalogSubcategoryListProps) => {
  const renders = {
    menuCatalogSubcategoryItem: (item: (typeof subcategories)[0]) => (
      <MenuCatalogSubcategoryItem key={item.id} category={item} />
    ),
  }

  return (
    <List
      as="ul"
      items={subcategories}
      renderItem={renders.menuCatalogSubcategoryItem}
      className={cn(className)}
    />
  )
}

export { MenuCatalogSubcategoryList }
