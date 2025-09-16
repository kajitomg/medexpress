"use server"

import { GlobalBase, GlobalItemResponse } from "@/entities/global/model"
import { api } from "@/shared/api"
import { ErrorUtils } from "@/shared/lib/error"
import { DocumentServices } from "@/shared/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"
import qs from "qs"

const fetchGlobalItem = async (queryObj?: StrapiQuery<GlobalBase>) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api<
      GlobalItemResponse<GlobalBase & DocumentServices>
    >(`/api/global`, {
      method: "GET",
      params: new URLSearchParams(query),
    })

    return response.data
  } catch (e) {
    const error = await ErrorUtils.getErrors(e)
    throw error[0]
  }
}

export { fetchGlobalItem }
