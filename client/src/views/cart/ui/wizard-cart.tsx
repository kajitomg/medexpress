"use client"

import { ProductBase } from "@/entities/product/model"
import { fetchProductListBySlug } from "@/entities/product/services/fetch-product-list-by-slug"
import { CartData } from "@/features/cart/model/cart"
import { useCartStore } from "@/features/cart/provider"
import { useProductListStore } from "@/features/product/provider"
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
import { ProductList } from "@/views/cart/ui/product-list"
import * as React from "react"
import { ComponentProps, useEffect, useMemo, useState } from "react"

const WizardCart = ({ className, ...props }: ComponentProps<"div">) => {
  const offset = usePageLayoutStore((state) => state.offset)
  const offsetTop = offset.top !== undefined ? offset.top + 32 : 228
  const [tab, setTab] = useState<"cart" | "form">("cart")
  const cartItems = useCartStore((state) => state.list)
  const products = useProductListStore((state) => state.list)
  const loadProducts = useProductListStore((state) => state.loadList)
  const _hasHydrated = useCartStore((state) => state._hasHydrated)

  const cartProducts: CartData<ProductBase>[] = useMemo(() => {
    if (!products?.length) return []
    return products.map((item) => {
      const cartItem = cartItems?.find((product) => product.slug === item.slug)
      return {
        item,
        count: cartItem?.count || 0,
      }
    })
  }, [cartItems, products])

  useEffect(() => {
    if (!cartItems.length) return
    const slugs = cartItems.map((item) => item.slug)
    loadProducts(fetchProductListBySlug, slugs, 1)
  }, [cartItems, loadProducts])

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
      <CardHeader className="px-2 sm:px-4 md:px-6">
        <Typography asChild variant="h3">
          <h1>Корзина</h1>
        </Typography>
      </CardHeader>
      <CardContent className="flex flex-auto min-h-0 px-2 sm:px-4 md:px-6">
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
              disabled={!_hasHydrated || !cartProducts.length}
              className="cursor-pointer min-w-0"
              onClick={() => setTab("form")}
            >
              Оформление заказа
            </TabsTrigger>
          </TabsList>
          <TabsContent value={"cart"} className="flex-1 min-h-0 max-h-160">
            <div className="h-full">
              {!_hasHydrated || cartProducts.length ? (
                <ProductList products={cartProducts} />
              ) : (
                <EmptyState title="Корзина пуста" />
              )}
            </div>
          </TabsContent>
          <TabsContent value={"form"} className="flex-1 min-h-0">
            <CartContactForm products={cartProducts} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export { WizardCart }
