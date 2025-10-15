import { fetchHeaderItem } from "@/entities/_single-types/header/api"
import { HeaderBase } from "@/entities/_single-types/header/model"
import { Query } from "@/shared/model/strapi"

const fetchHeader = async () => {
  const queryObj = {
    populate: {
      sections: {
        on: {
          "layout.logo": true,
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
  } satisfies Query<HeaderBase>

  return await fetchHeaderItem(queryObj)
}

export { fetchHeader }
