"use server"

import { fetchProductList } from "@/entities/product/api"
import { ProductBase } from "@/entities/product/model"
import { StrapiQuery } from "@/shared/model/strapi"

const fetchCategoriesProductList = async (
  slug: string,
  page: number,
  search?: string
) => {
  const queryObj = {
    pagination: {
      page,
      pageSize: 60,
      withCount: true,
    },
    filters: {
      categories: {
        slug: {
          $in: slug,
        },
      },
      ...(search && {
        $or: [
          { name: { $containsi: search } },
          { description: { $containsi: search } },
        ],
      }),
    },
    populate: {
      categories: {
        fields: ["id", "name", "slug"],
      },
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

  return await fetchProductList(queryObj, [`category::${slug}`])
}

export { fetchCategoriesProductList }
