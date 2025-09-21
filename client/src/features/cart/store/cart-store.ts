import { CartItem } from "@/features/cart/model/cart"
import { Error } from "@/shared/model/error"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

interface CartState {
  products: CartItem[]
  error?: Error
  _hasHydrated: boolean
}

interface CartActions {
  addItemToCart: (slug?: string) => void
  deleteItemFromCart: (slug?: string) => void
  incrementItemInCart: (slug?: string) => void
  decrementItemInCart: (slug?: string) => void
  clearCart: () => void
}

export type CartStore = CartState & CartActions

const defaultInitState: CartState = {
  products: [],
  error: undefined,
  _hasHydrated: false,
}

export const createCartStore = (
  initState: Partial<CartState> = defaultInitState,
  skipHydration: boolean = false
) =>
  create<CartStore>()(
    immer(
      persist(
        (set) => ({
          ...{ ...defaultInitState, ...initState },
          addItemToCart: (slug?: string) => {
            if (!slug) return
            set((state) => {
              const productIndex = state.products.findIndex(
                (product) => product.slug === slug
              )

              if (productIndex >= 0) {
                state.products[productIndex].count++
              } else {
                const product = {
                  slug,
                  count: 1,
                }
                state.products.push(product)
              }
              state.error = undefined
            })
          },
          deleteItemFromCart: (slug?: string) => {
            set((state) => {
              const productIndex = state.products.findIndex(
                (product) => product.slug === slug
              )

              if (productIndex === -1) {
                state.error = "Product not found."
              } else {
                state.products.splice(productIndex, 1)
                state.error = undefined
              }
            })
          },
          incrementItemInCart: (slug?: string) => {
            set((state) => {
              const productIndex = state.products.findIndex(
                (product) => product.slug === slug
              )
              if (productIndex === -1) {
                state.error = "Product not found."
              } else {
                state.products[productIndex].count++
                state.error = undefined
              }
            })
          },
          decrementItemInCart: (slug?: string) => {
            set((state) => {
              const productIndex = state.products.findIndex(
                (product) => product.slug === slug
              )
              if (productIndex === -1) {
                state.error = "Product not found."
              } else {
                state.products[productIndex].count--
                if (state.products[productIndex].count <= 0) {
                  state.products.splice(productIndex, 1)
                }
                state.error = undefined
              }
            })
          },
          clearCart: () => {
            set((state) => {
              state.products = []
              state.error = undefined
            })
          },
        }),
        {
          name: "cartStore",
          partialize: (state) => ({ products: state.products }),
          onRehydrateStorage: () => (state) => {
            if (state) {
              state._hasHydrated = true
            }
          },
          skipHydration,
        }
      )
    )
  )
