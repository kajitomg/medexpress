"use server"

import { fetchProductList } from "@/entities/product/api/product-repository"
import { ProductBase } from "@/entities/product/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"

const fetchProductListBySlug = async (slugs: string[], page: number) => {
  const queryObj = {
    pagination: {
      page,
      pageSize: 60,
      withCount: true,
    },
    filters: {
      slug: {
        $in: slugs,
      },
    },
    populate: {
      categories: true,
      specifications: true,
      price: {
        sort: ["createdAt:desc"],
        populate: {
          currency: true,
        },
      },
      type: true,
      images: true,
    },
  } satisfies StrapiQuery<ProductBase>

  return await fetchProductList(
    queryObj,
    slugs.map((slug) => `product::${slug}`)
  )
}

export { fetchProductListBySlug }
