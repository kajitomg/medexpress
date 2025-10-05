import { fetchDetailDeviceSectionItem } from "@/entities/device-section/services"
import { fetchDeviceSectionsDeviceTypeList } from "@/entities/device-type/services"
import {
  CatalogOptionsProvider,
  ClassificationTypeListProvider,
} from "@/features/catalog/provider"
import { NomenclatureSectionDetailsProvider } from "@/features/nomenclature-section/provider"
import { generatePageMetadata } from "@/shared/lib/generate-page-metadata"
import { generateSeoViewport } from "@/shared/lib/generate-seo-viewport"
import { NomenclatureTypesPage } from "@/views/nomenclature-types/ui"
import { Metadata, NextPage, Viewport } from "next"

interface CatalogPageProps {
  params: Promise<{ nomenclature_slug: string }>
  searchParams: Promise<{ options?: string }>
}

export async function generateMetadata({
  params,
}: CatalogPageProps): Promise<Metadata> {
  const { nomenclature_slug } = await params

  const response = await fetchDetailDeviceSectionItem(nomenclature_slug)

  const data = response.data

  return generatePageMetadata(data, {
    defaultTitle: data.name || "Страница не найдена",
  })
}

export async function generateViewport({
  params,
}: CatalogPageProps): Promise<Viewport | string> {
  const { nomenclature_slug } = await params

  const response = await fetchDetailDeviceSectionItem(nomenclature_slug)

  const data = response.data

  return generateSeoViewport(data)
}

const Page: NextPage<CatalogPageProps> = async ({ params, searchParams }) => {
  const { nomenclature_slug } = await params
  const search = await searchParams
  const searchQuery: string | undefined =
    search?.options && JSON.parse(search?.options).state.searchQuery

  const page = (search?.options && +JSON.parse(search?.options).state.page) || 1
  const responseNomenclature =
    await fetchDetailDeviceSectionItem(nomenclature_slug)
  const response = await fetchDeviceSectionsDeviceTypeList(
    nomenclature_slug,
    page,
    searchQuery
  )

  const nomenclature = responseNomenclature?.data
  const types = response?.data
  const maxPages = response?.meta.pagination.pageCount

  return (
    <NomenclatureSectionDetailsProvider initialState={{ item: nomenclature }}>
      <CatalogOptionsProvider
        initialState={{ searchQuery, page, maxPages }}
        skipHydration
      >
        <ClassificationTypeListProvider initialState={{ list: types }}>
          <NomenclatureTypesPage slug={nomenclature_slug} />
        </ClassificationTypeListProvider>
      </CatalogOptionsProvider>
    </NomenclatureSectionDetailsProvider>
  )
}

export default Page
