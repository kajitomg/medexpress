"use server"

import { fetchProductItem } from "@/entities/product/api"
import { ProductBase } from "@/entities/product/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"

const fetchDetailProductItemByDocumentId = async (documentId: string) => {
  const queryObj = {
    populate: {
      categories: {
        fields: ["id", "title", "description", "code", "slug"],
      },
      media: true,
    },
  } satisfies StrapiQuery<ProductBase>

  return await fetchProductItem(documentId, queryObj)
}

export { fetchDetailProductItemByDocumentId }
