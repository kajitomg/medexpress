"use client"

import { useCatalogCategoryOptionsStore } from "@/features/catalog/provider"
import { SearchControl } from "@/features/search/ui"

const CatalogSearchControl = () => {
  const query = useCatalogCategoryOptionsStore((state) => state.search.query)
  const setQuery = useCatalogCategoryOptionsStore(
    (state) => state.search.setQuery
  )

  return <SearchControl setSearch={setQuery} search={query} />
}

export { CatalogSearchControl }
