"use server"

import { HeaderBase, HeaderItemResponse } from "@/entities/header/model"
import { api } from "@/shared/api/api"
import { ErrorUtils } from "@/shared/lib/error"
import { DocumentServices } from "@/shared/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"
import qs from "qs"

const fetchHeaderItem = async (queryObj?: StrapiQuery<HeaderBase>) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api(`/api/header`, {
      method: "GET",
      params: new URLSearchParams(query),
      next: {
        tags: ["header"],
      },
    })

    return (await response.json()) as HeaderItemResponse<
      HeaderBase & DocumentServices
    >
  } catch (e) {
    const error = await ErrorUtils.getErrors(e)
    throw error[0]
  }
}

export { fetchHeaderItem }
