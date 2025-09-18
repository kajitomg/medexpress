"use server"

import { FooterBase, FooterItemResponse } from "@/entities/footer/model"
import { ErrorUtils } from "@/shared/lib/error"
import { DocumentServices } from "@/shared/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"
import qs from "qs"

const fetchFooterItem = async (
  queryObj?: StrapiQuery<FooterBase>,
  tags?: string[]
) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await fetch(
      `${process.env.API_URL}/api/footer?${new URLSearchParams(query)}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
        next: {
          tags: ["footer", ...(tags || [])],
        },
      }
    )

    return (await response.json()) as FooterItemResponse<
      FooterBase & DocumentServices
    >
  } catch (e) {
    const error = await ErrorUtils.getErrors(e)
    throw error[0]
  }
}

export { fetchFooterItem }
