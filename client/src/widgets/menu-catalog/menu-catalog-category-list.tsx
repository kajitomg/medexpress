import { CategoryBase } from "@/entities/category/model"
import { List } from "@/shared/ui/list"
import { MenuCatalogCategoryItem } from "@/widgets/menu-catalog/menu-catalog-category-item"
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
}: ComponentProps<"div"> & MenuCatalogCategoryListProps) => {
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
      items={categories}
      renderItem={renders.menuCatalogCategoryItem}
      className="w-80"
    />
  )
}

export { MenuCatalogCategoryList }
