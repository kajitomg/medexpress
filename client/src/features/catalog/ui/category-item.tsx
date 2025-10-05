import { CategoryBase } from "@/entities/category/model"
import { routes } from "@/shared/config/routes"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { DocumentServices } from "@/shared/model"
import { Card, CardContent, Typography } from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

interface CatalogCategoryItemProps {
  category: CategoryBase & DocumentServices
}

const CatalogCategoryItem = ({ category }: CatalogCategoryItemProps) => {
  return (
    <Link href={routes.CATALOG(category.slug).path}>
      <Card className="group shadow-black/20 hover:shadow-xl transition-all duration-200 from-muted/50 to-muted h-full w-full rounded-md bg-linear-to-b outline-hidden select-none focus:shadow-md">
        <CardContent className="flex flex-col md:flex-row items-start gap-4 h-full">
          <div className="flex-auto w-full md:w-auto md:flex-none h-full basis-full lg:basis-35">
            <AspectRatio ratio={16 / 9}>
              <Image
                itemProp="image"
                src={imageUrlBuilder(category.image?.url)}
                alt={category.name}
                width="250"
                height="250"
                className="w-full h-full object-cover rounded-2xl"
              />
            </AspectRatio>
          </div>
          <div className="flex-auto basis-full w-full">
            <div className="transition-[color] duration-200 grid grid-flow-col justify-between w-full h-auto p-0 gap-2 items-start text-lg font-black cursor-pointer text-left row-start-1 whitespace-normal group-hover:text-[#93A79E] group-focus:text-[#93A79E]">
              <span className="min-h-7">{category.name}</span>
              <div className="flex items-center justify-center h-7">
                <ChevronRight />
              </div>
            </div>
            <Typography>
              <strong>товаров:</strong> {category.products?.length}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export { CatalogCategoryItem }
