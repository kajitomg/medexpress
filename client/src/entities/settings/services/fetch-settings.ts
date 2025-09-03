import { fetchDefaultSettings } from "@/entities/settings/api"
import { SettingsBase } from "@/entities/settings/model"
import { StrapiQuery } from "@/shared/model/strapi"

const fetchSettings = async () => {
  const queryObj = {
    populate: {
      category_default_media: true,
      collection_default_media: true,
      product_default_media: true,
    },
  } satisfies StrapiQuery<SettingsBase>

  return await fetchDefaultSettings(queryObj)
}

export { fetchSettings }
