"use server"

import { fetchCategoriesList } from "@/entities/category/api"
import qs from "qs"

const fetchCatalogCategoriesList = async (search?: string) => {
  const queryObj = {
    pagination: {
      start: 0,
      limit: 500,
    },
    filters: {
      parent: {
        $null: true,
      },
      $or: [] as Record<string, unknown>[],
    },
    populate: {
      childrens: true,
      media: true,
    },
  }
  if (search) {
    queryObj.filters.$or.push(
      // $containsi не работает с нынешней кодировкой БД
      { title: { $contains: search } },
      { description: { $contains: search } },
      { code: { $contains: search } },
      { childrens: { title: { $contains: search } } },
      { childrens: { description: { $contains: search } } },
      { childrens: { code: { $contains: search } } }
    )
  }

  const query = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  })

  return await fetchCategoriesList(query)
}

export { fetchCatalogCategoriesList }
