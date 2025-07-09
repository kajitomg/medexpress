import { CategoryBase } from "@/entities/category/model"
import { Routes } from "@/shared/config/routes"
import { Button } from "@/shared/ui"
import Link from "next/link"
import { ComponentProps } from "react"

interface MenuCatalogSubcategoryItemProps {
  category: CategoryBase
}

const MenuCatalogSubcategoryItem = ({
  category,
}: ComponentProps<"div"> & MenuCatalogSubcategoryItemProps) => {
  return (
    <div>
      <Button
        asChild
        variant="link"
        className="whitespace-normal justify-start h-auto bg-gray-100 w-full mb-2"
      >
        <Link href={Routes.CATALOG(category.id)}>
          {category.code}
          {".\n"}
          {category.title}
        </Link>
      </Button>
    </div>
  )
}

export { MenuCatalogSubcategoryItem }
