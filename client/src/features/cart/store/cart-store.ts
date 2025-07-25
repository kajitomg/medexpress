import { ProductBase } from "@/entities/product/model/product"
import { CartItem } from "@/features/cart/model/cart"
import { DocumentId } from "@/shared/model/document"
import { Error } from "@/shared/model/error"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

interface CartState {
  products: CartItem<ProductBase>[]
  error: Error | null
}

interface CartActions {
  addItemToCart: (product: ProductBase) => void
  deleteItemFromCart: (id: DocumentId) => void
  incrementItemInCart: (id: DocumentId) => void
  decrementItemInCart: (id: DocumentId) => void
  clearCart: () => void
}

export type CartStore = CartState & CartActions

const defaultInitState: CartState = {
  products: [],
  error: null,
}

export const useCartStore = create<CartStore>()(
  immer(
    persist(
      (set) => ({
        ...defaultInitState,
        addItemToCart: (item: ProductBase) => {
          set((state) => {
            const productIndex = state.products.findIndex(
              (product) => product.item.id === item.id
            )

            if (productIndex >= 0) {
              state.products[productIndex].count++
            } else {
              const product: CartItem<ProductBase> = {
                item: item,
                count: 1,
              }
              state.products.push(product)
            }
            state.error = null
          })
        },
        deleteItemFromCart: (id: DocumentId) => {
          set((state) => {
            const productIndex = state.products.findIndex(
              (product) => product.item.id === id
            )

            if (productIndex === -1) {
              state.error = "Product not found."
            } else {
              state.products.splice(productIndex, 1)
              state.error = null
            }
          })
        },
        incrementItemInCart: (id: DocumentId) => {
          set((state) => {
            const productIndex = state.products.findIndex(
              (product) => product.item.id === id
            )
            if (productIndex === -1) {
              state.error = "Product not found."
            } else {
              state.products[productIndex].count++
              state.error = null
            }
          })
        },
        decrementItemInCart: (id: DocumentId) => {
          set((state) => {
            const productIndex = state.products.findIndex(
              (product) => product.item.id === id
            )
            if (productIndex === -1) {
              state.error = "Product not found."
            } else {
              state.products[productIndex].count--
              if (state.products[productIndex].count <= 0) {
                state.products.splice(productIndex, 1)
              }
              state.error = null
            }
          })
        },
        clearCart: () => {
          set((state) => {
            state.products = []
            state.error = null
          })
        },
      }),
      { name: "cartStore" }
    )
  )
)

export const createCartStore = (initState: CartState = defaultInitState) =>
  create<CartStore>()(
    immer(
      persist(
        (set) => ({
          ...initState,
          addItemToCart: (item: ProductBase) => {
            set((state) => {
              const productIndex = state.products.findIndex(
                (product) => product.item.id === item.id
              )

              if (productIndex >= 0) {
                state.products[productIndex].count++
              } else {
                const product: CartItem<ProductBase> = {
                  item: item,
                  count: 1,
                }
                state.products.push(product)
              }
              state.error = null
            })
          },
          deleteItemFromCart: (id: DocumentId) => {
            set((state) => {
              const productIndex = state.products.findIndex(
                (product) => product.item.id === id
              )

              if (productIndex === -1) {
                state.error = "Product not found."
              } else {
                state.products.splice(productIndex, 1)
                state.error = null
              }
            })
          },
          incrementItemInCart: (id: DocumentId) => {
            set((state) => {
              const productIndex = state.products.findIndex(
                (product) => product.item.id === id
              )
              if (productIndex === -1) {
                state.error = "Product not found."
              } else {
                state.products[productIndex].count++
                state.error = null
              }
            })
          },
          decrementItemInCart: (id: DocumentId) => {
            set((state) => {
              const productIndex = state.products.findIndex(
                (product) => product.item.id === id
              )
              if (productIndex === -1) {
                state.error = "Product not found."
              } else {
                state.products[productIndex].count--
                if (state.products[productIndex].count <= 0) {
                  state.products.splice(productIndex, 1)
                }
                state.error = null
              }
            })
          },
          clearCart: () => {
            set((state) => {
              state.products = []
              state.error = null
            })
          },
        }),
        { name: "cartStore" }
      )
    )
  )
