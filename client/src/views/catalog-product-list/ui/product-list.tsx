"use client"

import { ProductBase } from "@/entities/product/model"
import { CatalogProductItem } from "@/features/catalog/ui"
import { useGlobalStore } from "@/features/global/provider"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { List } from "@/shared/ui/list"
import * as React from "react"
import { ComponentProps, useCallback } from "react"

interface ProductsListProps {
  products?: (ProductBase & DocumentServices)[]
}

const ProductList = ({
  products,
  className,
  ...props
}: ComponentProps<"div"> & ProductsListProps) => {
  const defaultMedia = useGlobalStore(
    (store) => store.item?.defaultProductImage
  )

  const renderCatalogItem = useCallback(
    (item: ProductBase & DocumentServices) => {
      return (
        <CatalogProductItem
          key={item.id}
          product={{
            ...item,
            images: item.images || (defaultMedia && [defaultMedia]),
          }}
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

export { ProductList }
