import { CategoryBase } from "@/entities/category/model"
import { ProductBase } from "@/entities/product/model"
import { AddToCartButton } from "@/features/cart/ui/add-to-cart-button"
import { routes } from "@/shared/config/routes"
import { urlBuilder } from "@/shared/lib/url-builder"
import { DocumentServices } from "@/shared/model"
import { Button } from "@/shared/ui"
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card"
import { List } from "@/shared/ui/list"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

interface CatalogItemProps {
  product: ProductBase & DocumentServices
}

const ProductItem = ({ product }: CatalogItemProps) => {
  const renderCategoryItem = (category: CategoryBase) => (
    <Button
      asChild
      key={category.id}
      variant="secondary"
      size="sm"
      className="max-w-full justify-start truncate text-xs cursor-pointer"
    >
      <Link
        href={routes.CATALOG(category.id).path}
        onClick={(e) => e.stopPropagation()}
      >
        {category.code}
      </Link>
    </Button>
  )

  return (
    <Card className="pt-0 overflow-hidden">
      <CardHeader className="px-0">
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
      </CardHeader>
      <CardContent className="flex-auto flex flex-col gap-4">
        <div className="flex justify-end"></div>
        <span className="font-bold">{product.title}</span>
        <List
          items={product.categories}
          renderItem={renderCategoryItem}
          className="block space-x-1 space-y-1"
        />
        <div className="line-clamp-4 font-light text-sm text-gray-500">
          {product.description}
        </div>
      </CardContent>
      <CardFooter className="justify-between items-end">
        <span className="text-xs text-gray-500">{product.code}</span>
        <div className="flex items-center gap-2">
          <Button size="sm" className="cursor-pointer">
            <Link href={routes.PRODUCT(product?.documentId).path}>
              Подробнее
            </Link>
          </Button>
          <AddToCartButton product={product} />
        </div>
      </CardFooter>
    </Card>
  )
}

export { ProductItem }
