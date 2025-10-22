import { useCatalogCategoryOptionsStore } from "@/features/catalog/provider"
import { PaginationControl } from "@/shared/ui"
import * as React from "react"
import { ComponentProps } from "react"

const CatalogPaginationControl = ({ ...props }: ComponentProps<"nav">) => {
  const page = useCatalogCategoryOptionsStore((state) => state.pagination.page)
  const maxPages = useCatalogCategoryOptionsStore(
    (state) => state.pagination.maxPages
  )
  const setPage = useCatalogCategoryOptionsStore(
    (state) => state.pagination.setPage
  )

  const handleSetPage = (page: number) => {
    setPage(page)
    window.scroll({ top: 0, behavior: "smooth" })
  }

  return (
    <PaginationControl
      page={page}
      setPage={handleSetPage}
      maxPages={maxPages}
      {...props}
    />
  )
}

export { CatalogPaginationControl }
