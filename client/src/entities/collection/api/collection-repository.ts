"use server"

import {
  CollectionBase,
  CollectionItemResponse,
  CollectionListResponse,
} from "@/entities/collection/model/collection"
import { api } from "@/shared/api/api"
import { ErrorHandler } from "@/shared/lib/error"
import { DocumentServices } from "@/shared/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"
import qs from "qs"

const fetchCollectionsList = async (queryObj?: StrapiQuery<CollectionBase>) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api(`/api/collections`, {
      method: "GET",
      params: new URLSearchParams(query),
      next: {
        tags: ["collection"],
      },
    })
    return (await response.json()) as CollectionListResponse<
      CollectionBase & DocumentServices
    >
  } catch (e) {
    return ErrorHandler(e, "/api/collections")
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
      next: {
        tags: [`collection::${slug}`],
      },
    })

    const data = (await response.json()) as CollectionListResponse<
      CollectionBase & DocumentServices
    >

    return {
      data: data.data[0],
    } as CollectionItemResponse<CollectionBase & DocumentServices>
  } catch (e) {
    return ErrorHandler(e, "/api/collections")
  }
}

export { fetchCollectionsList, fetchCollectionItemBySlug }
