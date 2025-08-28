"use server"

import { fetchProductItemBySlug } from "@/entities/product/api"
import { ProductBase } from "@/entities/product/model"
import { StrapiQuery } from "@/shared/model/strapi"

const fetchDetailProductItemBySlug = async (slug: string) => {
  const queryObj = {
    populate: {
      categories: {
        fields: ["id", "title", "slug"],
      },
      collections: {
        fields: ["id", "slug"],
      },
      media: true,
    },
  } satisfies StrapiQuery<ProductBase>

  return await fetchProductItemBySlug(slug, queryObj)
}

export { fetchDetailProductItemBySlug }
