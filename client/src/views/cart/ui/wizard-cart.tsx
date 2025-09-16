"use client"

import { useCartStore } from "@/features/cart/provider"
import { cn } from "@/shared/lib"
import { usePageLayoutStore } from "@/shared/provider/page-layout-provider"
import {
  Card,
  CardContent,
  CardHeader,
  EmptyState,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from "@/shared/ui"
import { CartContactForm } from "@/views/cart/ui/cart-contact-form"
import { CartList } from "@/views/cart/ui/cart-list"
import * as React from "react"
import { ComponentProps, useState } from "react"

const WizardCart = ({ className, ...props }: ComponentProps<"div">) => {
  const offset = usePageLayoutStore((state) => state.offset)
  const offsetTop = offset.top !== undefined ? offset.top + 32 : 228
  const [tab, setTab] = useState<"cart" | "form">("cart")

  const products = useCartStore((state) => state.products)
  const _hasHydrated = useCartStore((state) => state._hasHydrated)

  return (
    <Card
      className={cn(
        "max-w-7xl w-full overflow-hidden gap-4 flex flex-col transition-all duration-200",
        className
      )}
      style={{
        minHeight: `calc(100vh - ${offsetTop}px)`,
      }}
      {...props}
    >
      <CardHeader>
        <Typography asChild variant="h3">
          <h1>Корзина</h1>
        </Typography>
      </CardHeader>
      <CardContent className="flex flex-auto min-h-0">
        <Tabs
          defaultValue={"cart"}
          value={tab}
          className="flex-col flex w-full"
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
          <TabsContent value={"cart"} className="flex-1 min-h-0 max-h-160">
            <div className="h-full">
              {!_hasHydrated || products.length ? (
                <CartList products={products} />
              ) : (
                <EmptyState title="Корзина пуста" />
              )}
            </div>
          </TabsContent>
          <TabsContent value={"form"} className="flex-1 min-h-0">
            <CartContactForm cartItems={products} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export { WizardCart }
