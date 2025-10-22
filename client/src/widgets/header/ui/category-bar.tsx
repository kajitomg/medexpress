import { fetchNavigationCategoryList } from "@/entities/category/services"
import { CategoryListProvider } from "@/features/category/provider"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { Button } from "@/shared/ui"
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area"
import { CategoryList } from "@/widgets/header/ui/category-list"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { ComponentProps } from "react"

const CategoryBar = async ({ className, ...props }: ComponentProps<"div">) => {
  const responseCategories = await fetchNavigationCategoryList()

  const categories = responseCategories.data

  return (
    <CategoryListProvider initialState={{ list: categories }}>
      <div
        className={cn("w-full flex items-center px-4", className)}
        {...props}
      >
        <ScrollArea className="flex-1 min-w-0 rounded-sm pb-3 pr-2">
          <CategoryList
            categories={categories}
            className="flex gap-1 whitespace-nowrap"
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Button
          variant="ghost"
          size="icon"
          className="font-bold backdrop-blur-3xl hover:text-(--color-brand) cursor-pointer mb-3"
        >
          <Link href={routes.CATALOG().path}>
            <ChevronRight />
            <span className="sr-only">Открыть страницу подборок</span>
          </Link>
        </Button>
      </div>
    </CategoryListProvider>
  )
}

export { CategoryBar }
