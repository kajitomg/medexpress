"use client"

import { CollectionBase } from "@/entities/collection/model"
import { CatalogCollectionItem } from "@/features/catalog/ui"
import { useSettingsStore } from "@/features/settings/provider"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { List } from "@/shared/ui/list"
import * as React from "react"
import { ComponentProps, useCallback } from "react"

interface CategoriesListProps {
  collections?: (CollectionBase & DocumentServices)[]
}

const CollectionsList = ({
  collections,
  className,
  ...props
}: ComponentProps<"div"> & CategoriesListProps) => {
  const defaultMedia = useSettingsStore(
    (store) => store.data?.collection_default_media
  )
  const renderCollectionItem = useCallback(
    (item: CollectionBase & DocumentServices) => {
      return (
        <CatalogCollectionItem
          key={item.id}
          collection={{ ...item, media: item.media || defaultMedia }}
        />
      )
    },
    [defaultMedia]
  )
  return (
    <List
      items={collections}
      renderItem={renderCollectionItem}
      className={cn(
        `grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] gap-2`,
        className
      )}
      {...props}
    />
  )
}

export { CollectionsList }
