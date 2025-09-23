"use client"

import { ProductBase } from "@/entities/product/model"
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
import { DocumentServices } from "@/shared/model"
import { ContentSection, ContentSectionContent, EmptyState } from "@/shared/ui"
import { ProductsList } from "@/views/collection-products/ui/products-list"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"
import { CollectionPage, WithContext } from "schema-dts"

interface PageProps {
  slug: string
}

const collectionPage = (
  pageName?: string,
  items?: (ProductBase & DocumentServices)[]
): WithContext<CollectionPage> => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: pageName,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: items?.map((item, i) => ({
      "@type": "ListItem",
      position: i,
      item: {
        "@type": "Product",
        name: item.title,
        url: routes.PRODUCT(item?.slug).path,
      },
    })),
  },
})

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
      <script
        id="collection-products"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPage(collection?.title, products)),
        }}
      />
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
