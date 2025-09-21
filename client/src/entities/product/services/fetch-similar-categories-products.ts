"use server"

import { fetchProductsList } from "@/entities/product/api/product-repository"
import { ProductBase } from "@/entities/product/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"

const fetchSimilarCategoriesProductsList = async (
  slug: string,
  productSlug: string,
  pageSize: number = 10
) => {
  const queryObj = {
    pagination: {
      pageSize,
    },
    filters: {
      $and: [
        {
          categories: {
            slug,
          },
        },
        {
          slug: {
            $not: productSlug,
          },
        },
      ],
    },
    populate: {
      media: true,
    },
  } satisfies StrapiQuery<ProductBase>

  return await fetchProductsList(queryObj, [`category::${slug}`])
}

export { fetchSimilarCategoriesProductsList }
