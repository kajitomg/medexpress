import { MetaData } from "@/shared/model"
import { Viewport } from "next"

export const generateSeoViewport = <T extends { seo?: Partial<MetaData> }>(
  data: T
): Viewport | string => {
  if (!data || !data.seo?.metaViewport) {
    return {}
  }
  return data.seo.metaViewport
}
