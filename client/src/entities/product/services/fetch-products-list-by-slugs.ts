"use server"

import { fetchProductsList } from "@/entities/product/api/product-repository"
import { ProductBase } from "@/entities/product/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"

const fetchProductsListBySlugs = async (slugs: string[], page: number) => {
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
      categories: {
        fields: ["id", "title", "description", "slug"],
      },
      collections: {
        fields: ["id", "slug", "title"],
      },
      media: true,
    },
  } satisfies StrapiQuery<ProductBase>

  return await fetchProductsList(
    queryObj,
    slugs.map((slug) => `product::${slug}`)
  )
}

export { fetchProductsListBySlugs }
