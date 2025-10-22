"use client"

import { CategoryBase } from "@/entities/category/model"
import { useGlobalStore } from "@/features/global/provider"
import { cn } from "@/shared/lib"
import { List } from "@/shared/ui/list"
import { CategoryItemCard } from "@/views/catalog-category-list/ui/category-item-card"
import * as React from "react"
import { ComponentProps, useCallback } from "react"

interface CategoriesListProps {
  categories?: CategoryBase[]
}

const CategoryList = ({
  categories,
  className,
  ...props
}: ComponentProps<"div"> & CategoriesListProps) => {
  const defaultMedia = useGlobalStore(
    (store) => store.item?.defaultCategoryImage
  )

  const renderCatalogItem = useCallback(
    (item: CategoryBase) => {
      return (
        <CategoryItemCard
          key={item.id}
          category={{ ...item, image: item.image || defaultMedia }}
        />
      )
    },
    [defaultMedia]
  )
  return (
    <List
      items={categories}
      renderItem={renderCatalogItem}
      className={cn(
        `grid grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] md:grid-cols-[repeat(auto-fill,_minmax(350px,1fr))] gap-2`,
        className
      )}
      {...props}
    />
  )
}

export { CategoryList }
