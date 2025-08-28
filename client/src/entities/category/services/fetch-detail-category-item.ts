"use server"

import { fetchCategoryItemBySlug } from "@/entities/category/api"
import { CategoryBase } from "@/entities/category/model"
import { StrapiQuery } from "@/shared/model/strapi"

const fetchDetailCategoryItem = async (slug: string) => {
  const queryObj = {
    fields: ["id", "title", "code", "slug"],
    populate: {
      media: true,
    },
  } satisfies StrapiQuery<CategoryBase>

  return await fetchCategoryItemBySlug(slug, queryObj)
}

export { fetchDetailCategoryItem }
