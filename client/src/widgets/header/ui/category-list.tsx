import { CategoryBase } from "@/entities/category/model/category"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { Button, List } from "@/shared/ui"
import Link from "next/link"
import { ComponentProps } from "react"

interface CategoryListProps {
  categories?: (CategoryBase & DocumentServices)[]
}

const CategoryList = ({
  categories,
  className,
  ...props
}: ComponentProps<"div"> & CategoryListProps) => {
  const renderCategoryItem = (item: CategoryBase & DocumentServices) => (
    <Button
      key={item.id}
      variant="ghost"
      size="sm"
      className="font-bold backdrop-blur-3xl hover:text-(--color-brand) cursor-pointer"
    >
      <Link href={routes.CATALOG(item.slug).path}>{item.name}</Link>
    </Button>
  )

  return (
    <List
      items={categories}
      renderItem={renderCategoryItem}
      className={cn("flex gap-1", className)}
      {...props}
    />
  )
}

export { CategoryList }
