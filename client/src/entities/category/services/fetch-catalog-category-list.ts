"use server"

import { fetchCategoryList } from "@/entities/category/api"
import { CategoryBase } from "@/entities/category/model"
import { StrapiQuery } from "@/shared/model/strapi"

const fetchCatalogCategoryList = async (page: number = 1, search?: string) => {
  const queryObj = {
    fields: ["name", "slug"],
    pagination: {
      page,
      pageSize: 60,
      withCount: true,
    },
    filters: {
      ...(search && {
        $or: [{ name: { $containsi: search } }],
      }),
    },
    populate: {
      products: { fields: ["id"] },
      image: true,
    },
  } satisfies StrapiQuery<CategoryBase>

  return await fetchCategoryList(queryObj)
}

export { fetchCatalogCategoryList }
