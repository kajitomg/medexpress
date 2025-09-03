"use client"

import { ProductBase } from "@/entities/product/model"
import { CatalogProductItem } from "@/features/catalog/ui"
import { useSettingsStore } from "@/features/settings/provider"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { List } from "@/shared/ui/list"
import * as React from "react"
import { ComponentProps, useCallback } from "react"

interface ProductsListProps {
  products?: (ProductBase & DocumentServices)[]
}

const ProductsList = ({
  products,
  className,
  ...props
}: ComponentProps<"div"> & ProductsListProps) => {
  const defaultMedia = useSettingsStore(
    (store) => store.data?.product_default_media
  )

  const renderCatalogItem = useCallback(
    (item: ProductBase & DocumentServices) => {
      return (
        <CatalogProductItem
          key={item.id}
          product={{ ...item, media: item.media || defaultMedia }}
        />
      )
    },
    [defaultMedia]
  )

  return (
    <List
      items={products}
      renderItem={renderCatalogItem}
      className={cn(
        `grid grid-cols-[repeat(auto-fill,_minmax(320px,1fr))] gap-2`,
        className
      )}
      {...props}
    />
  )
}

export { ProductsList }
