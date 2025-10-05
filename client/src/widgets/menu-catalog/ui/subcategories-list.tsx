import { CategoryBase } from "@/entities/device-section/model"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { List } from "@/shared/ui/list"
import { SubcategoryItem } from "@/widgets/menu-catalog/ui/subcategory-item"
import { ComponentProps } from "react"

interface SubcategoryListProps {
  subcategories: CategoryBase[]
}

const SubcategoriesList = ({
  subcategories,
  className,
}: ComponentProps<"ul"> & SubcategoryListProps) => {
  const renderMenuCatalogSubcategoryItem = (
    item: CategoryBase & DocumentServices
  ) => <SubcategoryItem key={item.id} category={item} />

  return (
    <List
      as="ul"
      items={subcategories}
      renderItem={renderMenuCatalogSubcategoryItem}
      className={cn(className)}
    />
  )
}

export { SubcategoriesList }
