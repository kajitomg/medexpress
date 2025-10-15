"use server"

import { FooterBase } from "@/entities/_single-types/footer/model"
import { api } from "@/shared/api/api"
import { ErrorHandler } from "@/shared/lib/error"
import { Query, StrapiItemResponse } from "@/shared/model/strapi"
import qs from "qs"

const fetchFooterItem = async (queryObj?: Query<FooterBase>) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api(`/api/footer`, {
      method: "GET",
      params: new URLSearchParams(query),
      next: {
        tags: ["footer"],
      },
    })

    return (await response.json()) as StrapiItemResponse<FooterBase>
  } catch (e) {
    return ErrorHandler(e, "/api/footer")
  }
}

export { fetchFooterItem }
