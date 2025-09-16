import { fetchPageItemBySlug } from "@/entities/page/api"
import { PageBase } from "@/entities/page/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"

const fetchPage = async (slug: string) => {
  const queryObj = {
    populate: {
      sections: {
        populate: "*",
        on: {
          "sections.list-section": {
            populate: {
              items: {
                populate: "*",
              },
            },
          },
          "sections.gallery-section": {
            populate: {
              items: {
                populate: "*",
              },
            },
          },
          "sections.hero": {
            populate: {
              picture: {
                populate: "*",
              },
            },
          },
          "shared.rich-text": true,
          "shared.contact-form": true,
          "elements.about-hero": {
            populate: {
              poster: {
                populate: "*",
              },
            },
          },
          "sections.contact-form": {
            populate: {
              contactForm: {
                populate: "*",
              },
              email: {
                populate: "*",
              },
              phonenumber: {
                populate: "*",
              },
            },
          },
          "elements.contacts-details": {
            populate: {
              phonenumber: {
                populate: "*",
              },
              email: {
                populate: "*",
              },
              address: {
                populate: "*",
              },
              workingSchedule: {
                populate: {
                  body: {
                    populate: "*",
                  },
                },
              },
              social: {
                populate: {
                  body: {
                    populate: "*",
                  },
                },
              },
            },
          },
          "elements.main-page-services": {
            populate: "*",
          },
          "elements.about-info": {
            populate: {
              items: {
                populate: "*",
              },
            },
          },
          "elements.footer-contacts": true,
          "elements.header-contacts": true,
          "elements.main-page-hero": true,
        },
      },
      seo: true,
    },
  } satisfies StrapiQuery<PageBase>

  return await fetchPageItemBySlug(slug, queryObj)
}

export { fetchPage }
