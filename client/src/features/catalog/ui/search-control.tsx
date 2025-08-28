"use client"

import { useCatalogOptionsStore } from "@/features/catalog/provider"
import { cn } from "@/shared/lib"
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
    <div className="flex items-center max-w-400 w-full gap-x-2">
      <Input
        type="text"
        placeholder="Поиск по каталогу"
        className={cn(
          "w-100 focus-visible:ring-1 focus-visible:ring-(--color-brand) text-sm placeholder:text-sm bg-muted"
        )}
        value={input}
        onChange={handleChangeSearch}
      />
      <Button
        type="button"
        variant="brand"
        className="cursor-pointer"
        onClick={handleApplyOptions}
      >
        <Search />
        Найти
      </Button>
      <Button
        type="button"
        variant="outline"
        className=" cursor-pointer"
        disabled={!searchQuery}
        onClick={handleResetOptions}
      >
        Сбросить
      </Button>
    </div>
  )
}

export { CatalogSearchControl }
