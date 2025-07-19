import { CategoryBase } from "@/entities/category/model"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { Button } from "@/shared/ui"
import Link from "next/link"

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
}: MenuCatalogCategoryItemProps) => {
  return (
    <li>
      <Button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        asChild
        variant="link"
        className={cn(
          "whitespace-normal h-auto rounded-lg p-2 py-1.5 bg-gray-100",
          selectedCategory && "bg-gray-200"
        )}
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

export { MenuCatalogCategoryItem }
