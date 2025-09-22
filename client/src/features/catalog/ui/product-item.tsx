import { CategoryBase } from "@/entities/category/model"
import { ProductBase } from "@/entities/product/model"
import { AddToCartButton } from "@/features/cart/ui/add-to-cart-button"
import { routes } from "@/shared/config/routes"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { DocumentServices } from "@/shared/model"
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  List,
  Typography,
} from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

interface CatalogProductItemProps {
  product: ProductBase & DocumentServices
}

const CatalogProductItem = ({ product }: CatalogProductItemProps) => {
  const renderCategoryItem = (item: CategoryBase) => {
    return <ProductCategoryItem category={item} key={item.id} />
  }

  return (
    <Card
      itemScope
      itemType="https://schema.org/Product"
      className="pt-0 overflow-hidden shadow-black/20 hover:shadow-xl duration-200"
    >
      <CardHeader className="px-0">
        <AspectRatio ratio={16 / 9}>
          <Image
            itemProp="image"
            src={imageUrlBuilder(product.media?.url)}
            alt={product.title}
            width="300"
            height="300"
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="flex-auto flex flex-col gap-4">
        <Typography itemProp="name" asChild variant="h4" target="card">
          <h4>{product.title}</h4>
        </Typography>
        <List
          items={product.categories}
          renderItem={renderCategoryItem}
          className="block space-x-1 space-y-1"
        />
        <Typography
          itemProp="description"
          className="line-clamp-4"
          target="card"
        >
          {product.description}
        </Typography>
      </CardContent>
      <CardFooter className="justify-between items-center">
        <Typography variant="small" target="card">
          {product.code}
        </Typography>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="cursor-pointer">
            <Link href={routes.PRODUCT(product?.slug).path}>Подробнее</Link>
          </Button>
          <AddToCartButton product={product} />
        </div>
      </CardFooter>
    </Card>
  )
}

interface ProductCategoryItemProps {
  category: CategoryBase & DocumentServices
}

const ProductCategoryItem = ({ category }: ProductCategoryItemProps) => {
  return (
    <Button
      itemScope
      itemType="https://schema.org/CollectionPage"
      asChild
      variant="secondary"
      size="sm"
      className="max-w-full justify-start truncate text-xs cursor-pointer"
    >
      <Link
        itemProp="url"
        href={routes.CATALOG(category.slug).path}
        onClick={(e) => e.stopPropagation()}
      >
        <span itemProp="name">{category.code}</span>
      </Link>
    </Button>
  )
}

export { CatalogProductItem }
