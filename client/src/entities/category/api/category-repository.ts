"use server"

import {
  CategoryBase,
  CategoryItemResponse,
  CategoryListResponse,
} from "@/entities/category/model"
import { api } from "@/shared/api"
import { DocumentServices } from "@/shared/model"
import qs from "qs"

const fetchCategoriesList = async (query?: string) => {
  try {
    const response = await api<
      CategoryListResponse<CategoryBase & DocumentServices>
    >(`/api/categories`, {
      method: "GET",
      params: new URLSearchParams(query),
    })
    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

const fetchCategoryItemBySlug = async (slug: string, query?: string) => {
  try {
    const inputQueryObj = query ? qs.parse(query) : {}
    const queryObj = {
      ...inputQueryObj,
      filters: {
        slug,
        ...inputQueryObj.filters,
      },
    }

    query = qs.stringify(queryObj, { encodeValuesOnly: true })

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
