import { ProductBase } from "@/entities/product/model"
import { CartItem } from "@/features/cart/model"
import { routes } from "@/shared/config/routes"
import { urlBuilder } from "@/shared/lib/url-builder"
import { Button } from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import { Minus, Plus, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

interface CartItemProps {
  product: CartItem<ProductBase>
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
    <Link href={routes.PRODUCT(product.item.slug).path}>
      <li className="cursor-pointer flex items-start rounded-xl bg-(--color-brand)/10 xl:bg-transparent xl:hover:bg-(--color-brand)/10 p-2 xl:p-4 gap-1 xl:gap-4">
        <div className="max-w-16">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image
              src={
                product.item.media?.url
                  ? urlBuilder(product.item.media.url)
                  : urlBuilder(
                      "/uploads/placeholder_y_Pg_Ly_Fqc_0d8b721762.webp"
                    )
              }
              alt={product.item.title || "Продукт"}
              fill
              sizes="100%"
              className="object-cover"
              priority
            />
          </AspectRatio>
        </div>
        <div className="flex-auto">
          <div className="text-xs font-light">
            <span className="hover:underline cursor-pointer ">
              {product.item.code + "\n"}
            </span>
            <span>{"\n"}</span>
            <span className="hover:underline cursor-pointer">
              {product.item.categories?.[0]?.title}
            </span>
            <span>{"\n>\n"}</span>
            <span className="hover:underline cursor-pointer">
              {product.item.categories?.[1]?.title}
            </span>
            <span>{"\n"}</span>
          </div>
          <span className="text-sm font-bold">{product.item.title}</span>
        </div>
        <div className="max-w-50 flex flex-col gap-3">
          <div className="text-xs font-light">
            Количество: {product.count} шт.
          </div>
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
