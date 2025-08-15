"use server"

import {
  ProductBase,
  ProductItemResponse,
  ProductListResponse,
} from "@/entities/product/model"
import { api } from "@/shared/api"
import { DocumentServices } from "@/shared/model"
import qs from "qs"

const fetchProductsList = async (query?: string) => {
  try {
    const response = await api<
      ProductListResponse<ProductBase & DocumentServices>
    >(`/api/products`, {
      method: "GET",
      params: new URLSearchParams(query),
    })
    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

const fetchProductItem = async (documentId: string, query?: string) => {
  try {
    const response = await api<
      ProductItemResponse<ProductBase & DocumentServices>
    >(`/api/products/${documentId}`, {
      method: "GET",
      params: new URLSearchParams(query),
    })
    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

const fetchProductItemBySlug = async (slug: string, query?: string) => {
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
      ProductListResponse<ProductBase & DocumentServices>
    >(`/api/products`, {
      method: "GET",
      params: new URLSearchParams(query),
    })

    return {
      data: response.data.data[0],
    } as ProductItemResponse<ProductBase & DocumentServices>
  } catch (e) {
    console.error(e)
    throw e
  }
}

export { fetchProductsList, fetchProductItem, fetchProductItemBySlug }
