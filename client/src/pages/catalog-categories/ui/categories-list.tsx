"use client"

import { CategoryBase } from "@/entities/category/model"
import { CategoryItem } from "@/pages/catalog-categories/ui/category-item"
import { DocumentServices } from "@/shared/model"
import { List } from "@/shared/ui/list"
import * as React from "react"
import { useCallback } from "react"

interface CategoriesListProps {
  categories: (CategoryBase & DocumentServices)[]
}

const CategoriesList = ({ categories }: CategoriesListProps) => {
  const renderCatalogItem = useCallback(
    (item: CategoryBase & DocumentServices) => {
      return <CategoryItem key={item.id} category={item} />
    },
    []
  )
  return (
    <List
      items={categories}
      renderItem={renderCatalogItem}
      className={`my-8 p-4 grid grid-cols-[repeat(auto-fill,_minmax(800px,1fr))] gap-4`}
    />
  )
}

export { CategoriesList }
