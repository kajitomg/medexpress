"use client"

import { fetchCollectionsProductsList } from "@/entities/product/services"
import {
  useCatalogOptionsStore,
  useProductsListStore,
} from "@/features/catalog/provider"
import {
  CatalogPaginationControl,
  CatalogSearchControl,
} from "@/features/catalog/ui"
import { useCollectionDetailsStore } from "@/features/collection-details/provider"
import { ProductsList } from "@/pages/collection-products/ui/products-list"
import { routes } from "@/shared/config/routes"
import { useUpdateEffect } from "@/shared/lib/hooks"
import { urlBuilder } from "@/shared/lib/url-builder"
import { ContentSection, ContentSectionContent, EmptyState } from "@/shared/ui"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"
import { useCallback } from "react"

interface PageProps {
  slug: string
}

const Page = ({ slug }: PageProps) => {
  const collection = useCollectionDetailsStore((state) => state.collection)
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
        slug,
        page || 1,
        searchQuery
      )
      setProducts(response.data)
    } catch (e) {
      setError(e.message || "Произошла ошибка при загрузке товаров")
    } finally {
      setLoading(false)
    }
  }, [setProducts, setLoading, setError, slug, page, searchQuery])

  useUpdateEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <>
      <PageHeroRoutes
        page={routes.COLLESCTIONS(collection?.slug, collection?.title)}
        image={collection?.media?.url && urlBuilder(collection.media.url)}
      />
      <ContentSection>
        <ContentSectionContent className="max-w-380 w-full">
          <CatalogSearchControl />
          {products?.length ? (
            <>
              <ProductsList products={products} className="mt-6" />
              <CatalogPaginationControl className="mt-4" />
            </>
          ) : (
            <EmptyState title="Товары не найдены" />
          )}
        </ContentSectionContent>
      </ContentSection>
    </>
  )
}

export { Page }
