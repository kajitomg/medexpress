"use client"

import { DeviceTypeBase } from "@/entities/device-type/model"
import { fetchDeviceSectionsDeviceTypeList } from "@/entities/device-type/services"
import { useDeviceSectionDetailsStore } from "@/features/device-section-details/provider"
import {
  useDeviceTypeListStore,
  useNomenclatureOptionsStore,
} from "@/features/nomenclature/provider"
import { SearchControl } from "@/features/search/ui"
import { routes } from "@/shared/config/routes"
import {
  ContentSection,
  ContentSectionContent,
  EmptyState,
  PaginationControl,
} from "@/shared/ui"
import { NomenclatureTypeList } from "@/views/nomenclature-device-type-list/ui/nomenclature-type-list"
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
  const nomenclatureSlug = useNomenclatureOptionsStore(
    (state) => state.filter.nomenclatureSlug
  )
  const nomenclature = useDeviceSectionDetailsStore((state) => state.item)
  const types = useDeviceTypeListStore((state) => state.list)
  const loadTypes = useDeviceTypeListStore((state) => state.loadList)

  const searchQuery = useNomenclatureOptionsStore((state) => state.search.query)
  const setMaxPages = useNomenclatureOptionsStore(
    (state) => state.pagination.setMaxPages
  )
  const maxPages = useNomenclatureOptionsStore(
    (state) => state.pagination.maxPages
  )

  const page = useNomenclatureOptionsStore((state) => state.pagination.page)

  const query = useNomenclatureOptionsStore((state) => state.search.query)
  const setQuery = useNomenclatureOptionsStore((state) => state.search.setQuery)
  const setPage = useNomenclatureOptionsStore(
    (state) => state.pagination.setPage
  )

  const handleSetPage = (page: number) => {
    setPage(page)
    window.scroll({ top: 0, behavior: "smooth" })
  }
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
          <SearchControl setSearch={setQuery} search={query} />

          {types?.length ? (
            <>
              <NomenclatureTypeList items={types} className="mt-6" />
              <PaginationControl
                page={page}
                setPage={handleSetPage}
                maxPages={maxPages}
                className="mt-4"
              />
            </>
          ) : (
            <EmptyState title="Типы изделий не найдены" />
          )}
        </ContentSectionContent>
      </ContentSection>
    </>
  )
}

export { Page }
