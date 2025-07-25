import { ProductBase } from "@/entities/product/model"
import { CartItem } from "@/features/cart/model"

interface Body {
  firstname: string
  message?: string
}

interface BodyCart {
  cartItems: CartItem<ProductBase>[]
}

interface BodyEmail {
  type: "email"
  email: string
  phonenumber: never
}

interface BodyPhonenumber {
  type: "phonenumber"
  phonenumber: string
  email: never
}

export type { Body, BodyCart, BodyPhonenumber, BodyEmail }
