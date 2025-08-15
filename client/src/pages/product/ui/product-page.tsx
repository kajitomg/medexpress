"use client"

import { CategoryBase } from "@/entities/category/model"
import { AddToCartButton } from "@/features/cart/ui/add-to-cart-button"
import { useProductDetailsStore } from "@/features/product-details/provider/product-details-provider"
import { ProductsCategoryList } from "@/pages/product/ui/products-category-list"
import { routes } from "@/shared/config/routes"
import { urlBuilder } from "@/shared/lib/url-builder"
import { Button, Card, CardContent, List } from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

const ProductPage = () => {
  const product = useProductDetailsStore((state) => state.product)

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
                  src={
                    product?.media?.url
                      ? urlBuilder(product.media?.url)
                      : urlBuilder(
                          "/uploads/placeholder_y_Pg_Ly_Fqc_0d8b721762.webp"
                        )
                  }
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
              <h1 className="text-3xl font-bold tracking-tight">
                {product?.title}
              </h1>
            </div>

            <List
              items={product?.categories}
              renderItem={renderCategoryItem}
              className="block space-x-1 space-y-1"
            />

            <p className="text-muted-foreground leading-7">
              {product?.description}
            </p>

            <div className="text-sm text-slate-500">
              Артикул: <span className="font-mono">{product?.code}</span>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <AddToCartButton product={product} size="lg" />
            </div>
          </div>
        </div>
      </div>

      <section className="mt-10">
        <div className="mb-3 flex items-baseline justify-between gap-2">
          <h2 className="text-xl font-semibold">Похожие товары</h2>
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

export { ProductPage }
