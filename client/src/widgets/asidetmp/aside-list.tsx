"use client"

import { CategoryBase, CategoryOptions } from "@/entities/category/model"
import { useCatalogOptionsStore } from "@/features/catalog/store"
import { DocumentId, DocumentServices } from "@/shared/model"
import { List } from "@/shared/ui/list"
import { AsideItem } from "@/widgets/asidetmp/aside-item"
import { ComponentProps, useCallback } from "react"

interface CategoriesListProps {
  categories: (CategoryBase & Partial<CategoryOptions & DocumentServices>)[]
  selectedCategory: DocumentId
}

const AsideList = ({
  categories,
  selectedCategory,
}: ComponentProps<"div"> & CategoriesListProps) => {
  const { changeSearchQuery } = useCatalogOptionsStore((state) => state)

  const callbacks = {
    resetOptions: () => {
      changeSearchQuery(null)
    },
  }

  const renders = {
    categoryItem: useCallback(
      (item: (typeof categories)[0]) => (
        <AsideItem
          key={item.id}
          category={item}
          selectedCategory={selectedCategory}
          available={item.id === selectedCategory}
          resetOptions={callbacks.resetOptions}
        />
      ),
      [selectedCategory]
    ),
  }
  return <List items={categories} renderItem={renders.categoryItem} />
}

export { AsideList }
