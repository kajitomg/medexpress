"use server"
import {
  ProductBase,
  ProductItemResponse,
  ProductListResponse,
} from "@/entities/product/model/product"
import { api } from "@/shared/api/api"
import { DocumentId, DocumentServices } from "@/shared/model/document"
import { AxiosError } from "axios"
import qs from "qs"

export const fetchProducts = async (
  fields: (keyof ProductBase & DocumentServices)[] = [],
  categories: DocumentId[] = [],
  search?: string | null
) => {
  try {
    const query = qs.stringify(
      {
        fields,
        filters: {
          categories: {
            $in: categories,
          },
          $or: [
            { title: { $contains: search } },
            { description: { $contains: search } },
            { code: { $contains: search } },
          ],
        },
        populate: {
          categories: {
            fields: ["id", "documentId", "title"],
          },
          media: true,
        },
      },
      {
        encodeValuesOnly: true,
      }
    )

    const response = await api<ProductListResponse>({
      method: "GET",
      url: `/api/products`,
      params: new URLSearchParams(query),
    })

    return response.data.data
  } catch (e) {
    if (e instanceof AxiosError) console.log(e.response)
    else console.log(e)
  }
}

export const fetchProduct = async (
  documentId: string,
  fields: (keyof ProductBase & DocumentServices)[] = []
) => {
  try {
    const query = qs.stringify(
      {
        fields,
        populate: {
          categories: {
            fields: ["id", "documentId", "title"],
          },
          media: true,
        },
      },
      {
        encodeValuesOnly: true,
      }
    )

    const response = await api<ProductItemResponse>({
      method: "GET",
      url: `/api/products/${documentId}`,
      params: new URLSearchParams(query),
    })

    return response.data.data
  } catch (e) {
    if (e instanceof AxiosError) console.log(e.response)
    else console.log(e)
  }
}
