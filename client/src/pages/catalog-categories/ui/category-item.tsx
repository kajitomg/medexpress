import { CategoryBase } from "@/entities/category/model"
import { routes } from "@/shared/config/routes"
import { urlBuilder } from "@/shared/lib/url-builder"
import { Button, List } from "@/shared/ui"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

interface CatalogItemProps {
  category: CategoryBase
}

const CategoryItem = ({ category }: CatalogItemProps) => {
  const renderCategoryChildrenItem = (item: CategoryBase) => (
    <li key={item.id}>
      <Button
        asChild
        variant="link"
        className="cursor-pointer text-left text-sm font-extralight h-auto p-0 whitespace-normal hover:no-underline hover:text-[#93A79E]"
      >
        <Link
          href={{
            href: routes.CATALOG(item.id).path,
            search: null,
            query: null,
          }}
        >
          <span>{item.title}</span>
        </Link>
      </Button>
    </li>
  )

  return (
    <li key={category.id} className="flex items-start gap-4">
      <Image
        src={
          category.media?.url
            ? urlBuilder(category.media?.url)
            : urlBuilder("/uploads/placeholder_y_Pg_Ly_Fqc_0d8b721762.webp")
        }
        alt="alt"
        width="250"
        height="250"
        className="w-80 h-auto object-cover rounded-2xl"
      />
      <div className="flex-auto">
        <Button
          asChild
          variant="link"
          className="grid grid-flow-col justify-between w-full h-auto p-0 gap-2 items-start text-lg font-black cursor-pointer text-left row-start-1 whitespace-normal hover:no-underline hover:text-[#93A79E]"
        >
          <Link href={routes.CATALOG(category.id).path}>
            <span className="min-h-7">{category.title}</span>
            <div className="flex items-center justify-center h-7">
              <ChevronRight />
            </div>
          </Link>
        </Button>
        <List
          as="ul"
          items={category.childrens}
          renderItem={renderCategoryChildrenItem}
          className={`mt-4 grid grid-cols-[repeat(auto-fill,_minmax(150px,1fr))] gap-2 `}
        />
      </div>
    </li>
  )
}

export { CategoryItem }
