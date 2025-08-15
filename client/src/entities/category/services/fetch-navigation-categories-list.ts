"use server"

import { fetchCategoriesList } from "@/entities/category/api"
import qs from "qs"

const fetchNavigationCategoriesList = async () => {
  const queryObj = {
    fields: ["code", "title", "slug"],
    pagination: {
      start: 0,
      limit: 500,
    },
    filters: {
      parent: {
        $null: true,
      },
    },
    populate: {
      childrens: {
        fields: ["code", "title", "slug"],
      },
      media: true,
    },
  }

  const query = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  })

  return await fetchCategoriesList(query)
}

export { fetchNavigationCategoriesList }
