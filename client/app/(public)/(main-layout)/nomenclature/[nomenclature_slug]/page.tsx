import { fetchDetailDeviceTypeItem } from "@/entities/device-type/services"
import { CatalogOptionsProvider } from "@/features/catalog/provider"
import { DeviceTypeDetailsProvider } from "@/features/device-type/provider"
import { PageLayoutAside, PageLayoutMain } from "@/shared/ui"
import { NomenclatureTypeItemPage } from "@/views/nomenclature-type-item/ui"
import { NomenclatureTypesNavigationSidebar } from "@/widgets/catalog-categories-navigation-sidebar/ui"
import { NaivgationSidebarSheet } from "@/widgets/navigation-sidebar-sheet/ui"
import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import * as React from "react"
import Error from "../../../../error"

interface PageProps {
  params: Promise<{ nomenclature_slug: string }>
}

const Page = async ({ params }: PageProps) => {
  const { nomenclature_slug } = await params
  const response = await fetchDetailDeviceTypeItem(nomenclature_slug)

  const type = response.data

  return (
    <CatalogOptionsProvider skipHydration>
      <div className="flex">
        <PageLayoutAside className="flex-none">
          <ErrorBoundary errorComponent={Error}>
            <NomenclatureTypesNavigationSidebar
              initSlug={nomenclature_slug}
              className="hidden lg:block w-0 h-0 lg:w-80 lg:h-full"
              redirect
            />
            <NaivgationSidebarSheet initSlug={nomenclature_slug} redirect />
          </ErrorBoundary>
        </PageLayoutAside>
        <PageLayoutMain className="flex-1 min-w-0">
          <DeviceTypeDetailsProvider initialState={{ item: type }}>
            <NomenclatureTypeItemPage />
          </DeviceTypeDetailsProvider>
        </PageLayoutMain>
      </div>
    </CatalogOptionsProvider>
  )
}

export default Page
