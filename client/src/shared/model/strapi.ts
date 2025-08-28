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

type StrapiPopulate<T> =
  | {
      [K in keyof T]?:
        | boolean
        | {
            fields?: (keyof Unarray<NonNullable<T[K]>>)[]
            populate?: StrapiPopulate<Unarray<NonNullable<T[K]>>>
            filters?: StrapiFilters<Unarray<NonNullable<T[K]>>>
            sort?: string | string[]
          }
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
