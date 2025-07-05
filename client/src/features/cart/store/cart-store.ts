import { ProductBase } from "@/entities/product/model/product"
import { CartItem } from "@/features/cart/model/cart"
import { DocumentId } from "@/shared/model/document"
import { Error } from "@/shared/model/error"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartState {
  products: CartItem<ProductBase>[]
  error: Error | null
}

interface CartActions {
  addItemToCart: (product: ProductBase) => void
  deleteItemFromCart: (id: DocumentId) => void
  incrementItemInCart: (id: DocumentId) => void
  decrementItemInCart: (id: DocumentId) => void
}

export type CartStore = CartState & CartActions

const initState: CartState = {
  products: [],
  error: null,
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, getState) => ({
      ...initState,
      addItemToCart: (item: ProductBase) => {
        set({ error: null })
        const products = getState().products
        const productIndex = products.findIndex(
          (product) => product.item.id === item.id
        )
        if (productIndex >= 0) {
          products[productIndex].count++
        } else {
          const product: CartItem<ProductBase> = {
            item: item,
            count: 1,
          }
          products.push(product)
        }
        set({ products })
      },
      deleteItemFromCart: (id: DocumentId) => {
        set({ error: null })
        const products = getState().products
        const productIndex = products.findIndex(
          (product) => product.item.id === id
        )
        if (productIndex === -1) {
          set({ error: "Product not found." })
        } else {
          products.splice(productIndex, 1)
          set({ products })
        }
      },
      incrementItemInCart: (id: DocumentId) => {
        const products = getState().products
        const productIndex = products.findIndex(
          (product) => product.item.id === id
        )
        if (productIndex === -1) {
          set({ error: "Product not found." })
        } else {
          products[productIndex].count++
          set({ products })
        }
      },
      decrementItemInCart: (id: DocumentId) => {
        set({ error: null })
        const products = getState().products
        const productIndex = products.findIndex(
          (product) => product.item.id === id
        )
        if (productIndex === -1) {
          set({ error: "Product not found." })
        } else {
          products[productIndex].count--
          if (products[productIndex].count <= 0) {
            getState().deleteItemFromCart(id)
          } else {
            set({ products })
          }
        }
      },
    }),
    { name: "cartStore" }
  )
)
