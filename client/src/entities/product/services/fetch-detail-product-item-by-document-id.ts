"use server"

import { fetchProductItem } from "@/entities/product/api"
import qs from "qs"

const fetchDetailProductItemByDocumentId = async (documentId: string) => {
  const queryObj = {
    populate: {
      categories: {
        fields: ["id", "title", "code", "slug"],
      },
      media: true,
    },
  }

  const query = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  })

  return await fetchProductItem(documentId, query)
}

export { fetchDetailProductItemByDocumentId }
