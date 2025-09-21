"use server"

import { FooterBase, FooterItemResponse } from "@/entities/footer/model"
import { api } from "@/shared/api/api"
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

    const response = await api(`/api/footer`, {
      method: "GET",
      params: new URLSearchParams(query),
      next: {
        tags: ["footer", ...(tags || [])],
      },
    })

    return (await response.json()) as FooterItemResponse<
      FooterBase & DocumentServices
    >
  } catch (e) {
    const error = await ErrorUtils.getErrors(e)
    throw error[0]
  }
}

export { fetchFooterItem }
