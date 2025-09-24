"use client"

import { CategoryBase } from "@/entities/category/model"
import { ProductBase } from "@/entities/product/model"
import { AddToCartButton } from "@/features/cart/ui/add-to-cart-button"
import { useGlobalStore } from "@/features/global/provider"
import { useProductDetailsStore } from "@/features/product-details/provider/product-details-provider"
import { routes } from "@/shared/config/routes"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { DocumentServices } from "@/shared/model"
import { Button, Card, CardContent, List, Typography } from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import { ProductsCategoryList } from "@/views/product/ui/products-category-list"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { useEffect, useState } from "react"
import { Product as ProductSchema, WithContext } from "schema-dts"

const productSchema = (
  product?: ProductBase & DocumentServices,
  baseUrl?: string
): WithContext<ProductSchema> => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product?.title,
  image: product?.media?.url,
  description: product?.description || "Описание не доступно",
  sku: product?.code,
  offers: {
    "@type": "Offer",
    priceCurrency: "RUB",
    price: "",
    availability: "https://schema.org/InStock",
    url: baseUrl,
  },
})

const Page = () => {
  const [baseUrl, setBaseUrl] = useState<string | undefined>()
  const defaultMedia = useGlobalStore(
    (state) => state.data?.defaultProductImage
  )
  const product = useProductDetailsStore((state) => state.product)

  useEffect(() => {
    setBaseUrl(window.location.href)
  }, [])

  const renderCategoryItem = (category: CategoryBase) => (
    <Button
      asChild
      key={category.id}
      variant="secondary"
      size="sm"
      className="max-w-full justify-start truncate text-xs cursor-pointer"
    >
      <Link
        href={routes.CATALOG(category.slug).path}
        onClick={(e) => e.stopPropagation()}
      >
        {category.title}
      </Link>
    </Button>
  )
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <script
        id="product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema(product, baseUrl)),
        }}
      />
      <div className="flex flex-wrap items-start gap-8">
        <div
          className="
            shrink-0
            lg:w-[clamp(350px,45%,720px)]
            w-[100%]
            max-w-[min(100%,720px)]
            transition-[width] duration-300 ease-out
          "
        >
          <Card className="overflow-hidden bg-transparent border-none rounded-2xl p-0">
            <CardContent className="p-0">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  src={imageUrlBuilder(
                    product?.media?.url || defaultMedia?.url
                  )}
                  alt={product?.title || "Продукт"}
                  fill
                  sizes="(min-width: 1280px) 35vw, 80vw"
                  className="object-cover"
                  priority
                />
              </AspectRatio>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 min-w-[min(340px,100%)]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Typography asChild variant="h3">
                <h1>{product?.title}</h1>
              </Typography>
            </div>

            <List
              items={product?.categories}
              renderItem={renderCategoryItem}
              className="block space-x-1 space-y-1"
            />
            <Typography>{product?.description}</Typography>

            <Typography variant="small">
              Артикул: <span className="font-mono">{product?.code}</span>
            </Typography>

            <div className="flex flex-wrap gap-3 pt-2">
              <AddToCartButton product={product} size="lg" />
            </div>
          </div>
        </div>
      </div>

      <section className="mt-10">
        <div className="mb-3 flex items-baseline justify-between gap-2">
          <Typography asChild variant="h4">
            <h4>Похожие товары</h4>
          </Typography>
        </div>

        <div>
          <div className="w-full">
            <ProductsCategoryList
              categorySlug={product?.categories?.[0].slug}
              productSlug={product?.slug}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export { Page }
