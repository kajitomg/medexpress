"use server"

import { fetchProductItemBySlug } from "@/entities/product/api"
import qs from "qs"

const fetchDetailProductItemBySlug = async (slug: string) => {
  const queryObj = {
    populate: {
      categories: {
        fields: ["id", "title", "slug"],
      },
      collections: {
        fields: ["id", "slug"],
      },
      media: true,
    },
  }

  const query = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  })

  return await fetchProductItemBySlug(slug, query)
}

export { fetchDetailProductItemBySlug }
