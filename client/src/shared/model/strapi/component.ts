import { StrapiBase, StrapiExtended } from "@/shared/model/strapi/base"

export type ExtractByComponent<
  E extends StrapiComponentBase<string>,
  T extends E["__component"],
> = Extract<E, { __component: T }>

export interface StrapiComponentBase<T extends string> extends StrapiBase {
  __component: T
}

export type StrapiDynamicZone<T> = StrapiExtended<
  Array<T & StrapiComponentBase<string>>
>

export type StrapiComponent<T> = StrapiExtended<T>
