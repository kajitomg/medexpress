"use client"

import { fetchCatalogCollectionsList } from "@/entities/collection/services"
import { PageSections } from "@/entities/page/model/page"
import { useCatalogOptionsStore } from "@/features/catalog/provider"
import { useCollectionsListStore } from "@/features/catalog/provider/collections-list-provider"
import { createSectionsStore } from "@/features/sections/provider"
import { selectSectionItemByName } from "@/features/sections/store"
import { routes } from "@/shared/config/routes"
import { useUpdateEffect } from "@/shared/lib/hooks"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { ContentSection, ContentSectionContent, EmptyState } from "@/shared/ui"
import { CollectionsList } from "@/views/collections/ui/collections-list"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"
import { useCallback } from "react"

const useSectionsStore = createSectionsStore<PageSections[]>()

const Page = () => {
  const hero = useSectionsStore(selectSectionItemByName("sections.hero"))

  const collections = useCollectionsListStore((state) => state.collections)
  const loadCollections = useCollectionsListStore(
    (state) => state.loadCollections
  )

  const searchQuery = useCatalogOptionsStore((state) => state.searchQuery)

  const fetchCollections = useCallback(async () => {
    return fetchCatalogCollectionsList(searchQuery)
  }, [searchQuery])

  useUpdateEffect(() => {
    loadCollections(fetchCollections)
  }, [loadCollections, fetchCollections])

  return (
    <>
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
