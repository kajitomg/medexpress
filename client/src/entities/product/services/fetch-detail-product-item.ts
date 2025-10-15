"use server"

import { fetchProductItemBySlug } from "@/entities/product/api"
import { ProductBase } from "@/entities/product/model"
import { Query } from "@/shared/model/strapi"

const fetchDetailProductItem = async (slug: string) => {
  const queryObj = {
    populate: {
      type: true,
      price: {
        sort: ["createdAt:desc"],
        populate: {
          currency: true,
        },
      },
      categories: true,
      images: true,
      specifications: {
        populate: {
          type: true,
          bodyList: true,
        },
      },
    },
  } satisfies Query<ProductBase>

  return await fetchProductItemBySlug(slug, queryObj)
}

export { fetchDetailProductItem }
