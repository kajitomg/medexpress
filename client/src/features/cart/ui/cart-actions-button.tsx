"use client"

import { useCartStore } from "@/features/cart/provider"
import { cn } from "@/shared/lib"
import { Typography } from "@/shared/ui"
import { Button, buttonVariants } from "@/shared/ui/button"
import { VariantProps } from "class-variance-authority"
import { Loader2Icon, Minus, Plus, X } from "lucide-react"
import * as React from "react"
import { ComponentProps, MouseEventHandler } from "react"

interface AddToCartButtonProps {
  slug?: string
}

const CartActionsButton = ({
  slug,
  className,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> &
  AddToCartButtonProps) => {
  const hasHydrated = useCartStore((state) => state._hasHydrated)
  const product = useCartStore((state) =>
    state.list.find((item) => item.slug === slug)
  )
  const addItemToCart = useCartStore((state) => state.addItemToCart)
  const decrementItemInCart = useCartStore((state) => state.decrementItemInCart)
  const deleteItemFromCart = useCartStore((state) => state.deleteItemFromCart)

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!hasHydrated || !slug) return

    addItemToCart(slug)
  }

  const handleDecrementFromCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!hasHydrated || !slug) return

    decrementItemInCart(slug)
  }

  const handleDeleteFromCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!hasHydrated || !slug) return

    deleteItemFromCart(slug)
  }

  if (!product) {
    return (
      <Button
        size="sm"
        variant="brand"
        onClick={handleAddToCart}
        className={cn("cursor-pointer", className)}
        disabled={!hasHydrated || !slug}
        {...props}
      >
        {!hasHydrated ? (
          <>
            Загрузка <Loader2Icon className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            В корзину <Plus className="h-4 w-4" />
          </>
        )}
      </Button>
    )
  }

  return (
    <div className="max-w-50 flex flex-col gap-3">
      <Typography variant="small" className="inline">
        Количество: {product?.count} шт.
      </Typography>
      <div className="flex gap-1">
        <Button
          size="sm"
          variant="outline"
          onClick={handleAddToCart}
          className={cn("cursor-pointer", className)}
          disabled={!hasHydrated}
        >
          <Plus />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleDecrementFromCart}
          className={cn("cursor-pointer", className)}
          disabled={!hasHydrated}
        >
          <Minus />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleDeleteFromCart}
          className={cn("cursor-pointer", className)}
          disabled={!hasHydrated}
        >
          <X />
        </Button>
      </div>
    </div>
  )
}

export { CartActionsButton }
