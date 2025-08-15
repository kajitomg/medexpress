import { CategoryBase } from "@/entities/category/model"
import { routes } from "@/shared/config/routes"
import { DocumentServices } from "@/shared/model"
import { Button } from "@/shared/ui"
import Link from "next/link"

interface SubcategoryItemProps {
  category: CategoryBase & DocumentServices
}

const SubcategoryItem = ({ category }: SubcategoryItemProps) => {
  return (
    <li>
      <Button
        asChild
        variant="link"
        className="whitespace-normal h-auto w-full justify-start mb-2 bg-black/5"
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

export { SubcategoryItem }
