"use server"

import { fetchDeviceSectionList } from "@/entities/device-section/api"
import { DeviceSectionBase } from "@/entities/device-section/model"
import { Query } from "@/shared/model/strapi"

const fetchAsideDeviceSectionList = async (slug?: string) => {
  const queryObj = {
    fields: ["slug", "code", "name"],
    pagination: {
      page: 1,
      pageSize: 500,
    },
    sort: ["sort_code"],
    filters: {
      ...(slug
        ? {
            parent: {
              slug,
            },
          }
        : { parent: { $null: true } }),
    },
    populate: {
      parent: {
        fields: ["slug"],
      },
      childrens: {
        sort: ["sort_code"],
        populate: {
          parent: {
            fields: ["slug"],
          },
          childrens: {
            sort: ["sort_code"],
            populate: {
              parent: {
                fields: ["slug"],
              },
            },
          },
        },
      },
    },
  } satisfies Query<DeviceSectionBase>

  return await fetchDeviceSectionList(queryObj, [
    slug ? `device-section::${slug}` : "device-section",
  ])
}

export { fetchAsideDeviceSectionList }
