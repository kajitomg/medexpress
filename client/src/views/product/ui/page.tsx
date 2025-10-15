"use client"

import { ProductBase } from "@/entities/product/model"
import { AddToCartButton } from "@/features/cart/ui/add-to-cart-button"
import { Price } from "@/features/catalog/ui"
import { useProductDetailsStore } from "@/features/product-details/provider/product-details-provider"
import { DocumentServices } from "@/shared/model"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from "@/shared/ui"
import { ImagesSection } from "@/views/product/ui/images-section"
import { ProductsCategoryList } from "@/views/product/ui/products-category-list"
import { Specifications } from "@/views/product/ui/specifications"
import { ModalContactFormProduct } from "@/widgets/modal-contact-form-product/ui"
import * as React from "react"
import { useEffect, useState } from "react"
import { Product as ProductSchema, WithContext } from "schema-dts"

const productSchema = (
  product?: ProductBase & DocumentServices,
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
  const [mode, setMode] = useState<"description" | "specification">(
    "description"
  )
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
          "
        >
          <ImagesSection items={product?.images} />
        </div>

        <div className="@container flex-auto flex flex-col justify-between gap-4 min-w-[min(340px,100%)]">
          <div className="flex flex-wrap items-center gap-3">
            <Typography asChild variant="h3">
              <h1>{product?.name}</h1>
            </Typography>
            <Typography variant="small">
              Артикул: <span className="font-mono">{product?.type?.code}</span>
            </Typography>
          </div>
          <div className="flex justify-between flex-col @md:flex-row gap-3 pt-2 w-full">
            <Price price={product?.price?.[0]} />
            <div className="flex gap-2 w-full justify-end @sm:w-auto">
              <AddToCartButton
                product={product}
                size="lg"
                className="flex-auto"
              />
              <ModalContactFormProduct
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
            <TabsList className="w-full min-w-0">
              <TabsTrigger
                value={"description"}
                className="cursor-pointer min-w-0"
                onClick={() => setMode("description")}
              >
                Описание
              </TabsTrigger>
              <TabsTrigger
                value={"specification"}
                className="cursor-pointer min-w-0"
                onClick={() => setMode("specification")}
              >
                Характеристики
              </TabsTrigger>
            </TabsList>
            <TabsContent value={"description"} className=" min-w-0">
              <Typography>{product?.description}</Typography>
            </TabsContent>
            <TabsContent value={"specification"}>
              <Specifications items={product?.specifications} />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <Typography asChild variant="h4">
              <h4>Похожие товары</h4>
            </Typography>
          </div>
          <div className="w-full">
            <ProductsCategoryList
              categorySlug={product?.type?.slug}
              productSlug={product?.slug}
            />
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
