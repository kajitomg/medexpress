"use server"

import { fetchCollectionsList } from "@/entities/collection/api"
import { CollectionBase } from "@/entities/collection/model"
import { StrapiQuery } from "@/shared/model/strapi"

const fetchCatalogCollectionsList = async (search?: string) => {
  const queryObj = {
    fields: ["title", "slug"],
    pagination: {
      start: 0,
      limit: 500,
    },
    filters: {
      $or: [] as Record<string, unknown>[],
    },
    populate: {
      products: { fields: ["id"] },
      media: true,
    },
  } satisfies StrapiQuery<CollectionBase>

  if (search) {
    queryObj.filters.$or.push(
      { title: { $containsi: search } },
      { description: { $containsi: search } }
    )
  }

  return await fetchCollectionsList(queryObj)
}

export { fetchCatalogCollectionsList }
