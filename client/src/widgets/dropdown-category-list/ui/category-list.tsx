import { CategoryBase } from "@/entities/category/model"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { List } from "@/shared/ui/list"
import { CategoryItem } from "@/widgets/dropdown-category-list/ui/category-item"
import { ComponentProps, useCallback } from "react"

interface CategoryListProps {
  categories?: CategoryBase[]
  handleMouseEnter: (index: number, delay?: number) => () => void
  handleMouseLeave: () => void
}

const CategoryList = ({
  categories,
  handleMouseEnter,
  handleMouseLeave,
  className,
}: ComponentProps<"ul"> & CategoryListProps) => {
  const renderMenuCatalogCategoryItem = useCallback(
    (item: CategoryBase, index: number) => (
      <CategoryItem
        key={item.slug}
        title={item.name}
        href={routes.CATALOG(item.slug).path}
        onMouseEnter={handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      />
    ),
    [handleMouseEnter, handleMouseLeave]
  )

  return (
    <List
      as="ul"
      items={categories}
      renderItem={renderMenuCatalogCategoryItem}
      className={cn(className, "grid gap-2 grid-cols-2 lg:grid-cols-3 ")}
    />
  )
}

export { CategoryList }
