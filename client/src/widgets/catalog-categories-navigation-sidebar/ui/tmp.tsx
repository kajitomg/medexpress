import { DeviceSectionBase } from "@/entities/device-section/model"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { Button, Separator } from "@/shared/ui"
import { TypeList } from "@/widgets/catalog-categories-navigation-sidebar/ui/list"
import { ChevronRight } from "lucide-react"
import { memo, useEffect, useRef, useState } from "react"

interface CategoryItemProps {
  item: DeviceSectionBase & DocumentServices
  selected?: string
  level: number
  selectItem: (slug?: string) => void
  expanded: boolean
}

const ANIMATION_DURATION = 300

const TypeItem = memo(
  ({ item, selected, level, selectItem, expanded }: CategoryItemProps) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
      undefined
    )
    const available = item.slug === selected
    const select = selected === item.slug ? item.parent?.slug : item.slug

    const [isRendered, setIsRendered] = useState(expanded || available)

    useEffect(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = undefined
      }

      if (expanded || available) {
        setIsRendered(true)
      } else {
        timerRef.current = setTimeout(() => {
          setIsRendered(false)
        }, ANIMATION_DURATION)
      }
      return () => {
        clearTimeout(timerRef.current)
        timerRef.current = undefined
      }
    }, [expanded, available])
    return (
      <div
        className={cn(
          `flex flex-col-reverse group rounded-sm`,
          available && `available`
        )}
      >
        {available && level > 1 && Boolean(item.childrens?.length) && (
          <Separator orientation="horizontal" />
        )}
        <div
          className={cn(
            `grid overflow-hidden transition-[grid-template-rows] transition-[margin] duration-${ANIMATION_DURATION} peer has-[.available]:grid-rows-[1fr] has-[.available]:my-1`,
            {
              "grid-rows-[1fr] my-1":
                available && Boolean(item.childrens?.length),
              "grid-rows-[0fr]": !available,
            }
          )}
        >
          {isRendered && Boolean(item.childrens?.length) && (
            <div className={cn("overflow-hidden flex")}>
              {level === 1 && (
                <Separator
                  orientation="vertical"
                  className="mx-2 ml-3 data-[orientation=vertical]:w-[2px] data-[orientation=vertical]:h-auto rounded-full"
                />
              )}
              <TypeList
                items={item.childrens}
                level={level + 1}
                initSelect={selected}
              />
            </div>
          )}
        </div>
        {available && level > 1 && Boolean(item.childrens?.length) && (
          <Separator orientation="horizontal" />
        )}
        <Button
          variant="link"
          size="icon"
          onClick={() => {
            console.log(select)
            selectItem(select)
          }}
          className={cn(
            "whitespace-normal h-auto w-full justify-between text-start py-1 px-2 hover:bg-black/5 hover:no-underline cursor-pointer",
            available && "text-(--color-brand)",
            "peer-has-[.available]:[&_.chevron]:rotate-90"
          )}
        >
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
        </Button>
      </div>
    )
  }
)

TypeItem.displayName = "Item"

export { TypeItem }
