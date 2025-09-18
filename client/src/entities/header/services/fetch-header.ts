import { fetchHeaderItem } from "@/entities/header/api"
import { HeaderBase } from "@/entities/header/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"

const fetchHeader = async (tags?: string[]) => {
  const queryObj = {
    populate: {
      sections: {
        on: {
          "elements.header-contacts": {
            populate: {
              workingSchedule: {
                populate: {
                  body: {
                    populate: "*",
                  },
                },
              },
              email: {
                populate: "*",
              },
              phonenumber: {
                populate: "*",
              },
            },
          },
        },
      },
    },
  } satisfies StrapiQuery<HeaderBase>

  return await fetchHeaderItem(queryObj, tags)
}

export { fetchHeader }
