"use client"

import { ProductBase } from "@/entities/product/model"
import { useCartStore } from "@/features/cart/provider"
import { cn } from "@/shared/lib"
import { Button, buttonVariants } from "@/shared/ui/button"
import { VariantProps } from "class-variance-authority"
import { Loader2Icon, Plus, X } from "lucide-react"
import { ComponentProps, useMemo } from "react"

interface AddToCartButtonProps {
  product?: ProductBase
}

const AddToCartButton = ({
  product,
  className,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> &
  AddToCartButtonProps) => {
  const hasHydrated = useCartStore((state) => state._hasHydrated)
  const products = useCartStore((state) => state.products)
  const addItemToCart = useCartStore((state) => state.addItemToCart)
  const deleteItemFromCart = useCartStore((state) => state.deleteItemFromCart)

  const isInCart = useMemo(
    () => products.some((item) => item.item.id === product?.id),
    [products, product]
  )

  const handleToggleCart = () => {
    if (!hasHydrated || !product) return

    if (isInCart) {
      deleteItemFromCart(product.id)
    } else {
      addItemToCart(product)
    }
  }

  return (
    <Button
      size="sm"
      variant="brand"
      onClick={handleToggleCart}
      className={cn("cursor-pointer", className)}
      disabled={!hasHydrated || !product}
      {...props}
    >
      {!hasHydrated ? (
        <>
          Загрузка <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
        </>
      ) : isInCart ? (
        <>
          Удалить <X className="ml-2 h-4 w-4" />
        </>
      ) : (
        <>
          В корзину <Plus className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  )
}

export { AddToCartButton }
