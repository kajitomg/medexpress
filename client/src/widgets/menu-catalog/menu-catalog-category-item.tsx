import { CategoryBase } from "@/entities/category/model"
import { Routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { Button } from "@/shared/ui"
import Link from "next/link"
import { ComponentProps } from "react"

interface MenuCatalogCategoryItemProps {
  category: CategoryBase
  selectedCategory?: boolean
  handleMouseEnter: () => void
  handleMouseLeave: () => void
}

const MenuCatalogCategoryItem = ({
  category,
  selectedCategory,
  handleMouseEnter,
  handleMouseLeave,
}: ComponentProps<"div"> & MenuCatalogCategoryItemProps) => {
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "flex flex-col my-1 p-2 py-1.5 rounded-lg bg-gray-100",
        selectedCategory && "bg-gray-200"
      )}
    >
      <Button asChild variant="link" className="whitespace-normal h-auto">
        <Link href={Routes.CATALOG(category.id)}>
          {category.code}
          {".\n"}
          {category.title}
        </Link>
      </Button>
    </div>
  )
}

export { MenuCatalogCategoryItem }
