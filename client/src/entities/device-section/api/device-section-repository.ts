"use server"

import { DeviceSectionBase } from "@/entities/device-section/model"
import { api } from "@/shared/api/api"
import { ErrorHandler } from "@/shared/lib/error"
import {
  StrapiItemResponse,
  StrapiListResponse,
  StrapiQuery,
} from "@/shared/model/strapi"
import qs from "qs"

const fetchDeviceSectionList = async (
  queryObj?: StrapiQuery<DeviceSectionBase>,
  tags?: string[]
) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api(`/api/device-sections`, {
      method: "GET",
      params: new URLSearchParams(query),
      next: {
        tags: ["device-section", ...(tags ? tags : [])],
      },
    })

    return (await response.json()) as StrapiListResponse<DeviceSectionBase>
  } catch (e) {
    return ErrorHandler(e, "/api/device-sections")
  }
}

const fetchDeviceSectionItemBySlug = async (
  slug: string,
  queryObj?: StrapiQuery<DeviceSectionBase>
) => {
  try {
    queryObj = {
      ...queryObj,
      filters: {
        slug,
        ...queryObj?.filters,
      },
    }
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api(`/api/device-sections`, {
      method: "GET",
      params: new URLSearchParams(query),
      next: {
        tags: [`device-section::${slug}`],
      },
    })

    const data =
      (await response.json()) as StrapiListResponse<DeviceSectionBase>

    return {
      data: data.data[0],
    } as StrapiItemResponse<DeviceSectionBase>
  } catch (e) {
    return ErrorHandler(e, "/api/device-sections")
  }
}

export { fetchDeviceSectionList, fetchDeviceSectionItemBySlug }
