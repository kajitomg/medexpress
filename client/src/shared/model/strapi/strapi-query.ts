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
  sort?: string | string[]
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

export interface StrapiQuery<T = unknown> {
  sort?: string | string[]
  fields?: (keyof T)[]
  populate?: StrapiPopulate<T>
  filters?: StrapiFilters<T>
  pagination?: {
    page?: number
    pageSize?: number
    start?: number
    limit?: number
    withCount?: boolean
  }
  publicationState?: "live" | "preview"
  locale?: string | string[]
}
