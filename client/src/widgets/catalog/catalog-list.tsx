"use client"

import { ProductBase } from "@/entities/product/model"
import { useCartStore } from "@/features/cart/store"
import { useCatalogOptionsStore } from "@/features/catalog/store"
import { getPaginationRange } from "@/shared/lib/get-pagination-range"
import { List } from "@/shared/ui/list"
import { CatalogItem } from "@/widgets/catalog/catalog-item"
import { CatalogPagination } from "@/widgets/catalog/catalog-pagination"
import * as React from "react"
import { useCallback, useEffect, useMemo, useState } from "react"

interface CatalogListProps {
  products: ProductBase[]
  maxPages: number
}

const CatalogList = ({ products, maxPages }: CatalogListProps) => {
  const [isClient, setIsClient] = useState(false)

  const page = useCatalogOptionsStore((state) => state.page)
  const setPage = useCatalogOptionsStore((state) => state.setPage)
  const cartProducts = useCartStore((state) => state.products)
  const addItemToCart = useCartStore((state) => state.addItemToCart)
  const deleteItemFromCart = useCartStore((state) => state.deleteItemFromCart)

  const paginationRange = useMemo(
    () => getPaginationRange(page, maxPages || page),
    [maxPages, page]
  )

  const callbacks = {
    onActionButton: (item: ProductBase, isInCart: boolean) => () => {
      if (isInCart) deleteItemFromCart(item.id)
      else addItemToCart(item)
    },
    onSetPage: (page: number) => {
      setPage(page)
      window.scroll(0, 0)
    },
  }

  const renders = {
    catalogItem: useCallback(
      (item: (typeof products)[0]) => {
        const isInCart = Boolean(
          cartProducts.find((cartProduct) => cartProduct.item.id === item.id)
            ?.count
        )
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
      [cartProducts, isClient, callbacks]
    ),
  }

  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <>
      <List
        items={products}
        renderItem={renders.catalogItem}
        className={`grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] gap-2`}
      />
      <CatalogPagination
        page={page}
        setPage={callbacks.onSetPage}
        paginationRange={paginationRange}
        maxPages={maxPages}
      />
    </>
  )
}

export { CatalogList }
