"use client"

import { ProductBase } from "@/entities/product/model"
import { fetchCategoriesProductList } from "@/entities/product/services"
import {
  useCatalogOptionsStore,
  useProductsListStore,
} from "@/features/catalog/provider"
import {
  CatalogPaginationControl,
  CatalogSearchControl,
} from "@/features/catalog/ui"
import { useCategoryDetailsStore } from "@/features/category-details/provider"
import { routes } from "@/shared/config/routes"
import { useUpdateEffect } from "@/shared/lib/hooks"
import { urlBuilder } from "@/shared/lib/url-builder"
import { DocumentServices } from "@/shared/model"
import { ContentSection, ContentSectionContent, EmptyState } from "@/shared/ui"
import { ProductList } from "@/views/catalog-product-list/ui/product-list"
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
        name: item.name,
        url: routes.PRODUCT(item?.slug).path,
      },
    })),
  },
})

const Page = ({ slug }: PageProps) => {
  const category = useCategoryDetailsStore((state) => state.item)
  const products = useProductsListStore((state) => state.list)
  const loadProducts = useProductsListStore((state) => state.loadList)

  const searchQuery = useCatalogOptionsStore((state) => state.searchQuery)
  const page = useCatalogOptionsStore((state) => state.page)

  useUpdateEffect(() => {
    loadProducts(fetchCategoriesProductList, slug, page || 1, searchQuery)
  }, [loadProducts, slug, page, searchQuery])

  return (
    <>
      <script
        id="category-products"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPage(category?.name, products)),
        }}
      />
      <PageHeroRoutes
        page={routes.CATALOG(category?.slug, category?.name)}
        image={category?.image?.url && urlBuilder(category.image.url)}
      />
      <ContentSection>
        <ContentSectionContent className="max-w-380 w-full">
          <CatalogSearchControl />

          {products?.length ? (
            <>
              <ProductList products={products} className="mt-6" />
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
