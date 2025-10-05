"use client"

import { DeviceSectionBase } from "@/entities/device-section/model"
import { fetchClassificationsDeviceSectionList } from "@/entities/device-section/services"
import { PageSections } from "@/entities/page/model/page"
import {
  useCatalogOptionsStore,
  useClassificationListStore,
} from "@/features/catalog/provider"
import { CatalogSearchControl } from "@/features/catalog/ui"
import { createSectionsStore } from "@/features/sections/provider"
import { selectSectionItemByName } from "@/features/sections/store"
import { routes } from "@/shared/config/routes"
import { useUpdateEffect } from "@/shared/lib/hooks"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { DocumentServices } from "@/shared/model"
import { ContentSection, ContentSectionContent, EmptyState } from "@/shared/ui"
import { NomenclatureList } from "@/views/nomenclatures/ui/nomenclature-list"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"

import * as React from "react"
import { CollectionPage, WithContext } from "schema-dts"

const useSectionsStore = createSectionsStore<PageSections[]>()

const collectionPage = (
  pageName?: string,
  items?: (DeviceSectionBase & DocumentServices)[]
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
      url: routes.NOMENCLATURE(item.slug).path,
    })),
  },
})

const Page = () => {
  const hero = useSectionsStore(selectSectionItemByName("sections.hero"))

  const nomenclatures = useClassificationListStore((state) => state.list)
  const loadNomenclatures = useClassificationListStore(
    (state) => state.loadList
  )

  const searchQuery = useCatalogOptionsStore((state) => state.searchQuery)

  useUpdateEffect(() => {
    loadNomenclatures(fetchClassificationsDeviceSectionList, 1, searchQuery)
  }, [loadNomenclatures, searchQuery])
  return (
    <>
      <script
        id="catalog-categories"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPage(hero?.title, nomenclatures)),
        }}
      />
      <PageHeroRoutes
        page={routes.NOMENCLATURE()}
        title={hero?.title}
        image={hero?.picture?.url && imageUrlBuilder(hero?.picture?.url)}
      />
      <ContentSection>
        <ContentSectionContent className="max-w-440 w-full">
          <CatalogSearchControl />

          {nomenclatures?.length ? (
            <NomenclatureList nomenclatures={nomenclatures} className="mt-6" />
          ) : (
            <EmptyState title="Категории не найдены" />
          )}
        </ContentSectionContent>
      </ContentSection>
    </>
  )
}

export { Page }
