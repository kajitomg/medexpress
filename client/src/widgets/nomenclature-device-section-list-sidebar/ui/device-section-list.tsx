import { DeviceSectionBase } from "@/entities/device-section/model"
import { hasSlug } from "@/shared/lib/has-slug"
import { StrapiOptional } from "@/shared/model/strapi"
import { List } from "@/shared/ui/list"
import { DeviceSectionItemCard } from "@/widgets/nomenclature-device-section-list-sidebar/ui/device-section-item-card"
import { ComponentProps } from "react"

interface DeviceSectionListProps {
  items?: StrapiOptional<DeviceSectionBase[]>
  level: number
  selected?: string
  setNomenclatureSlug: (slug?: string) => void
  closeModal?: true
}

const DeviceSectionList = ({
  items,
  level,
  className,
  selected,
  setNomenclatureSlug,
  closeModal,
  ...props
}: ComponentProps<"div"> & DeviceSectionListProps) => {
  const renderNavigationCategoryItem = (item: DeviceSectionBase) => {
    const expanded = hasSlug(item, selected)
    const select = selected === item.slug ? item.parent?.slug : item.slug

    return (
      <DeviceSectionItemCard
        key={item.id}
        item={item}
        selected={selected}
        level={level}
        expanded={expanded}
        setNomenclatureSlug={setNomenclatureSlug}
        onSelectItem={() => setNomenclatureSlug(select)}
        closeModal={closeModal}
      />
    )
  }

  return (
    <List
      as="nav"
      items={items}
      renderItem={renderNavigationCategoryItem}
      className={className}
      {...props}
    />
  )
}

export { DeviceSectionList }
