"use server"

import { fetchCollectionsList } from "@/entities/collection/api"
import qs from "qs"

const fetchNavigationCollectionsList = async () => {
  const queryObj = {
    fields: ["title", "slug"],
    pagination: {
      start: 0,
      limit: 500,
    },
    populate: {
      media: true,
    },
  }

  const query = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  })

  return await fetchCollectionsList(query)
}

export { fetchNavigationCollectionsList }
