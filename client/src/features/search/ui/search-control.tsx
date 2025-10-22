"use client"

import { cn } from "@/shared/lib"
import { Button, Input } from "@/shared/ui"
import { Search } from "lucide-react"
import { ChangeEvent, useState } from "react"

interface SearchControlProps {
  search?: string
  setSearch: (search?: string) => void
}

const SearchControl = ({ search, setSearch }: SearchControlProps) => {
  const [input, setInput] = useState<string>(search || "")

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }
  const handleApplyOptions = () => {
    setSearch(input)
  }
  const handleResetOptions = () => {
    setSearch(undefined)
    setInput("")
  }

  return (
    <div
      className="flex items-center max-w-400 w-full gap-x-2"
      itemProp="potentialAction"
      itemScope
      itemType="https://schema.org/SearchAction"
    >
      <Input
        type="text"
        itemProp="query-input"
        placeholder="Поиск по каталогу"
        className={cn(
          "max-w-100 focus-visible:ring-1 focus-visible:ring-(--color-brand) text-sm placeholder:text-sm bg-muted"
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
        disabled={!search}
        onClick={handleResetOptions}
      >
        Сбросить
      </Button>
    </div>
  )
}

export { SearchControl }
