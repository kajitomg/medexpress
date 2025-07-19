import { CategoryBase } from "@/entities/category/model"
import { routes } from "@/shared/config/routes"
import { Button } from "@/shared/ui"
import Link from "next/link"

interface MenuCatalogSubcategoryItemProps {
  category: CategoryBase
}

const MenuCatalogSubcategoryItem = ({
  category,
}: MenuCatalogSubcategoryItemProps) => {
  return (
    <li>
      <Button
        asChild
        variant="link"
        className="whitespace-normal h-auto w-full justify-start mb-2 bg-gray-100"
      >
        <Link href={routes.CATALOG(category.id).path}>
          {category.code}
          {".\n"}
          {category.title}
        </Link>
      </Button>
    </li>
  )
}

export { MenuCatalogSubcategoryItem }
