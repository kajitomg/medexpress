"use server"

import { fetchCategoryItemBySlug } from "@/entities/category/api"
import { CategoryBase } from "@/entities/category/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"

const fetchDetailCategoryItem = async (slug: string) => {
  const queryObj = {
    populate: {
      image: true,
    },
  } satisfies StrapiQuery<CategoryBase>

  return await fetchCategoryItemBySlug(slug, queryObj)
}

export { fetchDetailCategoryItem }
