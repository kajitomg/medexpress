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
import { routes } from "@/shared/config/routes"
import { useUpdateEffect } from "@/shared/lib/hooks"
import { urlBuilder } from "@/shared/lib/url-builder"
import { ContentSection, ContentSectionContent, EmptyState } from "@/shared/ui"
import { ProductsList } from "@/views/collection-products/ui/products-list"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"

interface PageProps {
  slug: string
}

const Page = ({ slug }: PageProps) => {
  const collection = useCollectionDetailsStore((state) => state.collection)
  const products = useProductsListStore((state) => state.products)
  const loadProducts = useProductsListStore((state) => state.loadProducts)

  const searchQuery = useCatalogOptionsStore((state) => state.searchQuery)
  const page = useCatalogOptionsStore((state) => state.page)

  useUpdateEffect(() => {
    loadProducts(fetchCollectionsProductsList, slug, page || 1, searchQuery)
  }, [loadProducts, slug, page, searchQuery])

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
