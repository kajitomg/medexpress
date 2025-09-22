"use server"

import { fetchCategoriesList } from "@/entities/category/api"
import { CategoryBase } from "@/entities/category/model"
import { StrapiQuery } from "@/shared/model/strapi/strapi-query"

const fetchCatalogCategoriesListChildrens = async (search?: string) => {
  const queryObj = {
    fields: ["id"],
    filters: {
      parent: {
        $notNull: true,
      },
      $or: [
        { title: { $containsi: search } },
        { description: { $containsi: search } },
        { code: { $containsi: search } },
      ],
    },
    populate: {
      parent: {
        fields: ["id"],
      },
    },
  } satisfies StrapiQuery<CategoryBase>

  return await fetchCategoriesList(queryObj)
}

const fetchCatalogCategoriesListParents = async (search?: string) => {
  const queryObj = {
    fields: ["id"],
    filters: {
      parent: {
        $null: true,
      },
      $or: [
        { title: { $containsi: search } },
        { description: { $containsi: search } },
        { code: { $containsi: search } },
      ],
    },
  } satisfies StrapiQuery<CategoryBase>

  return await fetchCategoriesList(queryObj)
}

const fetchCatalogCategoriesList = async (search?: string) => {
  const queryObj = {
    filters: {
      id: { $in: new Array(0), $null: false as boolean },
      parent: {
        $null: true,
      },
    },
    populate: {
      childrens: true,
      media: true,
    },
  } satisfies StrapiQuery<CategoryBase>
  if (search) {
    const childrens = await fetchCatalogCategoriesListChildrens(search)
    const parents = await fetchCatalogCategoriesListParents(search)
    const childrensIds = childrens.data
      .map((child) => child.parent?.id)
      .filter((id) => Boolean(id))
    const parentsIds = parents.data.map((child) => child?.id)
    const ids = [...childrensIds, ...parentsIds]

    if (ids.length) {
      queryObj.filters.id.$in = ids
    } else {
      queryObj.filters.id.$null = true
    }
  }
  const response = await fetchCategoriesList(queryObj)

  response.data.sort((a, b) => +a.code - +b.code)

  return response
}

export { fetchCatalogCategoriesList }
