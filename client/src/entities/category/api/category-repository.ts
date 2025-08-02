"use server"

import { CategoryBase, CategoryListResponse } from "@/entities/category/model"
import { api } from "@/shared/api"
import { DocumentServices } from "@/shared/model"

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

export { fetchCategoriesList }
