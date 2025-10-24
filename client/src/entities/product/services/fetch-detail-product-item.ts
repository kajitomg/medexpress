"use server"

import { fetchProductItemBySlug } from "@/entities/product/api"
import { ProductBase } from "@/entities/product/model"
import { StrapiQuery } from "@/shared/model/strapi"

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
      documents: {
        populate: {
          value: true,
        },
      },
      specifications: {
        populate: {
          type: {
            populate: {
              units: true,
            },
          },
          bodyList: true,
        },
      },
    },
  } satisfies StrapiQuery<ProductBase>

  return await fetchProductItemBySlug(slug, queryObj)
}

export { fetchDetailProductItem }
