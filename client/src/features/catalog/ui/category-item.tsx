import { CategoryBase } from "@/entities/category/model"
import { routes } from "@/shared/config/routes"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { DocumentServices } from "@/shared/model"
import { Button, Card, CardContent, List } from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import * as React from "react"
import { CollectionPage, WithContext } from "schema-dts"

interface CatalogCategoryItemProps {
  category: CategoryBase & DocumentServices
}

const collectionPage = (
  pageName?: string,
  items?: (CategoryBase & DocumentServices)[]
): WithContext<CollectionPage> => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: pageName,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: items?.map((item, i) => ({
      "@type": "ListItem",
      position: i,
      name: item.title,
      url: routes.COLLESCTIONS(item.slug).path,
    })),
  },
})

const CatalogCategoryItem = ({ category }: CatalogCategoryItemProps) => {
  const renderSubcategoryItem = (item: CategoryBase & DocumentServices) => (
    <SubcategoryItem key={item.id} category={item} />
  )

  return (
    <Card className="shadow-black/20 hover:shadow-xl duration-200">
      <CardContent className="flex flex-col md:flex-row items-start gap-4">
        <div className="max-w-80 w-full md:max-w-60 lg:max-w-80">
          <AspectRatio ratio={16 / 9}>
            <Image
              itemProp="image"
              src={imageUrlBuilder(category.media?.url)}
              alt={category.title}
              width="250"
              height="250"
              className="w-full h-full object-cover rounded-2xl"
            />
          </AspectRatio>
        </div>
        <div className="flex-auto basis-full w-full">
          <Button
            asChild
            variant="link"
            className="grid grid-flow-col justify-between w-full h-auto p-0 gap-2 items-start text-lg font-black cursor-pointer text-left row-start-1 whitespace-normal hover:no-underline hover:text-[#93A79E]"
          >
            <Link href={routes.CATALOG(category.slug).path}>
              <span className="min-h-7">{category.title}</span>
              <div className="flex items-center justify-center h-7">
                <ChevronRight />
              </div>
            </Link>
          </Button>
          <Script
            id={`subcategories-${category.slug}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                collectionPage(category?.title, category.childrens)
              ),
            }}
          />
          <List
            as="ul"
            items={category.childrens}
            renderItem={renderSubcategoryItem}
            className={`mt-2 lg:mt-4 grid grid-cols-[repeat(auto-fill,_minmax(150px,1fr))] gap-1 lg:gap-2 `}
          />
        </div>
      </CardContent>
    </Card>
  )
}

interface SubcategoryItemProps {
  category: CategoryBase & DocumentServices
}

const SubcategoryItem = ({ category }: SubcategoryItemProps) => {
  return (
    <li>
      <Button
        asChild
        variant="link"
        className="cursor-pointer text-left text-sm font-extralight h-auto p-0 whitespace-normal hover:no-underline hover:text-[#93A79E]"
      >
        <Link href={routes.CATALOG(category.slug).path}>
          <span>{category.title}</span>
        </Link>
      </Button>
    </li>
  )
}

export { CatalogCategoryItem }
