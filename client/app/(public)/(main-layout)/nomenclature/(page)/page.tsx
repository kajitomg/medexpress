import { fetchDetailDeviceSectionItem } from "@/entities/device-section/services"
import { fetchDeviceSectionsDeviceTypeList } from "@/entities/device-type/services"
import { DeviceSectionDetailsProvider } from "@/features/device-section-details/provider"
import { DeviceTypeListProvider } from "@/features/nomenclature/provider"
import { generatePageMetadata } from "@/shared/lib/generate-page-metadata"
import { generateSeoViewport } from "@/shared/lib/generate-seo-viewport"
import { PageLayoutAside, PageLayoutMain } from "@/shared/ui"
import { NomenclatureDeviceTypeListPage } from "@/views/nomenclature-device-type-list/ui"
import {
  NomenclatureDeviceSectionListSidebar,
  NomenclatureDeviceSectionListSidebarSheet,
} from "@/widgets/nomenclature-device-section-list-sidebar/ui"
import { Metadata, NextPage, Viewport } from "next"
import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import * as React from "react"
import Error from "../../../../error"

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
    defaultTitle: data?.name || "Страница не найдена",
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

  return (
    <DeviceSectionDetailsProvider initialState={{ item: nomenclature }}>
      <DeviceTypeListProvider initialState={{ list: types }}>
        <div className="flex">
          <PageLayoutAside className="flex-none">
            <ErrorBoundary errorComponent={Error}>
              <NomenclatureDeviceSectionListSidebar
                initSlug={nomenclature_slug}
                className="hidden lg:block w-0 h-0 lg:w-80 lg:h-full"
              />
              <NomenclatureDeviceSectionListSidebarSheet
                initSlug={nomenclature_slug}
              />
            </ErrorBoundary>
          </PageLayoutAside>
          <PageLayoutMain className="flex-1 min-w-0">
            <ErrorBoundary errorComponent={Error}>
              <NomenclatureDeviceTypeListPage initSlug={nomenclature_slug} />
            </ErrorBoundary>
          </PageLayoutMain>
        </div>
      </DeviceTypeListProvider>
    </DeviceSectionDetailsProvider>
  )
}

export default Page
