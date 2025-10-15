"use server"

import { fetchCategoryItemBySlug } from "@/entities/category/api"
import { CategoryBase } from "@/entities/category/model"
import { Query } from "@/shared/model/strapi"

const fetchDetailCategoryItem = async (slug: string) => {
  const queryObj = {
    populate: {
      image: true,
    },
  } satisfies Query<CategoryBase>

  return await fetchCategoryItemBySlug(slug, queryObj)
}

export { fetchDetailCategoryItem }
