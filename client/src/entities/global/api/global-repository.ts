"use server"

import { GlobalBase, GlobalItemResponse } from "@/entities/global/model"
import { ErrorUtils } from "@/shared/lib/error"
import { DocumentServices } from "@/shared/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"
import qs from "qs"

const fetchGlobalItem = async (
  queryObj?: StrapiQuery<GlobalBase>,
  tags?: string[]
) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await fetch(
      `${process.env.API_URL}/api/global?${new URLSearchParams(query)}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
        next: {
          tags: ["global", ...(tags || [])],
        },
      }
    )

    return (await response.json()) as GlobalItemResponse<
      GlobalBase & DocumentServices
    >
  } catch (e) {
    const error = await ErrorUtils.getErrors(e)
    throw error[0]
  }
}

export { fetchGlobalItem }
