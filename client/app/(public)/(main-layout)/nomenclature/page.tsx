import { fetchDetailDeviceSectionItem } from "@/entities/device-section/services"
import { fetchDeviceSectionsDeviceTypeList } from "@/entities/device-type/services"
import {
  CatalogOptionsProvider,
  ClassificationTypeListProvider,
} from "@/features/catalog/provider"
import { DeviceSectionDetailsProvider } from "@/features/device-section/provider"
import { generatePageMetadata } from "@/shared/lib/generate-page-metadata"
import { generateSeoViewport } from "@/shared/lib/generate-seo-viewport"
import { PageLayoutAside, PageLayoutMain } from "@/shared/ui"
import { NomenclatureTypesPage } from "@/views/nomenclature-types/ui"
import { NomenclatureTypesNavigationSidebar } from "@/widgets/catalog-categories-navigation-sidebar/ui"
import { NaivgationSidebarSheet } from "@/widgets/navigation-sidebar-sheet/ui"
import { Metadata, NextPage, Viewport } from "next"
import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import * as React from "react"
import Error from "../../../error"

interface CatalogPageProps {
  searchParams: Promise<{ options?: string }>
}

export async function generateMetadata({
  searchParams,
}: CatalogPageProps): Promise<Metadata> {
  const search = await searchParams
  const nomenclature_slug: string | undefined =
    search?.options && JSON.parse(search?.options).state.nomenclatureSlug

  if (!nomenclature_slug) {
    return generatePageMetadata({
      seo: {
        metaTitle: "Номенклатурная классификация медицинских изедлий",
        metaDescription: " ",
      },
    })
  }
  const response = await fetchDetailDeviceSectionItem(nomenclature_slug)

  const data = response.data

  return generatePageMetadata(data, {
    defaultTitle: data.name || "Страница не найдена",
  })
}

export async function generateViewport({
  searchParams,
}: CatalogPageProps): Promise<Viewport | string> {
  const search = await searchParams
  const nomenclature_slug: string | undefined =
    search?.options && JSON.parse(search?.options).state.nomenclatureSlug

  if (!nomenclature_slug) {
    return generateSeoViewport({})
  }
  const response = await fetchDetailDeviceSectionItem(nomenclature_slug)

  const data = response.data

  return generateSeoViewport(data)
}

const Page: NextPage<CatalogPageProps> = async ({ searchParams }) => {
  const search = await searchParams
  const nomenclature_slug: string | undefined =
    search?.options && JSON.parse(search?.options).state.nomenclatureSlug
  const searchQuery: string | undefined =
    search?.options && JSON.parse(search?.options).state.searchQuery

  const page = (search?.options && +JSON.parse(search?.options).state.page) || 1

  let responseNomenclature
  if (nomenclature_slug) {
    responseNomenclature = await fetchDetailDeviceSectionItem(nomenclature_slug)
  }
  const response = await fetchDeviceSectionsDeviceTypeList(
    nomenclature_slug,
    page,
    searchQuery
  )

  const nomenclature = responseNomenclature?.data
  const types = response?.data
  const maxPages = response?.meta.pagination.pageCount

  return (
    <CatalogOptionsProvider initialState={{ searchQuery, page, maxPages }}>
      <DeviceSectionDetailsProvider initialState={{ item: nomenclature }}>
        <ClassificationTypeListProvider initialState={{ list: types }}>
          <div className="flex">
            <PageLayoutAside className="flex-none">
              <ErrorBoundary errorComponent={Error}>
                <NomenclatureTypesNavigationSidebar
                  initSlug={nomenclature_slug}
                  className="hidden lg:block w-0 h-0 lg:w-80 lg:h-full"
                />
                <NaivgationSidebarSheet initSlug={nomenclature_slug} />
              </ErrorBoundary>
            </PageLayoutAside>
            <PageLayoutMain className="flex-1 min-w-0">
              <ErrorBoundary errorComponent={Error}>
                <NomenclatureTypesPage initSlug={nomenclature_slug} />
              </ErrorBoundary>
            </PageLayoutMain>
          </div>
        </ClassificationTypeListProvider>
      </DeviceSectionDetailsProvider>
    </CatalogOptionsProvider>
  )
}

export default Page
