"use client"

import { CategoryBase } from "@/entities/category/model"
import { DocumentServices } from "@/shared/model"
import { List } from "@/shared/ui/list"
import { CategoryItem } from "@/widgets/catalog-categories-navigation-sidebar/ui/category-item"
import { ComponentProps, useCallback } from "react"

interface CategoriesListProps {
  categories?: (CategoryBase & DocumentServices)[]
  selectedCategory: string
}

const CategoriesList = ({
  categories,
  selectedCategory,
  className,
  ...props
}: ComponentProps<"div"> & CategoriesListProps) => {
  const renderNavigationCategoryItem = useCallback(
    (item: CategoryBase & DocumentServices) => {
      // Проблема производительности
      const isAvailable = item.slug === selectedCategory
      const isChildrensAvailable = item.childrens?.some(
        (item: CategoryBase & DocumentServices) =>
          item.slug === selectedCategory
      )
      return (
        <CategoryItem
          key={item.id}
          category={item}
          selectedCategory={selectedCategory}
          available={isAvailable}
          expanded={Boolean(isAvailable || isChildrensAvailable)}
        />
      )
    },
    [selectedCategory]
  )

  return (
    <List
      as="nav"
      items={categories}
      renderItem={renderNavigationCategoryItem}
      className={className}
      {...props}
    />
  )
}

export { CategoriesList }
