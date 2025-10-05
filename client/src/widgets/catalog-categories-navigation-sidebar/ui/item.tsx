import { DeviceSectionBase } from "@/entities/device-section/model"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { Button, Separator } from "@/shared/ui"
import { TypeList } from "@/widgets/catalog-categories-navigation-sidebar/ui/list"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { memo } from "react"

interface CategoryItemProps {
  item: DeviceSectionBase & DocumentServices
  selected: string
  level: number
}

const TypeItem = memo(({ item, selected, level }: CategoryItemProps) => {
  const available = item.slug === selected

  return (
    <div
      className={cn(
        `flex flex-col-reverse group rounded-sm`,
        available && `available`,
        available &&
          level > 1 &&
          Boolean(item.childrens?.length) &&
          `bg-black/5`
      )}
    >
      {available && level > 1 && Boolean(item.childrens?.length) && (
        <Separator orientation="horizontal" />
      )}
      {Boolean(item.childrens?.length) && (
        <div
          className={cn(
            "overflow-hidden h-0 hidden peer",
            `block has-[.available]:flex has-[.available]:h-auto has-[.available]:my-1`,
            available && "flex h-auto my-1"
          )}
        >
          {level === 1 && (
            <Separator
              orientation="vertical"
              className="mx-2 ml-3 data-[orientation=vertical]:w-[2px] data-[orientation=vertical]:h-auto rounded-full"
            />
          )}
          <TypeList
            items={item.childrens}
            selected={selected}
            level={level + 1}
          />
        </div>
      )}
      {available && level > 1 && Boolean(item.childrens?.length) && (
        <Separator orientation="horizontal" />
      )}
      <Button
        asChild
        variant="link"
        size="icon"
        className={cn(
          "whitespace-normal h-auto w-full justify-between py-1 px-2 hover:bg-black/5 hover:no-underline",
          available && "text-(--color-brand)",
          "peer-has-[.available]:[&_.chevron]:rotate-90"
        )}
      >
        <Link href={routes.NOMENCLATURE(item.slug).path}>
          <span className="font-bold">
            <span className="font-black">
              {item.code}.{"\n"}
            </span>
            {item.name}
          </span>
          {Boolean(item.childrens?.length) && (
            <ChevronRight
              className={cn(`size-4 chevron`, available && "rotate-90")}
            />
          )}
        </Link>
      </Button>
    </div>
  )
})

TypeItem.displayName = "Item"

export { TypeItem }
