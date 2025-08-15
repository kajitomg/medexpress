"use server"

import { fetchProductsList } from "@/entities/product/api/product-repository"
import qs from "qs"

const fetchCategoriesProductsList = async (
  slug: string,
  page: number,
  search?: string
) => {
  const queryObj = {
    pagination: {
      page,
      pageSize: 60,
      withCount: true,
    },
    filters: {
      categories: {
        slug: {
          $in: slug,
        },
      },
      $or: [] as Record<string, unknown>[],
    },
    populate: {
      categories: {
        fields: ["id", "code"],
      },
      media: true,
    },
  }
  if (search) {
    queryObj.filters.$or.push(
      { title: { $containsi: search } },
      { description: { $containsi: search } },
      { code: { $containsi: search } }
    )
  }

  const query = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  })

  return await fetchProductsList(query)
}

export { fetchCategoriesProductsList }
