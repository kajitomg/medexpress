"use client"

import { DeviceSectionBase } from "@/entities/device-section/model"
import { useCatalogOptionsStore } from "@/features/catalog/provider"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { TypeList } from "@/widgets/catalog-categories-navigation-sidebar/ui/list"
import { ScrollAreaProps } from "@radix-ui/react-scroll-area"
import { useRouter } from "next/navigation"
import { ForwardRefExoticComponent, RefAttributes } from "react"

const NomenclatureClient = ({
  items,
  initSelect,
  level,
  redirect,
  className,
  ...props
}: React.ComponentProps<
  ForwardRefExoticComponent<ScrollAreaProps & RefAttributes<HTMLDivElement>>
> & {
  items?: (DeviceSectionBase & DocumentServices)[]
  level: number
  initSelect?: string
  redirect?: boolean
}) => {
  const router = useRouter()
  const setNomenclatureSlug = useCatalogOptionsStore(
    (state) => state.setNomenclatureSlug
  )
  const nomenclatureSlug = useCatalogOptionsStore(
    (state) => state.nomenclatureSlug
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
      <TypeList
        items={items}
        selected={selected}
        level={level}
        setNomenclatureSlug={(slug?: string) => {
          setNomenclatureSlug(slug)
          if (redirect) router.push(routes.NOMENCLATURE().path)
        }}
      />
    </ScrollArea>
  )
}

export { NomenclatureClient }
