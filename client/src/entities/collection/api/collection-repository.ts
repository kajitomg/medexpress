"use server"

import {
  CollectionBase,
  CollectionListResponse,
} from "@/entities/collection/model/collection"
import { api } from "@/shared/api"
import { DocumentServices } from "@/shared/model"

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

export { fetchCollectionsList }
