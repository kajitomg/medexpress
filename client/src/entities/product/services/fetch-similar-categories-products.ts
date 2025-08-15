"use server"

import { fetchProductsList } from "@/entities/product/api/product-repository"
import qs from "qs"

const fetchSimilarCategoriesProductsList = async (
  slug: string,
  productSlug: string,
  pageSize: number = 10
) => {
  const queryObj = {
    pagination: {
      pageSize,
    },
    filters: {
      $and: [
        {
          categories: {
            slug,
          },
        },
        {
          slug: {
            $not: productSlug,
          },
        },
      ],
    },
    populate: {
      media: true,
    },
  }

  const query = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  })

  return await fetchProductsList(query)
}

export { fetchSimilarCategoriesProductsList }
