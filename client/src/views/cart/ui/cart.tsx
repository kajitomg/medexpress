"use client"

import { ProductBase } from "@/entities/product/model"
import { fetchProductListBySlug } from "@/entities/product/services/fetch-product-list-by-slug"
import { CartData } from "@/features/cart/model/cart"
import { useCartStore } from "@/features/cart/provider"
import { useProductsListStore } from "@/features/catalog/provider"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
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
import { ComponentProps, useEffect, useMemo } from "react"

export const revalidate = 0

const Cart = ({ className, ...props }: ComponentProps<"div">) => {
  const offset = usePageLayoutStore((state) => state.offset)
  const offsetTop = offset.top !== undefined ? offset.top + 32 : 228
  const cartItems = useCartStore((state) => state.products)
  const products = useProductsListStore((state) => state.products)
  const loadProducts = useProductsListStore((state) => state.loadProducts)
  const _hasHydrated = useCartStore((state) => state._hasHydrated)

  const cartProducts: CartData<(ProductBase & DocumentServices) | undefined>[] =
    useMemo(() => {
      if (!products?.length) return []
      return cartItems.map((cartItem) => {
        const item = products?.find((product) => product.slug === cartItem.slug)
        return {
          item,
          count: cartItem.count,
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
          {!_hasHydrated || cartProducts?.length ? (
            <CartList products={cartProducts} />
          ) : (
            <EmptyState title="Корзина пуста" />
          )}
        </div>
        <Separator
          orientation="horizontal"
          className="w-[1px] bg-(--color-brand)/40"
        />
        <div className="flex-none basis-100">
          <CartContactForm products={cartProducts} />
        </div>
      </CardContent>
    </Card>
  )
}

export { Cart }
