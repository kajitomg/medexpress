"use client"

import { CategoryBase, CategoryOptions } from "@/entities/category/model"
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
      <div className="flex flex-col items-center gap-8">
        <Image
          src="/oborud.png"
          alt="alt"
          width="100"
          height="100"
          className="h-auto w-60 object-cover rounded-2xl"
        />
        <MenuCatalogCategoryList
          categories={initCategoriesList || []}
          selectedIndex={selectedIndex}
          handleMouseEnter={callbacks.handleMouseEnter}
          handleMouseLeave={callbacks.handleMouseLeave}
          className="flex flex-col flex-auto w-80 overflow-y-auto gap-2"
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
