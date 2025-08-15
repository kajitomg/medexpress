"use server"

import { fetchCollectionsList } from "@/entities/collection/api"
import qs from "qs"

const fetchCatalogCollectionsList = async (search?: string) => {
  const queryObj = {
    fields: ["title", "slug"],
    pagination: {
      start: 0,
      limit: 500,
    },
    filters: {
      $or: [] as Record<string, unknown>[],
    },
    populate: {
      products: { fields: ["id"] },
      media: true,
    },
  }

  if (search) {
    queryObj.filters.$or.push(
      { title: { $containsi: search } },
      { description: { $containsi: search } }
    )
  }

  const query = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  })

  return await fetchCollectionsList(query)
}

export { fetchCatalogCollectionsList }
