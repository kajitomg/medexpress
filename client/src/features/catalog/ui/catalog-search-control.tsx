"use client"

import { useCatalogOptionsStore } from "@/features/catalog/provider"
import { Button, Input } from "@/shared/ui"
import { Search } from "lucide-react"
import { ChangeEvent, useState } from "react"

const CatalogSearchControl = () => {
  const searchQuery = useCatalogOptionsStore((state) => state.searchQuery)
  const changeSearchQuery = useCatalogOptionsStore(
    (state) => state.changeSearchQuery
  )

  const [input, setInput] = useState<string>(searchQuery || "")

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }
  const handleApplyOptions = () => {
    changeSearchQuery(input || undefined)
  }
  const handleResetOptions = () => {
    changeSearchQuery(undefined)
    setInput("")
  }

  return (
    <div className="flex items-center max-w-400 w-full my-8 gap-x-2">
      <Input
        type="text"
        variant="brand"
        placeholder="Поиск по каталогу"
        className="w-100"
        value={input}
        onChange={handleChangeSearch}
      />
      <Button
        type="button"
        variant="brand"
        className="rounded-full cursor-pointer"
        onClick={handleApplyOptions}
      >
        <Search />
        Найти
      </Button>
      <Button
        type="button"
        variant="brand"
        className="rounded-full cursor-pointer"
        disabled={!searchQuery}
        onClick={handleResetOptions}
      >
        Сбросить
      </Button>
    </div>
  )
}

export { CatalogSearchControl }
