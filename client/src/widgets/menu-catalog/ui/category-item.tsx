import { CategoryBase } from "@/entities/category/model"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { Button } from "@/shared/ui"
import Link from "next/link"

interface CategoryItemProps {
  category: CategoryBase & DocumentServices
  selectedCategory?: boolean
  handleMouseEnter: () => void
  handleMouseLeave: () => void
}

const CategoryItem = ({
  category,
  selectedCategory,
  handleMouseEnter,
  handleMouseLeave,
}: CategoryItemProps) => {
  return (
    <li>
      <Button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        asChild
        variant="link"
        className={cn(
          "whitespace-normal h-auto rounded-lg p-2 py-1.5 bg-black/5 ",
          selectedCategory && "bg-gray-200"
        )}
      >
        <Link href={routes.CATALOG(category.slug).path}>
          <span className="font-bold">
            <span className="font-black">
              {category.code}.{"\n"}
            </span>
            {category.title}
          </span>
        </Link>
      </Button>
    </li>
  )
}

export { CategoryItem }
