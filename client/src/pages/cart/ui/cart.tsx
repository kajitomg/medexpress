"use client"

import { useCartStore } from "@/features/cart/store"
import { CartContactForm } from "@/pages/cart/ui/cart-contact-form"
import { CartList } from "@/pages/cart/ui/cart-list"
import { ContactFormModeProvider } from "@/widgets/contact-form/provider"
import { Separator } from "@radix-ui/react-separator"
import * as React from "react"

const Cart = () => {
  const products = useCartStore((state) => state.products)
  return (
    <div className="flex bg-(--color-brand)/20 rounded-[50px] max-w-350 h-200 mx-2 justify-center overflow-hidden gap-4 w-full">
      <div id="cart" className="flex flex-auto flex-col p-10 pr-0">
        <div className="h-15 flex gap-4">
          <h3 className="font-bold text-3xl">Корзина</h3>
        </div>
        <div className="h-full overflow-y-auto">
          <CartList products={products} />
        </div>
      </div>
      <Separator
        orientation="horizontal"
        className="w-[1px] bg-(--color-brand)/40"
      />
      <div className="p-4 flex-none basis-100">
        <ContactFormModeProvider>
          <CartContactForm cartItems={products} />
        </ContactFormModeProvider>
      </div>
    </div>
  )
}

export { Cart }
