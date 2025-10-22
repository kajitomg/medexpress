"use server"

import { GlobalBase } from "@/entities/_single-types/global/model"
import { api } from "@/shared/api/api"
import { ErrorHandler } from "@/shared/lib/error"
import { StrapiItemResponse, StrapiQuery } from "@/shared/model/strapi"
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

    return (await response.json()) as StrapiItemResponse<GlobalBase>
  } catch (e) {
    return ErrorHandler(e, "/api/global")
  }
}

export { fetchGlobalItem }
