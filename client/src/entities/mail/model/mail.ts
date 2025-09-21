import { ProductBase } from "@/entities/product/model"
import { CartData } from "@/features/cart/model/cart"

interface Body {
  firstname: string
  message?: string
}

interface BodyCart {
  cartItems: CartData<ProductBase>[]
}

interface BodyEmail {
  mode: "email"
  email: string
  phonenumber: never
}

interface BodyPhonenumber {
  mode: "phonenumber"
  phonenumber: string
  email: never
}

export type { Body, BodyCart, BodyPhonenumber, BodyEmail }
