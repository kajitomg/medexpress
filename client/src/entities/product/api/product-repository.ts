"use server"

import { ProductBase } from "@/entities/product/model"
import { api } from "@/shared/api/api"
import { ErrorHandler } from "@/shared/lib/error"
import {
  Query,
  StrapiItemResponse,
  StrapiListResponse,
} from "@/shared/model/strapi"
import qs from "qs"

const fetchProductList = async (
  queryObj?: Query<ProductBase>,
  tags?: string[]
) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api(`/api/products`, {
      method: "GET",
      params: new URLSearchParams(query),
      next: {
        tags,
      },
    })

    return (await response.json()) as StrapiListResponse<ProductBase>
  } catch (e) {
    return ErrorHandler(e, "/api/products")
  }
}

const fetchProductItemBySlug = async (
  slug: string,
  queryObj?: Query<ProductBase>
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

    const response = await api(`/api/products`, {
      method: "GET",
      params: new URLSearchParams(query),
      next: {
        tags: [`product::${slug}`],
      },
    })

    const data = (await response.json()) as StrapiListResponse<ProductBase>

    return {
      data: data.data[0],
    } as StrapiItemResponse<ProductBase>
  } catch (e) {
    return ErrorHandler(e, "/api/products")
  }
}

export { fetchProductList, fetchProductItemBySlug }
