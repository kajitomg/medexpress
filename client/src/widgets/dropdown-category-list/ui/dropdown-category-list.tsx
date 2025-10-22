"use client"

import { HeaderSections } from "@/entities/_single-types/header/model/header"
import { PageSections } from "@/entities/page/model/page"
import { useCategoryListStore } from "@/features/category/provider"
import { useGlobalStore } from "@/features/global/provider"
import { createSectionListStore } from "@/features/sections/provider"
import { selectSectionItemByName } from "@/features/sections/store"
import { routes } from "@/shared/config/routes"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { usePageLayoutStore } from "@/shared/provider/page-layout-provider"
import { NavigationMenuLink } from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { CategoryList } from "@/widgets/dropdown-category-list/ui/category-list"
import Image from "next/image"
import Link from "next/link"
import { ComponentProps, useCallback, useRef, useState } from "react"

const useSectionsStore =
  createSectionListStore<(PageSections | HeaderSections)[]>()

const DropdownCategoryList = ({ ...props }: ComponentProps<"nav">) => {
  const catalogHero = useSectionsStore(selectSectionItemByName("sections.hero"))
  const offset = usePageLayoutStore((state) => state.offset)
  const offsetTop = offset.top !== undefined ? offset.top - 35 : 160

  const defaultMedia = useGlobalStore(
    (store) => store.item?.defaultCategoryImage
  )
  const categories = useCategoryListStore((state) => state.list)

  const [selectedCategory, setSelectedCategory] = useState<number>(-1)

  const hoverTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = useCallback(
    (index: number, delay: number = 300) =>
      () => {
        if (hoverTimeout.current) {
          clearTimeout(hoverTimeout.current)
        }

        hoverTimeout.current = setTimeout(() => {
          setSelectedCategory(index)
        }, delay)
      },
    [hoverTimeout, setSelectedCategory]
  )

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current)
    }
  }, [hoverTimeout])

  return (
    <nav
      role="navigation"
      aria-label="Категории каталога"
      className="flex max-w-4xl lg:max-w-6xl xl:max-w-7xl w-full h-full gap-4"
      style={{
        maxHeight: `calc(100vh - ${offsetTop}px)`,
      }}
      {...props}
    >
      <div>
        <NavigationMenuLink asChild>
          <Link
            onMouseEnter={handleMouseEnter(-1)}
            onMouseLeave={handleMouseLeave}
            href={routes.CATALOG().path}
            className="max-w-80 w-full from-background/50 to-background flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
          >
            <div className="w-full">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={imageUrlBuilder(
                    categories?.[selectedCategory]?.image?.url ||
                      catalogHero?.picture?.url ||
                      defaultMedia?.url
                  )}
                  alt="Изображение категории"
                  width="200"
                  height="200"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </AspectRatio>
            </div>
            <div className="mt-4 mb-2 text-lg font-medium">Каталог</div>
            <p className="text-muted-foreground text-sm leading-tight">
              Медицинские изделия оптом в Геогриевске с доставкой
            </p>
          </Link>
        </NavigationMenuLink>
      </div>
      <div>
        <ScrollArea className="h-full">
          <ul className="w-[400px] md:w-[500px] lg:w-[600px]">
            <CategoryList
              categories={categories}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          </ul>
        </ScrollArea>
      </div>
    </nav>
  )
}

export { DropdownCategoryList }
