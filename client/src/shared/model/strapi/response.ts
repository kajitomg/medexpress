import { StrapiBase, StrapiOptional } from "@/shared/model/strapi/base"

export type StrapiMeta = {
  pagination: {
    page: number
    pageSize: number
    total: number
    pageCount: number
  }
}

export type StrapiListResponse<T extends StrapiBase> = {
  data: Array<T>
  meta: StrapiMeta
}

export type StrapiItemResponse<T extends StrapiBase> = {
  data: StrapiOptional<T>
  meta: object
}
