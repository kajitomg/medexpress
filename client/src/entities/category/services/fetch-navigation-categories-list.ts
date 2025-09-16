"use server"

import { fetchCategoriesList } from "@/entities/category/api"
import { CategoryBase } from "@/entities/category/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"

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
  } satisfies StrapiQuery<CategoryBase>

  return await fetchCategoriesList(queryObj)
}

export { fetchNavigationCategoriesList }
