import { CartItem } from "@/features/cart/model/cart"
import { Error } from "@/shared/model/error"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

interface CartState {
  list: CartItem[]
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
  list: [],
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
              const productIndex = state.list.findIndex(
                (item) => item.slug === slug
              )

              if (productIndex >= 0) {
                state.list[productIndex].count++
              } else {
                const item = {
                  slug,
                  count: 1,
                }
                state.list.push(item)
              }
              state.error = undefined
            })
          },
          deleteItemFromCart: (slug?: string) => {
            set((state) => {
              const itemIndex = state.list.findIndex(
                (item) => item.slug === slug
              )

              if (itemIndex === -1) {
                state.error = "Product not found."
              } else {
                state.list.splice(itemIndex, 1)
                state.error = undefined
              }
            })
          },
          incrementItemInCart: (slug?: string) => {
            set((state) => {
              const itemIndex = state.list.findIndex(
                (item) => item.slug === slug
              )
              if (itemIndex === -1) {
                state.error = "Product not found."
              } else {
                state.list[itemIndex].count++
                state.error = undefined
              }
            })
          },
          decrementItemInCart: (slug?: string) => {
            set((state) => {
              const itemIndex = state.list.findIndex(
                (item) => item.slug === slug
              )
              if (itemIndex === -1) {
                state.error = "Product not found."
              } else {
                state.list[itemIndex].count--
                if (state.list[itemIndex].count <= 0) {
                  state.list.splice(itemIndex, 1)
                }
                state.error = undefined
              }
            })
          },
          clearCart: () => {
            set((state) => {
              state.list = []
              state.error = undefined
            })
          },
        }),
        {
          name: "cartStore",
          partialize: (state) => ({ list: state.list }),
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
