"use server"

import { fetchCategoryItemBySlug } from "@/entities/category/api"
import qs from "qs"

const fetchDetailCategoryItem = async (slug: string) => {
  const queryObj = {
    fields: ["id", "title", "code", "slug"],
    populate: {
      media: true,
    },
  }

  const query = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  })

  return await fetchCategoryItemBySlug(slug, query)
}

export { fetchDetailCategoryItem }
