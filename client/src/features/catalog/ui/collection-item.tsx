import { CollectionBase } from "@/entities/collection/model"
import { routes } from "@/shared/config/routes"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { DocumentServices } from "@/shared/model"
import { Card, CardContent, CardHeader, Typography } from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

interface CatalogCollectionItemProps {
  collection: CollectionBase & DocumentServices
}

const CatalogCollectionItem = ({ collection }: CatalogCollectionItemProps) => {
  return (
    <Card
      itemScope
      itemType="https://schema.org/CollectionPage"
      className="relative p-0 overflow-hidden border-none shadow-black/25 hover:shadow-xl duration-200"
    >
      <Link itemProp="url" href={routes.COLLESCTIONS(collection.slug).path}>
        <CardContent className="p-0">
          <AspectRatio
            ratio={16 / 9}
            className="before:bg-black/20 before:absolute before:size-full"
          >
            <Image
              itemProp="image"
              src={imageUrlBuilder(collection.media?.url)}
              alt={collection.title}
              width="300"
              height="300"
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </CardContent>
        <div className="absolute top-0 left-0 size-full">
          <CardHeader className="h-full flex flex-col items-center justify-center dark">
            <Typography itemProp="name" asChild variant="h2">
              <h2>{collection.title}</h2>
            </Typography>
            <Typography className="text-foreground">
              {collection.products?.length} товара
            </Typography>
          </CardHeader>
        </div>
      </Link>
    </Card>
  )
}

export { CatalogCollectionItem }
