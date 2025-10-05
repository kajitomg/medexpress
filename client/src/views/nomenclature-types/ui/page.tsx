"use client"

import { DeviceTypeBase } from "@/entities/device-type/model"
import { fetchDeviceSectionsDeviceTypeList } from "@/entities/device-type/services"
import {
  useCatalogOptionsStore,
  useClassificationTypeListStore,
} from "@/features/catalog/provider"
import {
  CatalogPaginationControl,
  CatalogSearchControl,
} from "@/features/catalog/ui"
import { useNomenclatureSectionDetailsStore } from "@/features/nomenclature-section/provider"
import { routes } from "@/shared/config/routes"
import { useUpdateEffect } from "@/shared/lib/hooks"
import { DocumentServices } from "@/shared/model"
import { ContentSection, ContentSectionContent, EmptyState } from "@/shared/ui"
import { NomenclatureTypeList } from "@/views/nomenclature-types/ui/nomenclature-type-list"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"
import { CollectionPage, WithContext } from "schema-dts"

interface PageProps {
  slug: string
}

const collectionPage = (
  pageName?: string,
  items?: (DeviceTypeBase & DocumentServices)[]
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
  const nomenclature = useNomenclatureSectionDetailsStore((state) => state.item)
  const types = useClassificationTypeListStore((state) => state.list)
  const loadTypes = useClassificationTypeListStore((state) => state.loadList)

  const searchQuery = useCatalogOptionsStore((state) => state.searchQuery)
  const page = useCatalogOptionsStore((state) => state.page)

  useUpdateEffect(() => {
    loadTypes(fetchDeviceSectionsDeviceTypeList, slug, page || 1, searchQuery)
  }, [loadTypes, slug, page, searchQuery])

  return (
    <>
      <script
        id="collection-products"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPage(nomenclature?.name, types)),
        }}
      />
      <PageHeroRoutes
        page={routes.NOMENCLATURE(nomenclature?.slug, nomenclature?.name)}
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
