import { CategoryBase } from "@/entities/category/model"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { List } from "@/shared/ui/list"
import { CategoryItem } from "@/widgets/menu-catalog/ui/category-item"
import { ComponentProps, useCallback, useRef } from "react"

interface CategoriesListProps {
  categories?: (CategoryBase & DocumentServices)[]
  selectedCategory: number
  setSelectedCategory: (index: number) => void
}

const CategoriesList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  className,
}: ComponentProps<"ul"> & CategoriesListProps) => {
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = useCallback(
    (index: number) => () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current)
      }

      hoverTimeout.current = setTimeout(() => {
        setSelectedCategory(index)
      }, 300)
    },
    [hoverTimeout, setSelectedCategory]
  )

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current)
    }
  }, [hoverTimeout])

  const renderMenuCatalogCategoryItem = useCallback(
    (item: CategoryBase & DocumentServices, index: number) => (
      <CategoryItem
        key={item.id}
        category={item}
        selectedCategory={index === selectedCategory}
        handleMouseEnter={handleMouseEnter(index)}
        handleMouseLeave={handleMouseLeave}
      />
    ),
    [handleMouseEnter, handleMouseLeave, selectedCategory]
  )

  return (
    <List
      as="ul"
      items={categories}
      renderItem={renderMenuCatalogCategoryItem}
      className={cn(className)}
    />
  )
}

export { CategoriesList }
