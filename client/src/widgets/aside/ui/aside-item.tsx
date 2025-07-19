import { CategoryBase, CategoryOptions } from "@/entities/category/model"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { DocumentId, DocumentServices } from "@/shared/model"
import { Button } from "@/shared/ui"
import { AsideList } from "@/widgets/aside/ui/aside-list"
import Link from "next/link"

interface CategoryItemProps {
  category: CategoryBase & Partial<CategoryOptions & DocumentServices>
  available?: boolean
  expanded?: boolean
  selectedCategory: DocumentId
  resetOptions: () => void
}

const AsideItem = ({
  category,
  available,
  expanded,
  selectedCategory,
  resetOptions,
}: CategoryItemProps) => {
  return (
    <div>
      <Button
        asChild
        variant="link"
        className={cn(
          "whitespace-normal h-auto w-full justify-start p-1",
          available && "text-red-400"
        )}
      >
        <Link href={routes.CATALOG(category.id).path} onClick={resetOptions}>
          <span>
            <span className="font-bold">
              {category.code}.{"\n"}
            </span>
            {category.title}
          </span>
        </Link>
      </Button>

      {category.childrens?.length && (
        <div className={cn("overflow-hidden h-0", expanded && "pl-2 h-full")}>
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
