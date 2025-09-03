"use server"

import { SettingsBase, SettingsItemResponse } from "@/entities/settings/model"
import { api } from "@/shared/api"
import { ErrorUtils } from "@/shared/lib/error"
import { DocumentServices } from "@/shared/model"
import { StrapiQuery } from "@/shared/model/strapi"
import qs from "qs"

const fetchDefaultSettings = async (queryObj?: StrapiQuery<SettingsBase>) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api<
      SettingsItemResponse<SettingsBase & DocumentServices>
    >(`/api/default-setting`, {
      method: "GET",
      params: new URLSearchParams(query),
    })
    return response.data
  } catch (e) {
    const error = await ErrorUtils.getErrors(e)
    throw error[0]
  }
}

export { fetchDefaultSettings }
