"use server"

import { PageBase, PageItemResponse } from "@/entities/page/model"
import { PageListResponse } from "@/entities/page/model/page"
import { SettingsBase, SettingsItemResponse } from "@/entities/settings/model"
import { api } from "@/shared/api"
import { ErrorUtils } from "@/shared/lib/error"
import { DocumentServices } from "@/shared/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"
import qs from "qs"

const fetchPageItem = async (queryObj?: StrapiQuery<PageBase>) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api<
      SettingsItemResponse<SettingsBase & DocumentServices>
    >(`/api/page`, {
      method: "GET",
      params: new URLSearchParams(query),
    })
    return response.data
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

    const response = await api<PageListResponse<PageBase & DocumentServices>>(
      `/api/pages`,
      {
        method: "GET",
        params: new URLSearchParams(query),
      }
    )

    return {
      data: response.data.data[0],
    } as PageItemResponse<PageBase & DocumentServices>
  } catch (e) {
    const error = await ErrorUtils.getErrors(e)
    throw error[0]
  }
}

export { fetchPageItem, fetchPageItemBySlug }
