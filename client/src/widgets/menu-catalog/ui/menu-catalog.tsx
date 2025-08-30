"use client"

import { useCategoriesListStore } from "@/features/catalog/provider"
import { urlBuilder } from "@/shared/lib/url-builder"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { CategoriesList } from "@/widgets/menu-catalog/ui/categories-list"
import { SubcategoriesList } from "@/widgets/menu-catalog/ui/subcategories-list"
import Image from "next/image"
import { ComponentProps, useState } from "react"

const MenuCatalog = ({ ...props }: ComponentProps<"nav">) => {
  const categories = useCategoriesListStore((state) => state.categories)

  const [selectedCategory, setSelectedCategory] = useState<number>(0)

  return (
    <nav
      role="navigation"
      aria-label="Категории каталога"
      className="flex max-w-4xl lg:max-w-6xl xl:max-w-7xl  w-full max-h-[calc(100vh-100px)] h-full gap-8"
      {...props}
    >
      <div className="flex flex-col flex-none basis-1/4 gap-8">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={
              categories?.[selectedCategory].media?.url
                ? urlBuilder(categories?.[selectedCategory].media?.url)
                : urlBuilder("/uploads/placeholder_y_Pg_Ly_Fqc_0d8b721762.webp")
            }
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
