"use server"

import {
  CategoryBase,
  CategoryItemResponse,
  CategoryListResponse,
} from "@/entities/category/model"
import { api } from "@/shared/api/api"
import { ErrorUtils } from "@/shared/lib/error"
import { DocumentServices } from "@/shared/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"
import qs from "qs"

const fetchCategoriesList = async (queryObj?: StrapiQuery<CategoryBase>) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api(`/api/categories`, {
      method: "GET",
      params: new URLSearchParams(query),
      next: {
        tags: ["category"],
      },
    })

    return (await response.json()) as CategoryListResponse<
      CategoryBase & DocumentServices
    >
  } catch (e) {
    const error = await ErrorUtils.getErrors(e)
    throw error[0]
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

    const data = (await response.json()) as CategoryListResponse<
      CategoryBase & DocumentServices
    >

    return {
      data: data.data[0],
    } as CategoryItemResponse<CategoryBase & DocumentServices>
  } catch (e) {
    console.error(e)
    throw e
  }
}

export { fetchCategoriesList, fetchCategoryItemBySlug }
