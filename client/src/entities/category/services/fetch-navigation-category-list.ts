"use server"

import { fetchCategoryList } from "@/entities/category/api"
import { CategoryBase } from "@/entities/category/model"
import { StrapiQuery } from "@/shared/model/strapi"

const fetchNavigationCategoryList = async () => {
  const queryObj = {
    fields: ["name", "slug"],
    pagination: {
      page: 1,
      pageSize: 60,
    },
    populate: {
      image: true,
    },
  } satisfies StrapiQuery<CategoryBase>

  return await fetchCategoryList(queryObj)
}

export { fetchNavigationCategoryList }
