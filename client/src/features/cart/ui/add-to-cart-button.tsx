"use client"

import { ProductBase } from "@/entities/product/model"
import { useCartStore } from "@/features/cart/provider"
import { Button } from "@/shared/ui/button"
import { Loader2Icon, Plus, X } from "lucide-react"
import { useMemo } from "react"

interface AddToCartButtonProps {
  product: ProductBase
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const hasHydrated = useCartStore((state) => state._hasHydrated)
  const products = useCartStore((state) => state.products)
  const addItemToCart = useCartStore((state) => state.addItemToCart)
  const deleteItemFromCart = useCartStore((state) => state.deleteItemFromCart)

  const isInCart = useMemo(
    () => products.some((item) => item.item.id === product.id),
    [products, product]
  )

  const handleToggleCart = () => {
    if (isInCart) {
      deleteItemFromCart(product.id)
    } else {
      addItemToCart(product)
    }
  }

  return (
    <Button
      size="sm"
      onClick={handleToggleCart}
      className="cursor-pointer"
      disabled={!hasHydrated}
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
