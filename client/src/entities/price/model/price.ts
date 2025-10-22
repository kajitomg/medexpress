import { Currency } from "@/entities/currency/model"
import { ProductBase } from "@/entities/product/model"
import {
  StrapiBase,
  StrapiOptional,
  StrapiRelation,
} from "@/shared/model/strapi"

export interface Price extends StrapiBase {
  price: number
  direction: "FROM" | "CURRENT"
  priceStatus: "AVAILABLE" | "NOT SPECIFIED" | "ON REQUEST"
  currency: StrapiOptional<StrapiRelation<Currency>>
  product: StrapiOptional<StrapiRelation<ProductBase>>
}
