"use client"

import { DeviceTypeBase } from "@/entities/device-type/model"
import { fetchDeviceSectionsDeviceTypeList } from "@/entities/device-type/services"
import {
  useCatalogOptionsStore,
  useDeviceTypeListStore,
} from "@/features/catalog/provider"
import {
  CatalogPaginationControl,
  CatalogSearchControl,
} from "@/features/catalog/ui"
import { useDeviceSectionDetailsStore } from "@/features/device-section-details/provider"
import { routes } from "@/shared/config/routes"
import { ContentSection, ContentSectionContent, EmptyState } from "@/shared/ui"
import { NomenclatureTypeList } from "@/views/device-type-list/ui/nomenclature-type-list"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"
import { useCallback, useEffect } from "react"
import { CollectionPage, WithContext } from "schema-dts"

interface PageProps {
  initSlug?: string
}

const collectionPage = (
  pageName?: string,
  items?: DeviceTypeBase[]
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

const Page = ({ initSlug }: PageProps) => {
  const nomenclatureSlug = useCatalogOptionsStore(
    (state) => state.nomenclatureSlug
  )
  const nomenclature = useDeviceSectionDetailsStore((state) => state.item)
  const types = useDeviceTypeListStore((state) => state.list)
  const loadTypes = useDeviceTypeListStore((state) => state.loadList)

  const searchQuery = useCatalogOptionsStore((state) => state.searchQuery)
  const setMaxPages = useCatalogOptionsStore((state) => state.setMaxPages)
  const maxPages = useCatalogOptionsStore((state) => state.maxPages)

  const page = useCatalogOptionsStore((state) => state.page)

  const handleLoad = useCallback(async () => {
    const data = await loadTypes(
      fetchDeviceSectionsDeviceTypeList,
      nomenclatureSlug || initSlug,
      page || 1,
      searchQuery
    )
    setMaxPages(data?.meta.pagination.pageCount || maxPages)
  }, [nomenclatureSlug, page, searchQuery])

  useEffect(() => {
    handleLoad()
  }, [handleLoad])
  return (
    <>
      <script
        id="collection-products"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionPage(
              nomenclature?.name ||
                "Номенклатурная классификация медицинских изделий",
              types
            )
          ),
        }}
      />
      <PageHeroRoutes
        page={routes.NOMENCLATURE(undefined, nomenclature?.name)}
      />
      <ContentSection>
        <ContentSectionContent className="max-w-380 w-full">
          <CatalogSearchControl />
          {types?.length ? (
            <>
              <NomenclatureTypeList items={types} className="mt-6" />
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
