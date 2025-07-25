import { ProductBase } from "@/entities/product/model"
import { CartItem } from "@/features/cart/model"
import { Button } from "@/shared/ui"
import { Minus, Plus, X } from "lucide-react"
import Image from "next/image"
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
    <li className="cursor-pointer flex gap-4 items-start p-4 rounded-xl hover:bg-(--color-brand)/10">
      <div className="max-w-16">
        <Image
          src="/oborud.png"
          alt="alt"
          width="800"
          height="800"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-auto">
        <div className="text-xs font-light">
          <span className="hover:underline cursor-pointer">
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
      <div className="max-w-50">
        <div className="text-xs font-light">
          Количество: {product.count} шт.
        </div>
      </div>
      <Button
        size="sm"
        variant="outline"
        className="cursor-pointer self-center w-7 h-7"
        onClick={incrementItemInCart}
      >
        <Plus />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="cursor-pointer self-center w-7 h-7"
        onClick={decrementItemInCart}
      >
        <Minus />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="cursor-pointer self-center w-7 h-7"
        onClick={deleteItemFromCart}
      >
        <X />
      </Button>
    </li>
  )
}

export { CartItem }
