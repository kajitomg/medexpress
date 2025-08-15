"use client"

import { useCartStore } from "@/features/cart/provider"
import { CartContactForm } from "@/pages/cart/ui/cart-contact-form"
import { CartList } from "@/pages/cart/ui/cart-list"
import { cn } from "@/shared/lib"
import {
  EmptyState,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui"
import { ContactFormModeProvider } from "@/widgets/contact-form/provider"
import * as React from "react"
import { ComponentProps, useState } from "react"

const WizardCart = ({ className, ...props }: ComponentProps<"div">) => {
  const [tab, setTab] = useState<"cart" | "form">("cart")

  const products = useCartStore((state) => state.products)
  const _hasHydrated = useCartStore((state) => state._hasHydrated)

  return (
    <div
      className={cn(
        "flex flex-col bg-(--color-brand)/20 rounded-2xl w-full justify-center overflow-hidden gap-2 w-full",
        className
      )}
      {...props}
    >
      <div className="flex pt-6 px-6">
        <div className="flex gap-4 ">
          <h3 className="font-bold text-3xl">Корзина</h3>
        </div>
      </div>
      <Tabs
        defaultValue={"cart"}
        value={tab}
        className="h-190 flex-col p-4 pt-2 flex"
      >
        <TabsList className="w-full min-w-0 shrink-0">
          <TabsTrigger
            value={"cart"}
            className="cursor-pointer min-w-0"
            onClick={() => setTab("cart")}
          >
            Товары
          </TabsTrigger>
          <TabsTrigger
            value={"form"}
            disabled={!_hasHydrated || !products.length}
            className="cursor-pointer min-w-0"
            onClick={() => setTab("form")}
          >
            Оформление заказа
          </TabsTrigger>
        </TabsList>
        <TabsContent value={"cart"} className="flex-1 min-h-0">
          <div className="h-full pt-6">
            {!_hasHydrated || products.length ? (
              <CartList products={products} />
            ) : (
              <EmptyState title="Корзина пуста" />
            )}
          </div>
        </TabsContent>
        <TabsContent value={"form"} className="flex-1 min-h-0">
          <ContactFormModeProvider>
            <CartContactForm cartItems={products} />
          </ContactFormModeProvider>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { WizardCart }
