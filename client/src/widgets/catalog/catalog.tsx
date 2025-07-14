"use client"

import { ProductBase } from "@/entities/product/model"
import {
  useCatalogOptionsStore,
  useProductsListStore,
} from "@/features/catalog/store"
import { CatalogList } from "@/widgets/catalog/catalog-list"
import { CatalogOptions } from "@/widgets/catalog/catalog-options"
import { ChangeEvent, useEffect, useState } from "react"

interface CatalogProps {
  initProducts: ProductBase[]
  initSearchQuery: string | null
  initMaxPages: number | null
  category_id: string
}

const Catalog = ({
  initProducts,
  initSearchQuery,
  initMaxPages,
  category_id,
}: CatalogProps) => {
  const meta = useProductsListStore((state) => state.meta)
  const products = useProductsListStore((state) => state.products)
  const setProducts = useProductsListStore((state) => state.setProducts)
  const fetchAllProducts = useProductsListStore(
    (state) => state.fetchAllProducts
  )
  const searchQuery = useCatalogOptionsStore((state) => state.searchQuery)
  const page = useCatalogOptionsStore((state) => state.page)
  const changeSearchQuery = useCatalogOptionsStore(
    (state) => state.changeSearchQuery
  )
  const [input, setInput] = useState<string>(initSearchQuery || "")

  const callbacks = {
    changeSearch: (e: ChangeEvent<HTMLInputElement>) => {
      setInput(e.currentTarget.value)
    },
    applyOptions: () => {
      changeSearchQuery(input || null)
    },
    resetOptions: () => {
      changeSearchQuery(null)
    },
  }

  useEffect(() => {
    setProducts(initProducts)
  }, [initProducts])

  useEffect(() => {
    if (searchQuery || page) {
      fetchAllProducts(page, +category_id, searchQuery)
    }
  }, [page, searchQuery])

  return (
    <>
      <CatalogOptions
        input={input}
        searchQuery={searchQuery}
        applyOptions={callbacks.applyOptions}
        resetOptions={callbacks.resetOptions}
        changeSearch={callbacks.changeSearch}
      />
      <CatalogList
        products={products.length ? products : initProducts}
        maxPages={meta?.pagination.pageCount || initMaxPages || 1}
      />
    </>
  )
}

export { Catalog }
