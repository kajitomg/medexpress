"use server"

import { fetchCollectionItemBySlug } from "@/entities/collection/api"
import qs from "qs"

const fetchDetailCollectionItem = async (slug: string) => {
  const queryObj = {
    populate: {
      media: true,
    },
  }

  const query = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  })

  return await fetchCollectionItemBySlug(slug, query)
}

export { fetchDetailCollectionItem }
