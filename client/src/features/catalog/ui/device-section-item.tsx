import { DeviceSectionBase } from "@/entities/device-section/model"
import { routes } from "@/shared/config/routes"
import { DocumentServices } from "@/shared/model"
import { Button, Card, CardContent, List } from "@/shared/ui"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import Script from "next/script"
import * as React from "react"
import { CollectionPage, WithContext } from "schema-dts"

interface DeviceSectionItemProps {
  item: DeviceSectionBase & DocumentServices
}

const collectionPage = (
  pageName?: string,
  items?: (DeviceSectionBase & DocumentServices)[]
): WithContext<CollectionPage> => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: pageName,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: items?.map((item, i) => ({
      "@type": "ListItem",
      position: i,
      name: item.name,
      url: routes.NOMENCLATURE(item.slug).path,
    })),
  },
})

const DeviceSectionItem = ({ item }: DeviceSectionItemProps) => {
  const renderSubcategoryItem = (
    item: DeviceSectionBase & DocumentServices
  ) => <SubcategoryItem key={item.id} item={item} />

  return (
    <Card className="shadow-black/20 hover:shadow-xl duration-200">
      <CardContent className="flex flex-col md:flex-row items-start gap-4">
        <div className="flex-auto basis-full w-full">
          <Button
            asChild
            variant="link"
            className="grid grid-flow-col justify-between w-full h-auto p-0 gap-2 items-start text-lg font-black cursor-pointer text-left row-start-1 whitespace-normal hover:no-underline hover:text-[#93A79E]"
          >
            <Link href={routes.NOMENCLATURE(item.slug).path}>
              <span className="min-h-7">
                {item.code}. {item.name}
              </span>
              <div className="flex items-center justify-center h-7">
                <ChevronRight />
              </div>
            </Link>
          </Button>
          <Script
            id={`subcategories-${item.slug}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                collectionPage(item?.name, item.childrens)
              ),
            }}
          />
          <List
            as="ul"
            items={item.childrens}
            renderItem={renderSubcategoryItem}
            className={`mt-2 lg:mt-4 grid grid-cols-[repeat(auto-fill,_minmax(150px,1fr))] gap-1 lg:gap-2 `}
          />
        </div>
      </CardContent>
    </Card>
  )
}

interface SubnumenclatureItemProps {
  item: DeviceSectionBase & DocumentServices
}

const SubcategoryItem = ({ item }: SubnumenclatureItemProps) => {
  return (
    <li>
      <Button
        asChild
        variant="link"
        className="cursor-pointer text-left text-sm font-extralight h-auto p-0 whitespace-normal hover:no-underline hover:text-[#93A79E]"
      >
        <Link href={routes.NOMENCLATURE(item.slug).path}>
          <span>{item.name}</span>
        </Link>
      </Button>
    </li>
  )
}

export { DeviceSectionItem }
