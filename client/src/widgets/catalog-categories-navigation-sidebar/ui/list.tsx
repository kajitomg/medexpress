import { DeviceSectionBase } from "@/entities/device-section/model"
import { hasSlug } from "@/shared/lib/has-slug"
import { DocumentServices } from "@/shared/model"
import { List } from "@/shared/ui/list"
import { TypeItem } from "@/widgets/catalog-categories-navigation-sidebar/ui/item"
import { ComponentProps } from "react"

interface CategoriesListProps {
  items?: (DeviceSectionBase & DocumentServices)[]
  level: number
  selected?: string
  setNomenclatureSlug: (slug?: string) => void
}

const TypeList = ({
  items,
  level,
  className,
  selected,
  setNomenclatureSlug,
  ...props
}: ComponentProps<"div"> & CategoriesListProps) => {
  const renderNavigationCategoryItem = (
    item: DeviceSectionBase & DocumentServices
  ) => {
    const expanded = hasSlug(item, selected)
    const select = selected === item.slug ? item.parent?.slug : item.slug

    return (
      <TypeItem
        key={item.id}
        item={item}
        selected={selected}
        level={level}
        expanded={expanded}
        setNomenclatureSlug={setNomenclatureSlug}
        onSelectItem={() => setNomenclatureSlug(select)}
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

export { TypeList }
