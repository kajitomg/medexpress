"use server"

import { FooterBase, FooterItemResponse } from "@/entities/footer/model"
import { api } from "@/shared/api"
import { ErrorUtils } from "@/shared/lib/error"
import { DocumentServices } from "@/shared/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"
import qs from "qs"

const fetchFooterItem = async (queryObj?: StrapiQuery<FooterBase>) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api<
      FooterItemResponse<FooterBase & DocumentServices>
    >(`/api/footer`, {
      method: "GET",
      params: new URLSearchParams(query),
    })
    return response.data
  } catch (e) {
    const error = await ErrorUtils.getErrors(e)
    throw error[0]
  }
}

export { fetchFooterItem }
