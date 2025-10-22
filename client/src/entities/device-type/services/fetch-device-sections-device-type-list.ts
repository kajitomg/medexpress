"use server"

import { fetchDeviceTypeList } from "@/entities/device-type/api"
import { DeviceTypeBase } from "@/entities/device-type/model"
import { StrapiQuery } from "@/shared/model/strapi"

const fetchDeviceSectionsDeviceTypeList = async (
  slug?: string,
  page: number = 1,
  search?: string
) => {
  const queryObj = {
    pagination: {
      page,
      pageSize: 60,
      withCount: true,
    },
    filters: {
      sections: {
        slug: {
          $in: slug,
        },
      },
      ...(search && {
        $or: [
          { code: { $containsi: search } },
          { name: { $containsi: search } },
          { description: { $containsi: search } },
        ],
      }),
    },
    populate: {
      sections: true,
    },
  } satisfies StrapiQuery<DeviceTypeBase>

  return await fetchDeviceTypeList(queryObj, [`device-section::${slug}`])
}

export { fetchDeviceSectionsDeviceTypeList }
