"use server"

import {
  CategoryBase,
  CategoryItemResponse,
  CategoryListResponse,
} from "@/entities/category/model"
import { api } from "@/shared/api"
import { ErrorUtils } from "@/shared/lib/error"
import { DocumentServices } from "@/shared/model"
import { StrapiQuery } from "@/shared/model/strapi"
import qs from "qs"

const fetchCategoriesList = async (queryObj?: StrapiQuery<CategoryBase>) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api<
      CategoryListResponse<CategoryBase & DocumentServices>
    >(`/api/categories`, {
      method: "GET",
      params: new URLSearchParams(query),
    })
    return response.data
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

    const response = await api<
      CategoryListResponse<CategoryBase & DocumentServices>
    >(`/api/categories`, {
      method: "GET",
      params: new URLSearchParams(query),
    })

    return {
      data: response.data.data[0],
    } as CategoryItemResponse<CategoryBase & DocumentServices>
  } catch (e) {
    console.error(e)
    throw e
  }
}

export { fetchCategoriesList, fetchCategoryItemBySlug }
