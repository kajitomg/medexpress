"use client"
import { CategoryBase, CategoryOptions } from "@/entities/category/model"
import { Routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { DocumentId, DocumentServices } from "@/shared/model"
import { Button } from "@/shared/ui"
import { AsideList } from "@/widgets/asidetmp/aside-list"
import Link from "next/link"
import { ComponentProps, useMemo } from "react"

interface CategoryItemProps {
  category: CategoryBase & Partial<CategoryOptions & DocumentServices>
  available?: boolean
  selectedCategory: DocumentId
  resetOptions: () => void
}

const AsideItem = ({
  category,
  available,
  selectedCategory,
  resetOptions,
}: ComponentProps<"div"> & CategoryItemProps) => {
  const visible = useMemo(
    () =>
      Boolean(
        available ||
          category.childrens?.some((item) => item.id === selectedCategory)
      ),
    [available, category, selectedCategory]
  )

  return (
    <div>
      <Button
        asChild
        className={cn(
          available && "text-red-400",
          "whitespace-normal h-auto w-full justify-start p-1"
        )}
        variant="link"
      >
        <Link href={Routes.CATALOG(category.id)} onClick={resetOptions}>
          <span>
            <span className="font-bold">
              {category.code}.{"\n"}
            </span>
            {category.title}
          </span>
        </Link>
      </Button>

      {category.childrens?.length && (
        <div className={cn("overflow-hidden h-0", visible && "pl-2 h-full")}>
          <AsideList
            categories={category.childrens}
            selectedCategory={selectedCategory}
          />
        </div>
      )}
    </div>
  )
}

export { AsideItem }
