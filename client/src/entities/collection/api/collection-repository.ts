"use server"

import {
  CollectionBase,
  CollectionItemResponse,
  CollectionListResponse,
} from "@/entities/collection/model/collection"
import { api } from "@/shared/api/api"
import { DocumentServices } from "@/shared/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"
import qs from "qs"

const fetchCollectionsList = async (queryObj?: StrapiQuery<CollectionBase>) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api(`/api/collections`, {
      method: "GET",
      params: new URLSearchParams(query),
    })
    return (await response.json()) as CollectionListResponse<
      CollectionBase & DocumentServices
    >
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

    const response = await api(`/api/collections`, {
      method: "GET",
      params: new URLSearchParams(query),
    })

    const data = (await response.json()) as CollectionListResponse<
      CollectionBase & DocumentServices
    >

    return {
      data: data.data[0],
    } as CollectionItemResponse<CollectionBase & DocumentServices>
  } catch (e) {
    console.error(e)
    throw e
  }
}

export { fetchCollectionsList, fetchCollectionItemBySlug }
