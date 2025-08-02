import { CollectionBase } from "@/entities/collection/model"
import { routes } from "@/shared/config/routes"
import { urlBuilder } from "@/shared/lib/url-builder"
import { DocumentServices } from "@/shared/model"
import { Card, CardContent, CardHeader, Subtitle, Title } from "@/shared/ui"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

interface CatalogItemProps {
  collection: CollectionBase & DocumentServices
}

const CollectionItem = ({ collection }: CatalogItemProps) => {
  return (
    <Card className="relative p-0 overflow-hidden before:bg-black/30 before:absolute before:size-full">
      <Link href={routes.COLLESCTIONS(collection.id).path}>
        <CardContent className="p-0">
          <Image
            src={
              collection.media?.url
                ? urlBuilder(collection.media?.url)
                : urlBuilder("/uploads/placeholder_y_Pg_Ly_Fqc_0d8b721762.webp")
            }
            alt={collection.title}
            width="300"
            height="300"
            className="w-full h-full object-cover"
          />
        </CardContent>
        <div className="absolute top-0 left-0 size-full">
          <CardHeader className="h-full flex flex-col items-center justify-center">
            <Title className="text-4xl font-black text-white">
              {collection.title}
            </Title>
            <Subtitle className="text-base font-black text-white">
              {collection.products?.length} товара
            </Subtitle>
          </CardHeader>
        </div>
      </Link>
    </Card>
  )
}

export { CollectionItem }
