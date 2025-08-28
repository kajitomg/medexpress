import { CategoryBase } from "@/entities/category/model"
import { ProductBase } from "@/entities/product/model"
import { AddToCartButton } from "@/features/cart/ui/add-to-cart-button"
import { routes } from "@/shared/config/routes"
import { urlBuilder } from "@/shared/lib/url-builder"
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
    <Card className="pt-0 overflow-hidden shadow-black/20 hover:shadow-xl duration-200">
      <CardHeader className="px-0">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={
              product.media?.url
                ? urlBuilder(product.media?.url)
                : urlBuilder("/uploads/placeholder_y_Pg_Ly_Fqc_0d8b721762.webp")
            }
            alt={product.title}
            width="300"
            height="300"
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="flex-auto flex flex-col gap-4">
        <Typography asChild variant="h4" target="card">
          <h4>{product.title}</h4>
        </Typography>
        <List
          items={product.categories}
          renderItem={renderCategoryItem}
          className="block space-x-1 space-y-1"
        />
        <Typography className="line-clamp-4" target="card">
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
      asChild
      variant="secondary"
      size="sm"
      className="max-w-full justify-start truncate text-xs cursor-pointer"
    >
      <Link
        href={routes.CATALOG(category.slug).path}
        onClick={(e) => e.stopPropagation()}
      >
        {category.code}
      </Link>
    </Button>
  )
}

export { CatalogProductItem }
