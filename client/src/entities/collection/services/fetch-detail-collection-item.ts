"use server"

import { fetchCollectionItemBySlug } from "@/entities/collection/api"
import { CollectionBase } from "@/entities/collection/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"

const fetchDetailCollectionItem = async (slug: string) => {
  const queryObj = {
    populate: {
      media: true,
    },
  } satisfies StrapiQuery<CollectionBase>

  return await fetchCollectionItemBySlug(slug, queryObj)
}

export { fetchDetailCollectionItem }
