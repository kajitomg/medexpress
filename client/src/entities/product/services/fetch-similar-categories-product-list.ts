"use server"

import { fetchProductList } from "@/entities/product/api/product-repository"
import { ProductBase } from "@/entities/product/model"
import { Query } from "@/shared/model/strapi"

const fetchSimilarCategoriesProductsList = async (
  categorySlug: string,
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
            slug: categorySlug,
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
      images: true,
    },
  } satisfies Query<ProductBase>

  return await fetchProductList(queryObj, [`category::${categorySlug}`])
}

export { fetchSimilarCategoriesProductsList }
