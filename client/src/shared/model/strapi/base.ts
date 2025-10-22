export type StrapiId = number

export type StrapiOptional<T> = T extends Array<T> ? T : T | null

export interface StrapiPaginationByPage {
  page?: number
  pageSize?: number
  withCount?: boolean
}

export interface StrapiPaginationByOffset {
  start?: number
  limit?: number
  withCount?: boolean
}

export type StrapiPaginationBase =
  | StrapiPaginationByPage
  | StrapiPaginationByOffset

export type StrapiBase = {
  id: StrapiId
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: StrapiOptional<string>
  locale: StrapiOptional<string>
}
