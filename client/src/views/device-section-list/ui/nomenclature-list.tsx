"use client"

import { DeviceSectionBase } from "@/entities/device-section/model"
import { DeviceSectionItem } from "@/features/catalog/ui"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { List } from "@/shared/ui/list"
import * as React from "react"
import { ComponentProps, useCallback } from "react"

interface NomenclatureListProps {
  nomenclatures?: (DeviceSectionBase & DocumentServices)[]
}

const NomenclatureList = ({
  nomenclatures,
  className,
  ...props
}: ComponentProps<"div"> & NomenclatureListProps) => {
  const renderNomenclatureItem = useCallback(
    (item: DeviceSectionBase & DocumentServices) => {
      return <DeviceSectionItem key={item.id} item={item} />
    },
    []
  )
  return (
    <List
      items={nomenclatures}
      renderItem={renderNomenclatureItem}
      className={cn(
        `grid grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(350px,1fr))] md:grid-cols-[repeat(auto-fill,_minmax(500px,1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(800px,1fr))] gap-2`,
        className
      )}
      {...props}
    />
  )
}

export { NomenclatureList }
