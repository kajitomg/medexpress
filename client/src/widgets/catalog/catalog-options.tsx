"use client"

import { useCatalogOptionsStore } from "@/features/catalog/store"
import { Button, Input } from "@/shared/ui"
import { Search } from "lucide-react"
import { ChangeEvent, ComponentProps, useEffect, useState } from "react"

interface CatalogOptionsProps {}

const CatalogOptions = ({}: ComponentProps<"div"> & CatalogOptionsProps) => {
  const { searchQuery, changeSearchQuery } = useCatalogOptionsStore(
    (state) => state
  )
  const [input, setInput] = useState<string>(searchQuery || "")

  useEffect(() => {
    setInput(searchQuery || "")
  }, [searchQuery])

  const callbacks = {
    changeSearch: (e: ChangeEvent<HTMLInputElement>) => {
      setInput(e.currentTarget.value)
    },
    applyOptions: () => {
      changeSearchQuery(input || null)
    },
    resetOptions: () => {
      changeSearchQuery(null)
    },
  }

  return (
    <div className="my-8 max-w-400 w-full flex items-center space-x-2">
      <Input
        type="text"
        variant="brand"
        placeholder="Поиск по каталогу"
        className="w-100"
        value={input}
        onChange={callbacks.changeSearch}
      />
      <Button
        type="button"
        variant="brand"
        className="rounded-full cursor-pointer"
        onClick={callbacks.applyOptions}
      >
        <Search />
        Найти
      </Button>
      <Button
        type="button"
        variant="brand"
        className="rounded-full cursor-pointer"
        disabled={!searchQuery}
        onClick={callbacks.resetOptions}
      >
        Сбросить
      </Button>
    </div>
  )
}

export { CatalogOptions }
