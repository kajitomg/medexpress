import { CategoryBase } from "@/entities/category/model"
import { cn } from "@/shared/lib"
import { List } from "@/shared/ui/list"
import { MenuCatalogCategoryItem } from "@/widgets/menu-catalog/ui/menu-catalog-category-item"
import { ComponentProps, useCallback } from "react"

interface MenuCatalogCategoryListProps {
  categories: CategoryBase[]
  selectedIndex: number
  handleMouseEnter: (index: number) => () => void
  handleMouseLeave: () => void
}

const MenuCatalogCategoryList = ({
  categories,
  selectedIndex,
  handleMouseEnter,
  handleMouseLeave,
  className,
}: ComponentProps<"ul"> & MenuCatalogCategoryListProps) => {
  const renders = {
    menuCatalogCategoryItem: useCallback(
      (item: (typeof categories)[0], index: number) => (
        <MenuCatalogCategoryItem
          key={item.id}
          category={item}
          selectedCategory={index === selectedIndex}
          handleMouseEnter={handleMouseEnter(index)}
          handleMouseLeave={handleMouseLeave}
        />
      ),
      [handleMouseEnter, handleMouseLeave, selectedIndex]
    ),
  }

  return (
    <List
      as="ul"
      items={categories}
      renderItem={renders.menuCatalogCategoryItem}
      className={cn(className)}
    />
  )
}

export { MenuCatalogCategoryList }
