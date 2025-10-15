import { fetchGlobalItem } from "@/entities/_single-types/global/api"
import { GlobalBase } from "@/entities/_single-types/global/model"
import { Query } from "@/shared/model/strapi"

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
  } satisfies Query<GlobalBase>

  return await fetchGlobalItem(queryObj)
}

export { fetchGlobal }
