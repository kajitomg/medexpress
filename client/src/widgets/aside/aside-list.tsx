"use client"

import { CategoryBase, CategoryOptions } from "@/entities/category/model"
import { useCatalogOptionsStore } from "@/features/catalog/store"
import { DocumentId, DocumentServices } from "@/shared/model"
import { List } from "@/shared/ui/list"
import { AsideItem } from "@/widgets/aside/aside-item"
import { useCallback } from "react"

interface CategoriesListProps {
  categories: (CategoryBase & Partial<CategoryOptions & DocumentServices>)[]
  selectedCategory: DocumentId
}

const AsideList = ({ categories, selectedCategory }: CategoriesListProps) => {
  const { changeSearchQuery } = useCatalogOptionsStore((state) => state)

  const callbacks = {
    resetOptions: () => {
      changeSearchQuery(null)
    },
  }

  const renders = {
    categoryItem: useCallback(
      (item: (typeof categories)[0]) => {
        const isAvailable = item.id === selectedCategory
        const isChildrensAvailable = item.childrens?.some(
          (item) => item.id === selectedCategory
        )
        return (
          <AsideItem
            key={item.id}
            category={item}
            selectedCategory={selectedCategory}
            available={isAvailable}
            expanded={Boolean(isAvailable || isChildrensAvailable)}
            resetOptions={callbacks.resetOptions}
          />
        )
      },
      [selectedCategory]
    ),
  }
  return <List items={categories} renderItem={renders.categoryItem} />
}

export { AsideList }
