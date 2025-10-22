import { fetchDetailDeviceTypeItem } from "@/entities/device-type/services"
import { DeviceTypeDetailsProvider } from "@/features/device-type-details/provider"
import { PageLayoutAside, PageLayoutMain } from "@/shared/ui"
import { NomenclatureDeviceTypeDetailsPage } from "@/views/nomenclature-device-type-details/ui"
import {
  NomenclatureDeviceSectionListSidebar,
  NomenclatureDeviceSectionListSidebarSheet,
} from "@/widgets/nomenclature-device-section-list-sidebar/ui"
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
    <div className="flex">
      <PageLayoutAside className="flex-none">
        <ErrorBoundary errorComponent={Error}>
          <NomenclatureDeviceSectionListSidebar
            initSlug={nomenclature_slug}
            className="hidden lg:block w-0 h-0 lg:w-80 lg:h-full"
            redirect
          />
          <NomenclatureDeviceSectionListSidebarSheet
            initSlug={nomenclature_slug}
            redirect
          />
        </ErrorBoundary>
      </PageLayoutAside>
      <PageLayoutMain className="flex-1 min-w-0">
        <DeviceTypeDetailsProvider initialState={{ item: type }}>
          <NomenclatureDeviceTypeDetailsPage />
        </DeviceTypeDetailsProvider>
      </PageLayoutMain>
    </div>
  )
}

export default Page
