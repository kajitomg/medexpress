"use client"

import { ProductBase } from "@/entities/product/model"
import { CartActionsButton } from "@/features/cart/ui/cart-actions-button"
import { useProductDetailsStore } from "@/features/product-details/provider/product-details-provider"
import { ProductListProvider } from "@/features/product/provider"
import { Price } from "@/features/product/ui"
import { usePageLayoutStore } from "@/shared/provider"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from "@/shared/ui"
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area"
import { Documents } from "@/views/product-details/ui/documents"
import { ImageCarousel } from "@/views/product-details/ui/image-carousel"
import { ProductsCategoryList } from "@/views/product-details/ui/products-category-list"
import { Specifications } from "@/views/product-details/ui/specifications"
import { ContactFormModalWithProduct } from "@/widgets/contact-form/ui"
import * as React from "react"
import { useEffect, useState } from "react"
import { Product as ProductSchema, WithContext } from "schema-dts"

const productSchema = (
  product?: ProductBase,
  baseUrl?: string
): WithContext<ProductSchema> => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product?.name,
  image: product?.images?.[0]?.url,
  description: product?.description || "Описание не доступно",
  sku: product?.type?.code,
  offers: {
    "@type": "Offer",
    priceCurrency: "RUB",
    price: "",
    availability: "https://schema.org/InStock",
    url: baseUrl,
  },
})

const Page = () => {
  const [mode, setMode] = useState<
    "description" | "specification" | "document"
  >("description")
  const top = usePageLayoutStore((state) => state.offset.top)
  const [baseUrl, setBaseUrl] = useState<string | undefined>()
  const product = useProductDetailsStore((state) => state.item)

  useEffect(() => {
    setBaseUrl(window.location.href)
  }, [])
  if (!product) {
    return <div>Продукт не найден</div>
  }
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <script
        id="product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema(product, baseUrl)),
        }}
      />
      <div className="flex flex-wrap items-start gap-8 justify-center">
        <div
          className="
            shrink-0
            lg:w-[clamp(350px,45%,720px)]
            w-full
            max-w-[min(100%,720px)]
            transition-[width] duration-300 ease-out
            static lg:sticky
          "
          style={{ top: `calc(${top}px + 32px)` }}
        >
          <ImageCarousel items={product?.images} />
        </div>

        <div
          className="@container flex-auto flex flex-col justify-between gap-4 min-w-[min(340px,100%)] static lg:sticky"
          style={{ top: `calc(${top}px + 32px)` }}
        >
          <div className="flex flex-col items-start gap-3">
            <Typography variant="muted">
              <span>
                {product?.type?.name} {product?.type?.code}
              </span>
            </Typography>
            <Typography asChild variant="h3">
              <h1>{product?.name}</h1>
            </Typography>
            <Typography variant="small">
              Артикул: <span className="font-mono">{product?.sku}</span>
            </Typography>
          </div>
          <div className="flex justify-between flex-col @md:flex-row gap-3 pt-2 w-full">
            <Price price={product?.price?.[0]} />
            <div className="flex gap-3 w-full justify-end items-start @sm:w-auto">
              <CartActionsButton
                slug={product.slug}
                size="lg"
                className="flex-auto"
              />

              <ContactFormModalWithProduct
                className="flex-auto"
                product={product}
              />
            </div>
          </div>
        </div>
      </div>

      <section className="mt-10 flex flex-col gap-6">
        <div>
          <Tabs
            defaultValue={"description"}
            value={mode}
            className="gap-2 md:gap-6"
          >
            <ScrollArea>
              <TabsList className="w-full">
                <TabsTrigger
                  value={"description"}
                  className="cursor-pointer"
                  onClick={() => setMode("description")}
                >
                  Описание
                </TabsTrigger>
                <TabsTrigger
                  value={"specification"}
                  className="cursor-pointer"
                  onClick={() => setMode("specification")}
                >
                  Характеристики
                </TabsTrigger>
                <TabsTrigger
                  value={"document"}
                  className="cursor-pointer"
                  onClick={() => setMode("document")}
                >
                  Документы
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <TabsContent value={"description"} className=" min-w-0">
              <Typography>{product?.description}</Typography>
            </TabsContent>
            <TabsContent value={"specification"}>
              <Specifications items={product?.specifications} />
            </TabsContent>
            <TabsContent value={"document"}>
              <Documents documents={product.documents} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="">
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <Typography asChild variant="h4">
              <h4>Похожие товары</h4>
            </Typography>
          </div>
          <div className="w-full border-1 border-gray-200 rounded rounded-md">
            <ProductListProvider>
              <ProductsCategoryList
                categorySlug={product?.categories?.[0]?.slug}
                productSlug={product?.slug}
              />
            </ProductListProvider>
          </div>
        </div>
      </section>
    </div>
  )
}

/*
<Card className="overflow-hidden bg-transparent border-none rounded-2xl p-0">
  <CardContent className="p-0">
    <AspectRatio ratio={16 / 9} className="bg-muted">
      <Image
        src={imageUrlBuilder(
          product?.images?.[0]?.url || defaultMedia?.url
        )}
        alt={product?.name || "Продукт"}
        fill
        sizes="(min-width: 1280px) 35vw, 80vw"
        className="object-cover"
        priority
      />
    </AspectRatio>
  </CardContent>
</Card>
*/
export { Page }
