"use client"

import { useCartStore } from "@/features/cart/provider"
import { cn } from "@/shared/lib"
import { usePageLayoutStore } from "@/shared/provider/page-layout-provider"
import {
  Card,
  CardContent,
  CardHeader,
  EmptyState,
  Typography,
} from "@/shared/ui"
import { CartContactForm } from "@/views/cart/ui/cart-contact-form"
import { CartList } from "@/views/cart/ui/cart-list"
import { Separator } from "@radix-ui/react-separator"
import * as React from "react"
import { ComponentProps } from "react"

const Cart = ({ className, ...props }: ComponentProps<"div">) => {
  const offset = usePageLayoutStore((state) => state.offset)
  const offsetTop = offset.top !== undefined ? offset.top + 32 : 228
  const products = useCartStore((state) => state.products)
  const _hasHydrated = useCartStore((state) => state._hasHydrated)

  return (
    <Card
      className={cn(
        "max-w-7x w-full overflow-hidden gap-4 flex flex-col transition-all duration-200",
        className
      )}
      style={{
        height: `calc(100vh - ${offsetTop}px)`,
      }}
      {...props}
    >
      <CardHeader>
        <Typography asChild variant="h3">
          <h1>Корзина</h1>
        </Typography>
      </CardHeader>
      <CardContent className="flex justify-evenly flex-grow min-h-0">
        <div className="h-full flex-auto">
          {!_hasHydrated || products.length ? (
            <CartList products={products} />
          ) : (
            <EmptyState title="Корзина пуста" />
          )}
        </div>
        <Separator
          orientation="horizontal"
          className="w-[1px] bg-(--color-brand)/40"
        />
        <div className="flex-none basis-100">
          <CartContactForm cartItems={products} />
        </div>
      </CardContent>
    </Card>
  )
}

export { Cart }
