"use server"

import { DeviceTypeBase } from "@/entities/device-type/model"
import { api } from "@/shared/api/api"
import { ErrorHandler } from "@/shared/lib/error"
import {
  StrapiItemResponse,
  StrapiListResponse,
  StrapiQuery,
} from "@/shared/model/strapi"
import qs from "qs"

const fetchDeviceTypeList = async (
  queryObj?: StrapiQuery<DeviceTypeBase>,
  tags?: string[]
) => {
  try {
    const query = qs.stringify(queryObj, { encodeValuesOnly: true })

    const response = await api(`/api/device-types`, {
      method: "GET",
      params: new URLSearchParams(query),
      next: {
        tags,
      },
    })

    return (await response.json()) as StrapiListResponse<DeviceTypeBase>
  } catch (e) {
    return ErrorHandler(e, "/api/device-types")
  }
}

const fetchDeviceTypeItemBySlug = async (
  slug: string,
  queryObj?: StrapiQuery<DeviceTypeBase>
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

    const response = await api(`/api/device-types`, {
      method: "GET",
      params: new URLSearchParams(query),
      next: {
        tags: [`device-type::${slug}`],
      },
    })

    const data = (await response.json()) as StrapiListResponse<DeviceTypeBase>

    return {
      data: data.data[0],
    } as StrapiItemResponse<DeviceTypeBase>
  } catch (e) {
    return ErrorHandler(e, "/api/device-types")
  }
}

export { fetchDeviceTypeList, fetchDeviceTypeItemBySlug }
