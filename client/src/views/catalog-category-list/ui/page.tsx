"use client"

import { CategoryBase } from "@/entities/category/model"
import { fetchCatalogCategoryList } from "@/entities/category/services"
import { PageSections } from "@/entities/page/model/page"
import {
  useCatalogOptionsStore,
  useCategoryListStore,
} from "@/features/catalog/provider"
import { CatalogSearchControl } from "@/features/catalog/ui"
import { createSectionListStore } from "@/features/sections/provider"
import { selectSectionItemByName } from "@/features/sections/store"
import { routes } from "@/shared/config/routes"
import { useUpdateEffect } from "@/shared/lib/hooks"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { DocumentServices } from "@/shared/model"
import { ContentSection, ContentSectionContent, EmptyState } from "@/shared/ui"
import { CategoryList } from "@/views/catalog-category-list/ui/category-list"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"

import * as React from "react"
import { CollectionPage, WithContext } from "schema-dts"

const useSectionsStore = createSectionListStore<PageSections[]>()

const collectionPage = (
  pageName?: string,
  items?: (CategoryBase & DocumentServices)[]
): WithContext<CollectionPage> => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: pageName,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: items?.map((item, i) => ({
      "@type": "ListItem",
      position: i,
      name: item.name,
      url: routes.CATALOG(item.slug).path,
    })),
  },
})

const Page = () => {
  const hero = useSectionsStore(selectSectionItemByName("sections.hero"))

  const categories = useCategoryListStore((state) => state.list)
  const loadCategories = useCategoryListStore((state) => state.loadList)

  const searchQuery = useCatalogOptionsStore((state) => state.searchQuery)

  useUpdateEffect(() => {
    loadCategories(fetchCatalogCategoryList, 1, searchQuery)
  }, [loadCategories, searchQuery])
  return (
    <>
      <script
        id="catalog-categories"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPage(hero?.title, categories)),
        }}
      />
      <PageHeroRoutes
        page={routes.CATALOG()}
        title={hero?.title}
        image={hero?.picture?.url && imageUrlBuilder(hero?.picture?.url)}
      />
      <ContentSection>
        <ContentSectionContent className="max-w-440 w-full">
          <CatalogSearchControl />

          {categories?.length ? (
            <CategoryList categories={categories} className="mt-6" />
          ) : (
            <EmptyState title="Категории не найдены" />
          )}
        </ContentSectionContent>
      </ContentSection>
    </>
  )
}

export { Page }
