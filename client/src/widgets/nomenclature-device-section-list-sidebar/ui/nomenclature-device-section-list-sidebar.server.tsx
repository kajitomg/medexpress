import { fetchSidebarDeviceSectionList } from "@/entities/device-section/services"
import { DeviceSectionListProvider } from "@/features/nomenclature/provider"
import { NomenclatureDeviceSectionListSidebarClient } from "@/widgets/nomenclature-device-section-list-sidebar/ui/nomenclature-device-section-list-sidebar.client"
import { ScrollAreaProps } from "@radix-ui/react-scroll-area"
import { ForwardRefExoticComponent, RefAttributes } from "react"

interface NomenclatureDeviceSectionListSidebarProps {
  initSlug?: string
  redirect?: boolean
  closeModal?: true
}

const NomenclatureDeviceSectionListSidebar = async ({
  initSlug,
  redirect = false,
  closeModal,
  ...props
}: React.ComponentProps<
  ForwardRefExoticComponent<ScrollAreaProps & RefAttributes<HTMLDivElement>>
> &
  NomenclatureDeviceSectionListSidebarProps) => {
  const responseNomenclatures = await fetchSidebarDeviceSectionList()

  const nomenclatures = responseNomenclatures.data
  return (
    <DeviceSectionListProvider initialState={{ list: nomenclatures }}>
      <NomenclatureDeviceSectionListSidebarClient
        items={nomenclatures}
        initSelect={initSlug}
        level={1}
        redirect={redirect}
        closeModal={closeModal}
        {...props}
      />
    </DeviceSectionListProvider>
  )
}

export { NomenclatureDeviceSectionListSidebar }
