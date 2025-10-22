import { StrapiBase } from "@/shared/model/strapi/base"

export type ExtractByComponent<
  E extends StrapiComponentBase<string>,
  T extends E["__component"],
> = Extract<E, { __component: T }>

export interface StrapiComponentBase<T extends string> extends StrapiBase {
  __component: T
}

export type StrapiDynamicZone<T> =
  | Array<T & StrapiComponentBase<string>>
  | undefined

export type StrapiComponent<T> = T | undefined
