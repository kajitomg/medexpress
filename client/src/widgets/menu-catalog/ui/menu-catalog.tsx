"use client"

import { useCategoriesListStore } from "@/features/catalog/provider"
import { useGlobalStore } from "@/features/global/provider"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { usePageLayoutStore } from "@/shared/provider/page-layout-provider"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { CategoriesList } from "@/widgets/menu-catalog/ui/categories-list"
import { SubcategoriesList } from "@/widgets/menu-catalog/ui/subcategories-list"
import Image from "next/image"
import { ComponentProps, useState } from "react"

const MenuCatalog = ({ ...props }: ComponentProps<"nav">) => {
  const offset = usePageLayoutStore((state) => state.offset)
  const offsetTop = offset.top !== undefined ? offset.top - 35 : 160

  const defaultMedia = useGlobalStore(
    (store) => store.data?.defaultCategoryImage
  )
  const categories = useCategoriesListStore((state) => state.categories)

  const [selectedCategory, setSelectedCategory] = useState<number>(0)

  return (
    <nav
      role="navigation"
      aria-label="Категории каталога"
      className="flex max-w-4xl lg:max-w-6xl xl:max-w-7xl w-full h-full gap-8"
      style={{
        maxHeight: `calc(100vh - ${offsetTop}px)`,
      }}
      {...props}
    >
      <div className="flex flex-col flex-none basis-1/4 gap-8">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={imageUrlBuilder(
              categories?.[selectedCategory].media?.url || defaultMedia?.url
            )}
            alt="Изображение категории"
            width="200"
            height="200"
            className="w-full h-full object-cover rounded-2xl"
          />
        </AspectRatio>
        <ScrollArea className="overflow-y-auto pr-3">
          <CategoriesList
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            className="flex flex-col w-full gap-2"
          />
        </ScrollArea>
      </div>
      <div>
        <ScrollArea className="h-full">
          <SubcategoriesList
            subcategories={categories?.[selectedCategory]?.childrens || []}
            className="flex-auto overflow-y-auto columns-2 lg:columns-3 gap-2 pr-3"
          />
        </ScrollArea>
      </div>
    </nav>
  )
}

export { MenuCatalog }
