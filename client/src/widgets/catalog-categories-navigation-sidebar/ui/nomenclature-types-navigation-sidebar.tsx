import { fetchAsideDeviceSectionList } from "@/entities/device-section/services"
import { ClassificationListProvider } from "@/features/catalog/provider"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { TypeList } from "@/widgets/catalog-categories-navigation-sidebar/ui/list"

interface AsideProps {
  category_slug: string
}

const NomenclatureTypesNavigationSidebar = async ({
  category_slug,
}: AsideProps) => {
  const responseNomenclatures = await fetchAsideDeviceSectionList()

  const nomenclatures = responseNomenclatures.data

  return (
    <ClassificationListProvider initialState={{ list: nomenclatures }}>
      <ScrollArea className="w-80 h-full bg-background border-r-1 border-gray-800/10 p-2 pr-3">
        <div className="font-bold text-(--color-brand) text-xl px-3 pb-2">
          Номенклатурная классификация медицинских изделий
        </div>
        <TypeList items={nomenclatures} selected={category_slug} level={1} />
      </ScrollArea>
    </ClassificationListProvider>
  )
}

export { NomenclatureTypesNavigationSidebar }
