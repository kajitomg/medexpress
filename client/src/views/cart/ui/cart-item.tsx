"use client"

import { ProductBase } from "@/entities/product/model"
import { CartItem as CartItemType } from "@/features/cart/model"
import { routes } from "@/shared/config/routes"
import { urlBuilder } from "@/shared/lib/url-builder"
import { Button, Typography } from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import { Minus, Plus, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

interface CartItemProps {
  product: CartItemType<ProductBase>
  deleteItemFromCart: () => void
  incrementItemInCart: () => void
  decrementItemInCart: () => void
}

const CartItem = ({
  product,
  incrementItemInCart,
  decrementItemInCart,
  deleteItemFromCart,
}: CartItemProps) => {
  return (
    <Link href={routes.PRODUCT(product?.item.slug).path}>
      <li className="cursor-pointer flex items-start rounded-xl bg-(--color-brand)/10 xl:bg-transparent xl:hover:bg-(--color-brand)/10 p-2 xl:p-4 gap-1 xl:gap-4">
        <div className="max-w-16">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image
              src={
                product?.item.media?.url
                  ? urlBuilder(product?.item.media.url)
                  : urlBuilder(
                      "/uploads/placeholder_y_Pg_Ly_Fqc_0d8b721762.webp"
                    )
              }
              alt={product?.item.title || "Продукт"}
              fill
              sizes="100%"
              className="object-cover"
              priority
            />
          </AspectRatio>
        </div>
        <div className="flex-auto">
          <div>
            <Typography variant="small" target="card" className="inline">
              {product?.item.code + "\n"}
            </Typography>
            <span>{"\n"}</span>
            <Typography variant="small" target="card" className="inline">
              {product?.item.categories?.[0]?.title}
            </Typography>
            <span>{"\n>\n"}</span>
            <Typography variant="small" target="card" className="inline">
              {product?.item.categories?.[1]?.title}
            </Typography>
            <span>{"\n"}</span>
          </div>
          <Typography asChild variant="h4" target="card">
            <h4>{product?.item.title}</h4>
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

export { CartItem }
