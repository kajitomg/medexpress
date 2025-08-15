"use client"

import { fetchCatalogCollectionsList } from "@/entities/collection/services"
import { useCatalogOptionsStore } from "@/features/catalog/provider"
import { useCollectionsListStore } from "@/features/catalog/provider/collections-list-provider"
import { CollectionsList } from "@/pages/collections/ui/collections-list"
import { routes } from "@/shared/config/routes"
import { useUpdateEffect } from "@/shared/lib/hooks"
import { ContentSection, ContentSectionContent, EmptyState } from "@/shared/ui"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"
import { useCallback } from "react"

const Page = () => {
  const collections = useCollectionsListStore((state) => state.collections)
  const setCollections = useCollectionsListStore(
    (state) => state.setCollections
  )
  const setLoading = useCollectionsListStore((state) => state.setLoading)
  const setError = useCollectionsListStore((state) => state.setError)

  const searchQuery = useCatalogOptionsStore((state) => state.searchQuery)

  const fetchCollections = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetchCatalogCollectionsList(searchQuery)
      setCollections(response.data)
    } catch (e) {
      setError(e.message || "Произошла ошибка при загрузке коллекций")
    } finally {
      setLoading(false)
    }
  }, [setCollections, setLoading, setError, searchQuery])

  useUpdateEffect(() => {
    fetchCollections()
  }, [fetchCollections])

  return (
    <>
      <PageHeroRoutes page={routes.COLLESCTIONS()} />

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
