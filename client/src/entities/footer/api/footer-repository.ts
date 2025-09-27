"use server"

import { FooterBase, FooterItemResponse } from "@/entities/footer/model"
import { api } from "@/shared/api/api"
import { ErrorHandler } from "@/shared/lib/error"
import { DocumentServices } from "@/shared/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"
import qs from "qs"

const fetchFooterItem = async (queryObj?: StrapiQuery<FooterBase>) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api(`/api/footer`, {
      method: "GET",
      params: new URLSearchParams(query),
      next: {
        tags: ["footer"],
      },
    })

    return (await response.json()) as FooterItemResponse<
      FooterBase & DocumentServices
    >
  } catch (e) {
    return ErrorHandler(e, "/api/footer")
  }
}

export { fetchFooterItem }
