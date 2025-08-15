import { CategoryBase } from "@/entities/category/model"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { Button, Separator } from "@/shared/ui"
import { CategoriesList } from "@/widgets/catalog-categories-navigation-sidebar/ui/categories-list"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { memo } from "react"

interface CategoryItemProps {
  category: CategoryBase & DocumentServices
  available?: boolean
  expanded?: boolean
  selectedCategory: string
}

const CategoryItem = memo(
  ({ category, available, expanded, selectedCategory }: CategoryItemProps) => {
    return (
      <div>
        <Button
          asChild
          variant="link"
          className={cn(
            "whitespace-normal h-auto w-full justify-start py-1 px-2 hover:bg-black/5 hover:no-underline",
            available && "text-(--color-brand)"
          )}
        >
          <Link href={routes.CATALOG(category.slug).path}>
            <span className="font-bold">
              <span className="font-black">
                {category.code}.{"\n"}
              </span>
              {category.title}
            </span>
            {category.childrens?.length && (
              <ChevronRight className={cn(expanded && "rotate-90")} />
            )}
          </Link>
        </Button>

        {category.childrens?.length && (
          <div
            className={cn(
              "overflow-hidden h-0",
              expanded && "flex h-auto my-1"
            )}
          >
            <Separator
              orientation="vertical"
              className="mx-2 ml-3 data-[orientation=vertical]:w-[2px] data-[orientation=vertical]:h-auto rounded-full"
            />
            <CategoriesList
              categories={category.childrens}
              selectedCategory={selectedCategory}
            />
          </div>
        )}
      </div>
    )
  }
)

CategoryItem.displayName = "CategoryItem"

export { CategoryItem }
