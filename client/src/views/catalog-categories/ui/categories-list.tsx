"use client"

import { CategoryBase } from "@/entities/category/model"
import { CatalogCategoryItem } from "@/features/catalog/ui"
import { useGlobalStore } from "@/features/global/provider"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { List } from "@/shared/ui/list"
import * as React from "react"
import { ComponentProps, useCallback } from "react"

interface CategoriesListProps {
  categories?: (CategoryBase & DocumentServices)[]
}

const CategoriesList = ({
  categories,
  className,
  ...props
}: ComponentProps<"div"> & CategoriesListProps) => {
  const defaultMedia = useGlobalStore(
    (store) => store.data?.defaultCategoryImage
  )

  const renderCatalogItem = useCallback(
    (item: CategoryBase & DocumentServices) => {
      return (
        <CatalogCategoryItem
          key={item.id}
          category={{ ...item, media: item.media || defaultMedia }}
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
        `grid grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(350px,1fr))] md:grid-cols-[repeat(auto-fill,_minmax(500px,1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(800px,1fr))] gap-2`,
        className
      )}
      {...props}
    />
  )
}

export { CategoriesList }
