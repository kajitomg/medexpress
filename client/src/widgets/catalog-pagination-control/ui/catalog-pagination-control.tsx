import { PaginationControl } from "@/shared/ui"
import * as React from "react"
import { ComponentProps } from "react"

interface CatalogPaginationControlProps {
  page: number
  setPage: (page: number) => void
  maxPages: number
}

const CatalogPaginationControl = ({
  setPage,
  page,
  ...props
}: ComponentProps<"nav"> & CatalogPaginationControlProps) => {
  const handleSetPage = (page: number) => {
    setPage(page)
    window.scroll({ top: 0, behavior: "smooth" })
  }

  return <PaginationControl page={page} setPage={handleSetPage} {...props} />
}

export { CatalogPaginationControl }
