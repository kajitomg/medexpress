"use client"

import { ProductBase } from "@/entities/product/model"
import { fetchCategoriesProductList } from "@/entities/product/services"
import { useCatalogProductOptionsStore } from "@/features/catalog/provider"
import { useCategoryDetailsStore } from "@/features/category-details/provider"
import { useProductListStore } from "@/features/product/provider"
import { SearchControl } from "@/features/search/ui"
import { routes } from "@/shared/config/routes"
import { useUpdateEffect } from "@/shared/lib/hooks"
import { urlBuilder } from "@/shared/lib/url-builder"
import {
  ContentSection,
  ContentSectionContent,
  EmptyState,
  PaginationControl,
} from "@/shared/ui"
import { ProductList } from "@/views/catalog-product-list/ui/product-list"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"
import { CollectionPage, WithContext } from "schema-dts"

interface PageProps {
  slug: string
}

const collectionPage = (
  pageName?: string,
  items?: ProductBase[]
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
  const products = useProductListStore((state) => state.list)
  const loadProducts = useProductListStore((state) => state.loadList)

  const searchQuery = useCatalogProductOptionsStore(
    (state) => state.search.query
  )
  const page = useCatalogProductOptionsStore((state) => state.pagination.page)
  const query = useCatalogProductOptionsStore((state) => state.search.query)
  const setQuery = useCatalogProductOptionsStore(
    (state) => state.search.setQuery
  )
  const maxPages = useCatalogProductOptionsStore(
    (state) => state.pagination.maxPages
  )
  const setPage = useCatalogProductOptionsStore(
    (state) => state.pagination.setPage
  )

  const handleSetPage = (page: number) => {
    setPage(page)
    window.scroll({ top: 0, behavior: "smooth" })
  }

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
          <SearchControl setSearch={setQuery} search={query} />

          {products?.length ? (
            <>
              <ProductList products={products} className="mt-6" />
              <PaginationControl
                page={page}
                setPage={handleSetPage}
                maxPages={maxPages}
                className="mt-4"
              />
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
