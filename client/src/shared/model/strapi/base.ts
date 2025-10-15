export type StrapiId = number

export type StrapiExtended<T> = T | null

export type StrapiBase = {
  id: StrapiId
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
  locale?: string
}
