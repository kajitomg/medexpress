"use client"

import { fetchCategoriesProductsList } from "@/entities/product/services"
import {
  useCatalogOptionsStore,
  useProductsListStore,
} from "@/features/catalog/provider"
import {
  CatalogPaginationControl,
  CatalogSearchControl,
} from "@/features/catalog/ui"
import { useCategoryDetailsStore } from "@/features/category-details/provider"
import { ProductsList } from "@/pages/category-products/ui/products-list"
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
  const category = useCategoryDetailsStore((state) => state.category)
  const products = useProductsListStore((state) => state.products)
  const setProducts = useProductsListStore((state) => state.setProducts)
  const setLoading = useProductsListStore((state) => state.setLoading)
  const setError = useProductsListStore((state) => state.setError)

  const searchQuery = useCatalogOptionsStore((state) => state.searchQuery)
  const page = useCatalogOptionsStore((state) => state.page)

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetchCategoriesProductsList(
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
  console.log()
  return (
    <>
      <PageHeroRoutes
        page={routes.CATALOG(category?.slug, category?.title)}
        image={category?.media?.url && urlBuilder(category.media.url)}
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
