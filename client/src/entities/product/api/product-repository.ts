"use server"

import {
  ProductBase,
  ProductItemResponse,
  ProductListResponse,
} from "@/entities/product/model"
import { api } from "@/shared/api/api"
import { DocumentServices } from "@/shared/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"
import qs from "qs"

const fetchProductsList = async (
  queryObj?: StrapiQuery<ProductBase>,
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

    return (await response.json()) as ProductListResponse<
      ProductBase & DocumentServices
    >
  } catch (e) {
    console.error(e)
    throw e
  }
}

const fetchProductItemBySlug = async (
  slug: string,
  queryObj?: StrapiQuery<ProductBase>
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

    const data = (await response.json()) as ProductListResponse<
      ProductBase & DocumentServices
    >

    return {
      data: data.data[0],
    } as ProductItemResponse<ProductBase & DocumentServices>
  } catch (e) {
    console.error(e)
    throw e
  }
}

export { fetchProductsList, fetchProductItemBySlug }
