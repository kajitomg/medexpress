"use client"

import { DeviceTypeBase } from "@/entities/device-type/model"
import { NomenclatureTypeItem } from "@/features/catalog/ui"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { List } from "@/shared/ui/list"
import * as React from "react"
import { ComponentProps, useCallback } from "react"

interface ProductsListProps {
  items?: (DeviceTypeBase & DocumentServices)[]
}

const NomenclatureTypeList = ({
  items,
  className,
  ...props
}: ComponentProps<"div"> & ProductsListProps) => {
  const renderCatalogItem = useCallback(
    (item: DeviceTypeBase & DocumentServices) => {
      return <NomenclatureTypeItem key={item.id} item={item} />
    },
    []
  )
  return (
    <List
      items={items}
      renderItem={renderCatalogItem}
      className={cn(`flex flex-col gap-2`, className)}
      {...props}
    />
  )
}

export { NomenclatureTypeList }
