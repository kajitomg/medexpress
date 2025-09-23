"use client"

import { CollectionBase } from "@/entities/collection/model"
import { fetchCatalogCollectionsList } from "@/entities/collection/services"
import { PageSections } from "@/entities/page/model/page"
import { useCatalogOptionsStore } from "@/features/catalog/provider"
import { useCollectionsListStore } from "@/features/catalog/provider/collections-list-provider"
import { createSectionsStore } from "@/features/sections/provider"
import { selectSectionItemByName } from "@/features/sections/store"
import { routes } from "@/shared/config/routes"
import { useUpdateEffect } from "@/shared/lib/hooks"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { DocumentServices } from "@/shared/model"
import { ContentSection, ContentSectionContent, EmptyState } from "@/shared/ui"
import { CollectionsList } from "@/views/collections/ui/collections-list"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"
import { CollectionPage, WithContext } from "schema-dts"

const useSectionsStore = createSectionsStore<PageSections[]>()

const collectionPage = (
  pageName?: string,
  items?: (CollectionBase & DocumentServices)[]
): WithContext<CollectionPage> => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: pageName,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: items?.map((item, i) => ({
      "@type": "ListItem",
      position: i,
      name: item.title,
      url: routes.COLLESCTIONS(item.slug).path,
    })),
  },
})

const Page = () => {
  const hero = useSectionsStore(selectSectionItemByName("sections.hero"))

  const collections = useCollectionsListStore((state) => state.collections)
  const loadCollections = useCollectionsListStore(
    (state) => state.loadCollections
  )

  const searchQuery = useCatalogOptionsStore((state) => state.searchQuery)

  useUpdateEffect(() => {
    loadCollections(fetchCatalogCollectionsList, searchQuery)
  }, [loadCollections, searchQuery])

  return (
    <>
      <script
        id="collections"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPage(hero?.title, collections)),
        }}
      />
      <PageHeroRoutes
        page={routes.COLLESCTIONS()}
        title={hero?.title}
        image={hero?.picture?.url && imageUrlBuilder(hero?.picture?.url)}
      />

      <ContentSection>
        <ContentSectionContent className="w-full">
          {collections?.length ? (
            <CollectionsList collections={collections} />
          ) : (
            <EmptyState title="Коллекции не найдены" />
          )}
        </ContentSectionContent>
      </ContentSection>
    </>
  )
}

export { Page }
