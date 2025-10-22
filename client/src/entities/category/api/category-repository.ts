"use server"

import { CategoryBase } from "@/entities/category/model"
import { api } from "@/shared/api/api"
import { ErrorHandler } from "@/shared/lib/error"
import {
  StrapiItemResponse,
  StrapiListResponse,
  StrapiQuery,
} from "@/shared/model/strapi"
import qs from "qs"

const fetchCategoryList = async (queryObj?: StrapiQuery<CategoryBase>) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api(`/api/categories`, {
      method: "GET",
      params: new URLSearchParams(query),
      next: {
        tags: ["category"],
      },
    })
    return (await response.json()) as StrapiListResponse<CategoryBase>
  } catch (e) {
    return ErrorHandler(e, "/api/categories")
  }
}

const fetchCategoryItemBySlug = async (
  slug: string,
  queryObj?: StrapiQuery<CategoryBase>
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

    const response = await api(`/api/categories`, {
      method: "GET",
      params: new URLSearchParams(query),
      next: {
        tags: [`category::${slug}`],
      },
    })

    const data = (await response.json()) as StrapiListResponse<CategoryBase>

    return {
      data: data.data[0],
    } as StrapiItemResponse<CategoryBase>
  } catch (e) {
    return ErrorHandler(e, "/api/categories")
  }
}

export { fetchCategoryList, fetchCategoryItemBySlug }
