import { fetchFooterItem } from "@/entities/_single-types/footer/api"
import { FooterBase } from "@/entities/_single-types/footer/model"
import { Query } from "@/shared/model/strapi"

const fetchFooter = async () => {
  const queryObj = {
    populate: {
      sections: {
        on: {
          "elements.footer-contacts": {
            populate: {
              workingSchedule: {
                populate: {
                  body: {
                    populate: "*",
                  },
                  icon: {
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
              address: {
                populate: "*",
              },
            },
          },
          "elements.footer-about": {
            populate: {
              logo: {
                populate: "*",
              },
              social: {
                populate: {
                  body: {
                    populate: "*",
                  },
                  icon: {
                    populate: "*",
                  },
                },
              },
            },
          },
        },
      },
    },
  } satisfies Query<FooterBase>

  return await fetchFooterItem(queryObj)
}

export { fetchFooter }
