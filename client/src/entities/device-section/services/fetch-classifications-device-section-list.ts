import { fetchDeviceSectionList } from "@/entities/device-section/api"
import { DeviceSectionBase } from "@/entities/device-section/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"

const fetchClassificationsDeviceSectionList = async (
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
      parent: {
        $null: true,
      },
      ...(search && {
        $or: [
          { name: { $containsi: search } },
          { code: { $containsi: search } },
          { childrens: { name: { $containsi: search } } },
          { childrens: { code: { $containsi: search } } },
        ],
      }),
    },
    sort: ["sort_code"],
    populate: {
      childrens: {
        sort: ["sort_code"],
      },
    },
  } satisfies StrapiQuery<DeviceSectionBase>

  return await fetchDeviceSectionList(queryObj)
}

export { fetchClassificationsDeviceSectionList }
