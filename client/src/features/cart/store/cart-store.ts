import { ProductBase } from "@/entities/product/model/product"
import { fetchDetailProductItemByDocumentId } from "@/entities/product/services/fetch-detail-product-item-by-document-id"
import { CartItem } from "@/features/cart/model/cart"
import { DocumentId, DocumentServices } from "@/shared/model/document"
import { Error } from "@/shared/model/error"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

interface CartState {
  products: CartItem<ProductBase>[]
  error?: Error
  _hasHydrated: boolean
}

interface CartActions {
  addItemToCart: (product: ProductBase) => Promise<void>
  deleteItemFromCart: (id: DocumentId) => void
  incrementItemInCart: (id: DocumentId) => void
  decrementItemInCart: (id: DocumentId) => void
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
          addItemToCart: async (item: ProductBase & DocumentServices) => {
            if (item.documentId) {
              const response = await fetchDetailProductItemByDocumentId(
                item.documentId
              )
              item = response.data
            }
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
              state.error = undefined
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
                state.error = undefined
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
                state.error = undefined
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
