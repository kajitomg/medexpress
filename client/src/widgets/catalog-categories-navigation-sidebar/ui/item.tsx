import { DeviceSectionBase } from "@/entities/device-section/model"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { Button, Separator } from "@/shared/ui"
import { TypeList } from "@/widgets/catalog-categories-navigation-sidebar/ui/list"
import { ChevronRight } from "lucide-react"
import { MouseEventHandler } from "react"

interface CategoryItemProps {
  item: DeviceSectionBase & DocumentServices
  selected?: string
  level: number
  onSelectItem?: MouseEventHandler<HTMLButtonElement>
  setNomenclatureSlug: (slug?: string) => void
  expanded: boolean
}

const TypeItem = ({
  item,
  selected,
  level,
  onSelectItem,
  expanded,
  setNomenclatureSlug,
}: CategoryItemProps) => {
  const available = item.slug === selected

  const isRendered = expanded || available

  return (
    <div className={cn(`flex flex-col-reverse rounded-sm`)}>
      {available && level > 1 && Boolean(item.childrens?.length) && (
        <Separator orientation="horizontal" />
      )}
      {isRendered && Boolean(item.childrens?.length) && (
        <div
          className={cn("overflow-hidden", {
            "flex my-1": expanded && Boolean(item.childrens?.length),
            "hidden h-0": !expanded,
          })}
        >
          {level === 1 && (
            <Separator
              orientation="vertical"
              className="mx-2 ml-3 data-[orientation=vertical]:w-[2px] data-[orientation=vertical]:h-auto rounded-full"
            />
          )}
          <TypeList
            items={item.childrens}
            level={level + 1}
            selected={selected}
            setNomenclatureSlug={setNomenclatureSlug}
          />
        </div>
      )}
      {available && level > 1 && Boolean(item.childrens?.length) && (
        <Separator orientation="horizontal" />
      )}
      <Button
        variant="link"
        size="icon"
        onClick={onSelectItem}
        className={cn(
          "whitespace-normal h-auto w-full justify-between text-start py-1 px-2 hover:bg-black/5 hover:no-underline cursor-pointer",
          available && "text-(--color-brand)"
        )}
      >
        <span className="font-bold">
          <span className="font-black">
            {item.code}.{"\n"}
          </span>
          {item.name}
        </span>
        {Boolean(item.childrens?.length) && (
          <ChevronRight className={cn(`size-4`, expanded && "rotate-90")} />
        )}
      </Button>
    </div>
  )
}

TypeItem.displayName = "Item"

export { TypeItem }
