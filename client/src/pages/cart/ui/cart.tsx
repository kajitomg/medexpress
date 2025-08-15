"use client"

import { useCartStore } from "@/features/cart/provider"
import { CartContactForm } from "@/pages/cart/ui/cart-contact-form"
import { CartList } from "@/pages/cart/ui/cart-list"
import { cn } from "@/shared/lib"
import { EmptyState } from "@/shared/ui"
import { Separator } from "@radix-ui/react-separator"
import * as React from "react"
import { ComponentProps } from "react"

const Cart = ({ className, ...props }: ComponentProps<"div">) => {
  const products = useCartStore((state) => state.products)
  const _hasHydrated = useCartStore((state) => state._hasHydrated)
  return (
    <div
      className={cn(
        "flex bg-(--color-brand)/20 rounded-2xl max-w-350 h-200 w-full mx-2 justify-center overflow-hidden gap-4 w-full",
        className
      )}
      {...props}
    >
      <div id="cart" className="flex flex-auto flex-col pr-0 p-7 xl:p-10 ">
        <div className="h-15 flex gap-4 ml-4">
          <h3 className="font-bold text-3xl">Корзина</h3>
        </div>
        <div className="h-full pt-10">
          {!_hasHydrated || products.length ? (
            <CartList products={products} />
          ) : (
            <EmptyState title="Корзина пуста" />
          )}
        </div>
      </div>
      <Separator
        orientation="horizontal"
        className="w-[1px] bg-(--color-brand)/40"
      />
      <div className="flex-none basis-100 p-1 xl:p-4">
        <CartContactForm cartItems={products} />
      </div>
    </div>
  )
}

export { Cart }
