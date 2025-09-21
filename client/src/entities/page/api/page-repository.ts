"use server"

import { PageBase, PageItemResponse } from "@/entities/page/model"
import { PageListResponse } from "@/entities/page/model/page"
import { api } from "@/shared/api/api"
import { ErrorUtils } from "@/shared/lib/error"
import { DocumentServices } from "@/shared/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"
import qs from "qs"

const fetchPageItem = async (
  queryObj?: StrapiQuery<PageBase>,
  tags?: string[]
) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api(`/api/page`, {
      method: "GET",
      params: new URLSearchParams(query),
      next: {
        tags,
      },
    })

    return (await response.json()) as PageItemResponse<
      PageBase & DocumentServices
    >
  } catch (e) {
    const error = await ErrorUtils.getErrors(e)
    throw error[0]
  }
}

const fetchPageItemBySlug = async (
  slug: string,
  queryObj?: StrapiQuery<PageBase>
) => {
  try {
    queryObj = {
      ...queryObj,
      filters: {
        slug,
        ...queryObj?.filters,
      },
    }

    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api(`/api/pages`, {
      method: "GET",
      params: new URLSearchParams(query),
      next: {
        tags: [slug],
      },
    })

    const data = (await response.json()) as PageListResponse<
      PageBase & DocumentServices
    >
    return {
      data: data.data[0],
    } as PageItemResponse<PageBase & DocumentServices>
  } catch (e) {
    const error = await ErrorUtils.getErrors(e)
    throw error[0]
  }
}

export { fetchPageItem, fetchPageItemBySlug }
