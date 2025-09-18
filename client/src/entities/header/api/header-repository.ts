"use server"

import { HeaderBase, HeaderItemResponse } from "@/entities/header/model"
import { ErrorUtils } from "@/shared/lib/error"
import { DocumentServices } from "@/shared/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"
import qs from "qs"

const fetchHeaderItem = async (
  queryObj?: StrapiQuery<HeaderBase>,
  tags?: string[]
) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await fetch(
      `${process.env.API_URL}/api/header?${new URLSearchParams(query)}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
        next: {
          tags: ["header", ...(tags || [])],
        },
      }
    )

    return (await response.json()) as HeaderItemResponse<
      HeaderBase & DocumentServices
    >
  } catch (e) {
    const error = await ErrorUtils.getErrors(e)
    throw error[0]
  }
}

export { fetchHeaderItem }
