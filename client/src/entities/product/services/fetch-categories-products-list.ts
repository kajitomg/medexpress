"use server"

import { fetchProductsList } from "@/entities/product/api/product-repository"
import { ProductBase } from "@/entities/product/model"
import { StrapiQuery } from "@/shared/model/strapi"

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
  } satisfies StrapiQuery<ProductBase>
  if (search) {
    queryObj.filters.$or.push(
      { title: { $containsi: search } },
      { description: { $containsi: search } },
      { code: { $containsi: search } }
    )
  }

  return await fetchProductsList(queryObj)
}

export { fetchCategoriesProductsList }
