import { Button, Input } from "@/shared/ui"
import { Search } from "lucide-react"
import { ChangeEvent } from "react"

interface CatalogOptionsProps {
  input: string
  changeSearch: (e: ChangeEvent<HTMLInputElement>) => void
  applyOptions: () => void
  resetOptions: () => void
  searchQuery?: string | null
}

const CatalogOptions = ({
  input,
  searchQuery,
  changeSearch,
  applyOptions,
  resetOptions,
}: CatalogOptionsProps) => {
  return (
    <div className="flex items-center max-w-400 w-full my-8 gap-x-2">
      <Input
        type="text"
        variant="brand"
        placeholder="Поиск по каталогу"
        className="w-100"
        value={input}
        onChange={changeSearch}
      />
      <Button
        type="button"
        variant="brand"
        className="rounded-full cursor-pointer"
        onClick={applyOptions}
      >
        <Search />
        Найти
      </Button>
      <Button
        type="button"
        variant="brand"
        className="rounded-full cursor-pointer"
        disabled={!searchQuery}
        onClick={resetOptions}
      >
        Сбросить
      </Button>
    </div>
  )
}

export { CatalogOptions }
