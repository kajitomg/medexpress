"use client"

import { DeviceSectionBase } from "@/entities/device-section/model"
import { DocumentServices } from "@/shared/model"
import { List } from "@/shared/ui/list"
import { TypeItem } from "@/widgets/catalog-categories-navigation-sidebar/ui/item"
import { ComponentProps, useCallback } from "react"

interface CategoriesListProps {
  items?: (DeviceSectionBase & DocumentServices)[]
  selected: string
  level: number
}

const TypeList = ({
  items,
  selected,
  level,
  className,
  ...props
}: ComponentProps<"div"> & CategoriesListProps) => {
  const renderNavigationCategoryItem = useCallback(
    (item: DeviceSectionBase & DocumentServices) => {
      return (
        <TypeItem key={item.id} item={item} selected={selected} level={level} />
      )
    },
    [selected, level]
  )

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
