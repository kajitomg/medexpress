"use server"

import { fetchProductItem } from "@/entities/product/api/product-repository"
import qs from "qs"

const fetchDetailProductItem = async (documentId: string) => {
  const queryObj = {
    populate: {
      media: true,
    },
  }

  const query = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  })

  return await fetchProductItem(documentId, query)
}

export { fetchDetailProductItem }
