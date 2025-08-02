"use client"

import { CollectionBase } from "@/entities/collection/model"
import { CollectionItem } from "@/pages/collections/ui/collection-item"
import { DocumentServices } from "@/shared/model"
import { List } from "@/shared/ui/list"
import * as React from "react"
import { useCallback } from "react"

interface CategoriesListProps {
  collections: (CollectionBase & DocumentServices)[]
}

const CollectionsList = ({ collections }: CategoriesListProps) => {
  const renderCollectionItem = useCallback(
    (item: CollectionBase & DocumentServices) => {
      return <CollectionItem key={item.id} collection={item} />
    },
    []
  )
  return (
    <List
      items={collections}
      renderItem={renderCollectionItem}
      className={`grid grid-cols-[repeat(auto-fill,_minmax(400px,1fr))] gap-2`}
    />
  )
}

export { CollectionsList }
