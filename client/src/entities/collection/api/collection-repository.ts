"use server"

import {
  CollectionBase,
  CollectionItemResponse,
  CollectionListResponse,
} from "@/entities/collection/model/collection"
import { api } from "@/shared/api"
import { DocumentServices } from "@/shared/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"
import qs from "qs"

const fetchCollectionsList = async (queryObj?: StrapiQuery<CollectionBase>) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api<
      CollectionListResponse<CollectionBase & DocumentServices>
    >(`/api/collections`, {
      method: "GET",
      params: new URLSearchParams(query),
    })
    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

const fetchCollectionItemBySlug = async (
  slug: string,
  queryObj?: StrapiQuery<CollectionBase>
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
      CollectionListResponse<CollectionBase & DocumentServices>
    >(`/api/collections`, {
      method: "GET",
      params: new URLSearchParams(query),
    })

    return {
      data: response.data.data[0],
    } as CollectionItemResponse<CollectionBase & DocumentServices>
  } catch (e) {
    console.error(e)
    throw e
  }
}

export { fetchCollectionsList, fetchCollectionItemBySlug }
