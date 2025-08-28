"use client"

import { ProductBase } from "@/entities/product/model"
import { CartItem as CartItemType } from "@/features/cart/model"
import { useCartStore } from "@/features/cart/provider"
import { cn } from "@/shared/lib"
import { List } from "@/shared/ui"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { CartItem } from "@/views/cart/ui/cart-item"
import { ComponentProps } from "react"

interface CartListProps {
  products: CartItemType<ProductBase>[]
}

const CartList = ({
  className,
  products,
  ...props
}: ComponentProps<"ul"> & CartListProps) => {
  const { incrementItemInCart, decrementItemInCart, deleteItemFromCart } =
    useCartStore((state) => state)

  const renders = {
    cartProduct: (item: (typeof products)[0]) => (
      <CartItem
        key={item.item.id}
        product={item}
        incrementItemInCart={() => incrementItemInCart(item.item.id)}
        decrementItemInCart={() => decrementItemInCart(item.item.id)}
        deleteItemFromCart={() => deleteItemFromCart(item.item.id)}
      />
    ),
  }

  return (
    <ScrollArea className="h-full pr-4">
      <List
        as="ul"
        items={products}
        renderItem={renders.cartProduct}
        className={cn("gap-2 flex flex-col", className)}
        {...props}
      />
    </ScrollArea>
  )
}

export { CartList }
