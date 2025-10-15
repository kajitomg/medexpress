import { Currency } from "@/entities/currency/model"
import { StrapiBase } from "@/shared/model/strapi"

export interface Price extends StrapiBase {
  price: number
  direction: "FROM" | "CURRENT"
  currency: Currency
  priceStatus: "AVAILABLE" | "NOT SPECIFIED" | "ON REQUEST"
}
