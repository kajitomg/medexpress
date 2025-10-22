"use server"

import { HeaderBase } from "@/entities/_single-types/header/model"
import { api } from "@/shared/api/api"
import { ErrorHandler } from "@/shared/lib/error"
import { StrapiItemResponse, StrapiQuery } from "@/shared/model/strapi"
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

    return (await response.json()) as StrapiItemResponse<HeaderBase>
  } catch (e) {
    return ErrorHandler(e, "/api/header")
  }
}

export { fetchHeaderItem }
