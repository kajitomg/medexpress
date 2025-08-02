"use client"

import { fetchCollectionsProductsList } from "@/entities/product/services"
import {
  useCatalogOptionsStore,
  useProductsListStore,
} from "@/features/catalog/provider"
import { CatalogSearchControl } from "@/features/catalog/ui"
import { CatalogPagination } from "@/features/catalog/ui/catalog-pagination"
import { ProductsList } from "@/pages/collection-products/ui/products-list"
import { routes } from "@/shared/config/routes"
import { useUpdateEffect } from "@/shared/lib/hooks"
import { DocumentId } from "@/shared/model"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import { useCallback } from "react"

interface PageProps {
  collectionId: DocumentId
}

const Page = ({ collectionId }: PageProps) => {
  const products = useProductsListStore((state) => state.products)
  const setProducts = useProductsListStore((state) => state.setProducts)
  const setLoading = useProductsListStore((state) => state.setLoading)
  const setError = useProductsListStore((state) => state.setError)

  const searchQuery = useCatalogOptionsStore((state) => state.searchQuery)
  const page = useCatalogOptionsStore((state) => state.page)

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetchCollectionsProductsList(
        collectionId,
        page || 1,
        searchQuery
      )
      setProducts(response.data)
    } catch (e) {
      setError(e.message || "Произошла ошибка при загрузке товаров")
    } finally {
      setLoading(false)
    }
  }, [setProducts, setLoading, setError, collectionId, page, searchQuery])

  useUpdateEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <>
      <PageHeroRoutes page={routes.COLLESCTIONS()} />
      <div className="m-auto px-4 flex max-w-400 items-center space-x-2 w-full">
        <CatalogSearchControl />
      </div>
      <ProductsList products={products} />
      <CatalogPagination />
    </>
  )
}

export { Page }
