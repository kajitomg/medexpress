"use client"

import { DeviceSectionBase } from "@/entities/device-section/model"
import { useNomenclatureOptionsStore } from "@/features/nomenclature/provider"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { DeviceSectionList } from "@/widgets/nomenclature-device-section-list-sidebar/ui/device-section-list"
import { ScrollAreaProps } from "@radix-ui/react-scroll-area"
import { useRouter } from "next/navigation"
import { ForwardRefExoticComponent, RefAttributes } from "react"

interface NomenclatureDeviceSectionListSidebarClientProps {
  items?: DeviceSectionBase[]
  level: number
  initSelect?: string
  redirect?: boolean
  closeModal?: true
}

const NomenclatureDeviceSectionListSidebarClient = ({
  items,
  initSelect,
  level,
  redirect,
  className,
  closeModal,
  ...props
}: React.ComponentProps<
  ForwardRefExoticComponent<ScrollAreaProps & RefAttributes<HTMLDivElement>>
> &
  NomenclatureDeviceSectionListSidebarClientProps) => {
  const router = useRouter()
  const setNomenclatureSlug = useNomenclatureOptionsStore(
    (state) => state.filter.setNomenclatureSlug
  )
  const nomenclatureSlug = useNomenclatureOptionsStore(
    (state) => state.filter.nomenclatureSlug
  )

  const selected = redirect ? undefined : nomenclatureSlug || initSelect
  return (
    <ScrollArea
      className={cn(
        "w-80 h-full bg-background border-r-1 border-gray-800/10 p-2 pr-3",
        className
      )}
      {...props}
    >
      <div className="font-bold text-(--color-brand) text-xl px-3 pb-2">
        Номенклатурная классификация медицинских изделий
      </div>
      <DeviceSectionList
        items={items}
        selected={selected}
        level={level}
        closeModal={closeModal}
        setNomenclatureSlug={(slug?: string) => {
          setNomenclatureSlug(slug)
          if (redirect) {
            router.push(routes.NOMENCLATURE().path + window.location.search)
          }
        }}
      />
    </ScrollArea>
  )
}

export { NomenclatureDeviceSectionListSidebarClient }
