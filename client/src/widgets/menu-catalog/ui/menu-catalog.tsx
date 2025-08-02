"use client"

import { CategoryBase, CategoryOptions } from "@/entities/category/model"
import { urlBuilder } from "@/shared/lib/url-builder"
import { DocumentServices } from "@/shared/model"
import { MenuCatalogCategoryList } from "@/widgets/menu-catalog/ui/menu-catalog-category-list"
import { MenuCatalogSubcategoryList } from "@/widgets/menu-catalog/ui/menu-catalog-subcategory-list"
import Image from "next/image"
import { useRef, useState } from "react"

interface MenuCatalogProps {
  initCategoriesList: (CategoryBase & CategoryOptions & DocumentServices)[]
}

const MenuCatalog = ({ initCategoriesList }: MenuCatalogProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null)

  const callbacks = {
    handleMouseEnter: (index: number) => () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current)
      }

      hoverTimeout.current = setTimeout(() => {
        setSelectedIndex(index)
      }, 300) // Дебаунс 300мс
    },

    handleMouseLeave: () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current)
      }
    },
  }
  return (
    <nav
      role="navigation"
      aria-label="Категории каталога"
      className="flex w-300 max-h-[calc(100vh-100px)] gap-8"
    >
      <div className="flex flex-col items-center gap-8 min-w-80 max-w-80">
        <Image
          src={
            initCategoriesList?.[selectedIndex].media?.url
              ? urlBuilder(initCategoriesList?.[selectedIndex].media?.url)
              : urlBuilder("/uploads/placeholder_y_Pg_Ly_Fqc_0d8b721762.webp")
          }
          alt="alt"
          width="200"
          height="200"
          className="max-h-50 min-h-50 w-full object-cover rounded-2xl"
        />
        <MenuCatalogCategoryList
          categories={initCategoriesList || []}
          selectedIndex={selectedIndex}
          handleMouseEnter={callbacks.handleMouseEnter}
          handleMouseLeave={callbacks.handleMouseLeave}
          className="flex flex-col flex-auto w-full overflow-y-auto gap-2"
        />
      </div>
      <div className="flex flex-col flex-auto">
        <MenuCatalogSubcategoryList
          subcategories={initCategoriesList?.[selectedIndex]?.childrens || []}
          className="flex-auto overflow-y-auto columns-3 gap-2 p-4"
        />
      </div>
    </nav>
  )
}

export { MenuCatalog }
