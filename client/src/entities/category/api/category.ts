"use server"
import {
  CategoryBase,
  CategoryItemResponse,
  CategoryListResponse,
} from "@/entities/category/model/category"
import { api } from "@/shared/api/api"
import { DocumentServices } from "@/shared/model/document"
import { AxiosError } from "axios"
import qs from "qs"

export const fetchCategories = async (
  fields: (keyof CategoryBase & DocumentServices)[] = []
) => {
  try {
    const query = qs.stringify(
      {
        fields,
        pagination: {
          start: 0,
          limit: 500,
        },
        populate: {
          parent: {
            fields: ["id", "documentId"],
          },
          media: true,
        },
      },
      {
        encodeValuesOnly: true,
      }
    )

    const response = await api<
      CategoryListResponse<CategoryBase & DocumentServices>
    >({
      method: "GET",
      url: `/api/categories`,
      params: new URLSearchParams(query),
    })

    return response.data.data
  } catch (e) {
    if (e instanceof AxiosError) console.log(e.response)
    else console.log(e)
  }
}

export const fetchCategory = async (
  documentId: string,
  fields: (keyof CategoryBase & DocumentServices)[] = []
) => {
  try {
    const query = qs.stringify(
      {
        fields,
        populate: {
          parent: {
            fields: ["id", "documentId"],
          },
          media: true,
        },
      },
      {
        encodeValuesOnly: true,
      }
    )

    const response = await api<CategoryItemResponse>({
      method: "GET",
      url: `/api/categories/${documentId}`,
      params: new URLSearchParams(query),
    })

    return response.data.data
  } catch (e) {
    if (e instanceof AxiosError) console.log(e.response)
    else console.log(e)
  }
}
