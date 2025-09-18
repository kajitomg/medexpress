import { fetchFooterItem } from "@/entities/footer/api"
import { FooterBase } from "@/entities/footer/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"

const fetchFooter = async (tags?: string[]) => {
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
  } satisfies StrapiQuery<FooterBase>

  return await fetchFooterItem(queryObj, tags)
}

export { fetchFooter }
