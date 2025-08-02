"use client"

import { ProductBase } from "@/entities/product/model"
import { ProductItem } from "@/pages/category-products/ui/product-item"
import { DocumentServices } from "@/shared/model"
import { List } from "@/shared/ui/list"
import * as React from "react"
import { useCallback } from "react"

interface ProductsListProps {
  products: (ProductBase & DocumentServices)[]
}

const ProductsList = ({ products }: ProductsListProps) => {
  const renderCatalogItem = useCallback(
    (item: ProductBase & DocumentServices) => {
      return <ProductItem key={item.id} product={item} />
    },
    []
  )
  return (
    <List
      items={products}
      renderItem={renderCatalogItem}
      className={`grid grid-cols-[repeat(auto-fill,_minmax(320px,1fr))] gap-2`}
    />
  )
}

export { ProductsList }
