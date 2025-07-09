"use client"

import { ProductBase } from "@/entities/product/model"
import { useCartStore } from "@/features/cart/store"
import {
  useCatalogOptionsStore,
  useProductsListStore,
} from "@/features/catalog/store"
import { List } from "@/shared/ui/list"
import { CatalogItem } from "@/widgets/catalog/catalog-item"
import * as React from "react"
import { ComponentProps, useCallback, useEffect, useState } from "react"

interface CatalogListProps {
  initProducts: ProductBase[]
  category_id: string
}

const CatalogList = ({
  category_id,
  initProducts,
}: ComponentProps<"div"> & CatalogListProps) => {
  const [isClient, setIsClient] = useState(false)
  const { products } = useProductsListStore((state) => state)
  const { searchQuery } = useCatalogOptionsStore((state) => state)

  const fetchAllProducts = useProductsListStore(
    (state) => state.fetchAllProducts
  )
  const setProducts = useProductsListStore((state) => state.setProducts)

  const { getCartItem, addItemToCart, deleteItemFromCart } = useCartStore(
    (state) => state
  )
  const callbacks = {
    onActionButton: (item: ProductBase, isInCart: boolean) => () => {
      if (isInCart) deleteItemFromCart(item.id)
      else addItemToCart(item)
    },
  }

  const renders = {
    catalogItem: useCallback(
      (item: (typeof products)[0]) => {
        const isInCart = Boolean(getCartItem(item.id)?.count)
        return (
          <CatalogItem
            key={item.id}
            product={item}
            isInCart={isInCart}
            onActionButton={callbacks.onActionButton(item, isInCart)}
            isClient={isClient}
          />
        )
      },
      [getCartItem, isClient, callbacks]
    ),
  }

  useEffect(() => {
    setProducts(initProducts)
    setIsClient(true)
  }, [initProducts])

  useEffect(() => {
    if (isClient && searchQuery) {
      fetchAllProducts(+category_id, searchQuery)
    }
  }, [searchQuery])

  return (
    <List
      items={products.length ? products : initProducts}
      renderItem={renders.catalogItem}
      className={`grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] gap-2`}
    />
  )
}

export { CatalogList }
