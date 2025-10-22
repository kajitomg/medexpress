import { SeoComponent } from "@/entities/_components"
import { StrapiOptional } from "@/shared/model/strapi"
import { Viewport } from "next"

export const generateSeoViewport = <
  T extends StrapiOptional<{ seo?: StrapiOptional<Partial<SeoComponent>> }>,
>(
  data: T
): Viewport | string => {
  if (!data || !data.seo?.metaViewport) {
    return {}
  }
  return data.seo.metaViewport
}
