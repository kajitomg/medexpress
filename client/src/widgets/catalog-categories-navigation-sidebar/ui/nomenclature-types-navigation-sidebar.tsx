import { fetchAsideDeviceSectionList } from "@/entities/device-section/services"
import { DeviceSectionListProvider } from "@/features/catalog/provider"
import { NomenclatureClient } from "@/widgets/catalog-categories-navigation-sidebar/ui/nomenclature.client"
import { ScrollAreaProps } from "@radix-ui/react-scroll-area"
import { ForwardRefExoticComponent, RefAttributes } from "react"

interface AsideProps {
  initSlug?: string
  redirect?: boolean
}

const NomenclatureTypesNavigationSidebar = async ({
  initSlug,
  redirect = false,
  ...props
}: React.ComponentProps<
  ForwardRefExoticComponent<ScrollAreaProps & RefAttributes<HTMLDivElement>>
> &
  AsideProps) => {
  const responseNomenclatures = await fetchAsideDeviceSectionList()

  const nomenclatures = responseNomenclatures.data
  return (
    <DeviceSectionListProvider initialState={{ list: nomenclatures }}>
      <NomenclatureClient
        items={nomenclatures}
        initSelect={initSlug}
        level={1}
        redirect={redirect}
        {...props}
      />
    </DeviceSectionListProvider>
  )
}

export { NomenclatureTypesNavigationSidebar }
