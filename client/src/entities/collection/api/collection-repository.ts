"use server"

import {
  CollectionBase,
  CollectionItemResponse,
  CollectionListResponse,
} from "@/entities/collection/model/collection"
import { api } from "@/shared/api"
import { DocumentServices } from "@/shared/model"
import qs from "qs"

const fetchCollectionsList = async (query?: string) => {
  try {
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

const fetchCollectionItemBySlug = async (slug: string, query?: string) => {
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
