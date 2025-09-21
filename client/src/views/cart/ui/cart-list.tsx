"use client"

import { ProductBase } from "@/entities/product/model"
import { CartData } from "@/features/cart/model/cart"
import { useCartStore } from "@/features/cart/provider"
import { useGlobalStore } from "@/features/global/provider"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { List } from "@/shared/ui"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { CartItem } from "@/views/cart/ui/cart-item"
import { ComponentProps } from "react"

interface CartListProps {
  products?: CartData<(ProductBase & DocumentServices) | undefined>[]
}

const CartList = ({
  className,
  products,
  ...props
}: ComponentProps<"ul"> & CartListProps) => {
  const defaultMedia = useGlobalStore(
    (store) => store.data?.defaultProductImage
  )
  const { incrementItemInCart, decrementItemInCart, deleteItemFromCart } =
    useCartStore((state) => state)

  const renders = {
    cartProduct: (
      cart: CartData<(ProductBase & DocumentServices) | undefined>
    ) => (
      <CartItem
        key={cart.item?.slug}
        product={{
          ...cart,
          ...(cart.item && {
            item: { ...cart.item, media: cart.item?.media || defaultMedia },
          }),
        }}
        incrementItemInCart={() => incrementItemInCart(cart.item?.slug)}
        decrementItemInCart={() => decrementItemInCart(cart.item?.slug)}
        deleteItemFromCart={() => deleteItemFromCart(cart.item?.slug)}
      />
    ),
  }

  return (
    <ScrollArea className="h-full pr-2 sm:pr-4">
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
