import { useCatalogOptionsStore } from "@/features/catalog/provider"
import { getPaginationRange } from "@/shared/lib/get-pagination-range"
import { PaginationControl } from "@/shared/ui"
import * as React from "react"
import { ComponentProps, useMemo } from "react"

const CatalogPaginationControl = ({ ...props }: ComponentProps<"nav">) => {
  const page = useCatalogOptionsStore((state) => state.page)
  const maxPages = useCatalogOptionsStore((state) => state.maxPages)
  const setPage = useCatalogOptionsStore((state) => state.setPage)
  const paginationRange = useMemo(
    () => getPaginationRange(page, maxPages || page),
    [maxPages, page]
  )

  const handleSetPage = (page: number) => {
    setPage(page)
    window.scroll({ top: 0, behavior: "smooth" })
  }

  return (
    <PaginationControl
      page={page}
      setPage={handleSetPage}
      paginationRange={paginationRange}
      maxPages={maxPages}
      {...props}
    />
  )
}

export { CatalogPaginationControl }
