"use server"

import { GlobalBase, GlobalItemResponse } from "@/entities/global/model"
import { api } from "@/shared/api/api"
import { ErrorHandler } from "@/shared/lib/error"
import { DocumentServices } from "@/shared/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"
import qs from "qs"

const fetchGlobalItem = async (queryObj?: StrapiQuery<GlobalBase>) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api(`/api/global`, {
      method: "GET",
      params: new URLSearchParams(query),
      next: {
        tags: ["global"],
      },
    })

    return (await response.json()) as GlobalItemResponse<
      GlobalBase & DocumentServices
    >
  } catch (e) {
    return ErrorHandler(e, "/api/global")
  }
}

export { fetchGlobalItem }
