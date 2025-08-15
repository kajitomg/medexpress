"use server"

import { fetchCategoriesList } from "@/entities/category/api"
import qs from "qs"

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
  }

  const query = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  })

  return await fetchCategoriesList(query)
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
  }

  const query = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  })

  return await fetchCategoriesList(query)
}

const fetchCatalogCategoriesList = async (search?: string) => {
  const queryObj: Record<string, any> = {
    filters: {
      id: {},
      parent: {
        $null: true,
      },
    },
    populate: {
      childrens: true,
      media: true,
    },
  }

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

  const query = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  })

  return await fetchCategoriesList(query)
}

export { fetchCatalogCategoriesList }
