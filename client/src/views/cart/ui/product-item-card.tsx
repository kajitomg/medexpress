"use client"

import { ProductBase } from "@/entities/product/model"
import { CartData } from "@/features/cart/model/cart"
import { routes } from "@/shared/config/routes"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { Button, Typography } from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import { Minus, Plus, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

interface ProductItemCardProps {
  product?: CartData<ProductBase>
  deleteItemFromCart: () => void
  incrementItemInCart: () => void
  decrementItemInCart: () => void
}

const ProductItemCard = ({
  product,
  incrementItemInCart,
  decrementItemInCart,
  deleteItemFromCart,
}: ProductItemCardProps) => {
  return (
    <Link href={routes.PRODUCT(product?.item?.slug).path}>
      <li className="cursor-pointer flex items-start sm:items-center rounded-xl bg-(--color-brand)/10 xl:bg-transparent xl:hover:bg-(--color-brand)/10 p-2 xl:p-4 gap-1 xl:gap-4">
        <div className="min-w-16 rounded-sm overflow-hidden">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image
              src={imageUrlBuilder(product?.item?.images?.[0]?.url)}
              alt={product?.item?.name || "Продукт"}
              width={100}
              height={100}
              className="object-cover w-full h-full"
              priority
            />
          </AspectRatio>
        </div>
        <div className="flex-auto">
          <div>
            <Typography variant="small" target="card">
              {product?.item?.type?.code + "\n"}
              <span>{"\n"}</span>
              {product?.item?.type?.name}
            </Typography>
            <span>{"\n"}</span>
          </div>
          <Typography asChild variant="h4" target="card">
            <h4>{product?.item?.name}</h4>
          </Typography>
        </div>
        <div className="max-w-50 flex flex-col gap-3">
          <Typography variant="small" target="card" className="inline">
            Количество: {product?.count} шт.
          </Typography>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              className="cursor-pointer self-center w-7 h-7"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                incrementItemInCart()
              }}
            >
              <Plus />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="cursor-pointer self-center w-7 h-7"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                decrementItemInCart()
              }}
            >
              <Minus />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="cursor-pointer self-center w-7 h-7"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                deleteItemFromCart()
              }}
            >
              <X />
            </Button>
          </div>
        </div>
      </li>
    </Link>
  )
}

export { ProductItemCard }
