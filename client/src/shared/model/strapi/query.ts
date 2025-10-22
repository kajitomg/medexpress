import { StrapiBase, StrapiPaginationBase } from "@/shared/model/strapi/index"

type StrapiFilterOperator =
  | "$eq"
  | "$eqi"
  | "$ne"
  | "$nei"
  | "$lt"
  | "$lte"
  | "$gt"
  | "$gte"
  | "$in"
  | "$nin"
  | "$contains"
  | "$containsi"
  | "$notContains"
  | "$notContainsi"
  | "$null"
  | "$notNull"
  | "$between"
  | "$startsWith"
  | "$startsWithi"
  | "$endsWith"
  | "$endsWithi"
  | "$or"
  | "$and"
  | "$not"

type SortOrder<T> =
  | keyof T
  | `${keyof T & string}:asc`
  | `${keyof T & string}:desc`

type StrapiSort<T> = SortOrder<T> | SortOrder<T>[]

type Unarray<T> = T extends (infer U)[] ? U : T

type StrapiFilterValue = string | number | boolean | string[] | number[]
type StrapiFilters<T> = {
  [K in keyof T]?:
    | { [key in StrapiFilterOperator]?: StrapiFilterValue }
    | StrapiFilterValue
    | StrapiFilters<Unarray<NonNullable<T[K]>>>
} & {
  [key in StrapiFilterOperator]?: StrapiFilters<T>[]
}

type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

type StrapiDynamicZonePopulate<T> = Partial<
  UnionToIntersection<
    T extends { __component: infer P extends string }
      ? { [K in P]: StrapiPopulateObject<T> | true }
      : never
  >
>

type StrapiPopulateObject<T> = {
  fields?: (keyof T)[]
  populate?: StrapiPopulate<T>
  filters?: StrapiFilters<T>
  sort?: StrapiSort<T>
  on?: StrapiDynamicZonePopulate<Unarray<NonNullable<T>>>
}

type StrapiPopulate<T> =
  | {
      [K in keyof T]?:
        | boolean
        | StrapiPopulateObject<Unarray<NonNullable<T[K]>>>
    }
  | "*"
  | string[]

export interface StrapiQuery<T extends StrapiBase> {
  sort?: StrapiSort<T>
  fields?: (keyof T)[]
  populate?: StrapiPopulate<Omit<T, keyof StrapiBase>>
  filters?: StrapiFilters<T>
  pagination?: StrapiPaginationBase
  publicationState?: "live" | "preview"
  locale?: string | string[]
}
