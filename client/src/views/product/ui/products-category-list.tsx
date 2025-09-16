import { ProductBase } from "@/entities/product/model"
import { fetchSimilarCategoriesProductsList } from "@/entities/product/services"
import { useSettingsStore } from "@/features/settings/provider"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { DocumentServices } from "@/shared/model"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  List,
  Typography,
} from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area"
import { Skeleton } from "@/shared/ui/skeleton"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { ComponentProps, useEffect, useState } from "react"

interface ProductsCategoryListProps {
  categorySlug?: string
  productSlug?: string
}

const ProductsCategoryList = ({
  categorySlug,
  productSlug,
  className,
  ...props
}: ComponentProps<"div"> & ProductsCategoryListProps) => {
  const defaultMedia = useSettingsStore(
    (state) => state.data?.productDefaultMedia
  )
  const [products, setProducts] = useState<
    (ProductBase & DocumentServices)[] | undefined
  >(undefined)

  useEffect(() => {
    if (categorySlug && productSlug) {
      ;(async () => {
        const response = await fetchSimilarCategoriesProductsList(
          categorySlug,
          productSlug
        )
        const products = response.data
        setProducts(products)
      })()
    }
  }, [categorySlug, productSlug])

  const renderItem = (item: ProductBase & DocumentServices, index: number) => (
    <CatalogProductItem
      key={item?.id || index}
      product={item ? { ...item, media: item.media || defaultMedia } : item}
    />
  )
  return (
    <ScrollArea className="w-full">
      <div className="flex items-center gap-2">
        <List
          items={products || new Array(6).fill(undefined)}
          renderItem={renderItem}
          className={cn(
            `grid grid-flow-col auto-cols-[250px] gap-2 p-4 pb-6`,
            className
          )}
          {...props}
        />
        <Button
          asChild
          variant="link"
          className="rounded-full p-2 h-auto w-auto cursor-pointer hover:text-(--color-brand)"
          size="icon"
        >
          <Link href={routes.CATALOG(categorySlug).path}>
            <ChevronRight className="size-8" />
          </Link>
        </Button>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

interface CatalogProductItemProps {
  product: ProductBase & DocumentServices
}

const CatalogProductItem = ({ product }: CatalogProductItemProps) => {
  return (
    <Card
      className="pt-0 pb-4 overflow-hidden shadow-black/20 hover:shadow-lg duration-200 gap-2
              shrink-0
              overflow-hidden rounded-xl"
    >
      <Link href={routes.PRODUCT(product?.slug).path}>
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            {product ? (
              <Image
                src={imageUrlBuilder(product?.media?.url)}
                alt={product.title}
                fill
                sizes="100%"
                className="object-cover"
              />
            ) : (
              <Skeleton className="w-full" />
            )}
          </AspectRatio>
        </CardHeader>
        <CardContent className="flex-auto flex flex-col gap-2 px-4">
          <CardTitle>
            {product?.title ? (
              <Typography
                asChild
                variant="h4"
                target="card"
                className="line-clamp-1"
              >
                <h4>{product.title}</h4>
              </Typography>
            ) : (
              <Skeleton className="h-4 w-full" />
            )}
          </CardTitle>
          <div>
            {product?.description ? (
              <Typography target="card" className="line-clamp-4">
                {product.description}
              </Typography>
            ) : (
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

export { ProductsCategoryList }
