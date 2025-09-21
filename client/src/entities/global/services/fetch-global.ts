import { fetchGlobalItem } from "@/entities/global/api"
import { GlobalBase } from "@/entities/global/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"

const fetchGlobal = async () => {
  const queryObj = {
    populate: {
      seo: true,
      robots: true,
      favicon: true,
      sitemap: true,
      defaultCategoryImage: true,
      defaultCollectionImage: true,
      defaultProductImage: true,
    },
  } satisfies StrapiQuery<GlobalBase>

  return await fetchGlobalItem(queryObj)
}

export { fetchGlobal }
