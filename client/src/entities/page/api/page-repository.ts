"use server"

import { PageBase } from "@/entities/page/model"
import { api } from "@/shared/api/api"
import { ErrorHandler } from "@/shared/lib/error"
import {
  Query,
  StrapiItemResponse,
  StrapiListResponse,
} from "@/shared/model/strapi"
import qs from "qs"

const fetchPageItemBySlug = async (
  slug: string,
  queryObj?: Query<PageBase>
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
        tags: [`page::${slug}`],
      },
    })

    const data = (await response.json()) as StrapiListResponse<PageBase>
    return {
      data: data.data[0],
    } as StrapiItemResponse<PageBase>
  } catch (e) {
    return ErrorHandler(e, "/api/pages")
  }
}

export { fetchPageItemBySlug }
