"use server"

import { fetchCollectionsList } from "@/entities/collection/api"
import { CollectionBase } from "@/entities/collection/model"
import { StrapiQuery } from "@/shared/model/strapi"

const fetchNavigationCollectionsList = async () => {
  const queryObj = {
    fields: ["title", "slug"],
    pagination: {
      start: 0,
      limit: 500,
    },
    populate: {
      media: true,
    },
  } satisfies StrapiQuery<CollectionBase>

  return await fetchCollectionsList(queryObj)
}

export { fetchNavigationCollectionsList }
