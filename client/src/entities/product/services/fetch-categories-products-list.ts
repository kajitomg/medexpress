"use server"

import { fetchProductsList } from "@/entities/product/api/product-repository"
import { DocumentId } from "@/shared/model"
import qs from "qs"

const fetchCategoriesProductsList = async (
  categoryId: DocumentId,
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
        $in: categoryId,
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
      { title: { $contains: search } },
      { description: { $contains: search } },
      { code: { $contains: search } }
    )
  }

  const query = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  })

  return await fetchProductsList(query)
}

export { fetchCategoriesProductsList }
