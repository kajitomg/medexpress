import { getPaginationRange } from "@/shared/lib/get-pagination-range"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination"
import React, { ComponentProps, useMemo } from "react"

interface PaginationControlProps {
  page: number
  setPage: (page: number) => void
  maxPages: number
}

const PaginationControl = ({
  setPage,
  maxPages,
  page,
  ...props
}: ComponentProps<"nav"> & PaginationControlProps) => {
  const paginationRange = useMemo(
    () => getPaginationRange(page, maxPages || page),
    [maxPages, page]
  )
  const handlePrevious = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (page < maxPages) {
      setPage(page + 1)
    }
  }

  const handlePageClick = (
    item: number,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault()
    if (page !== item) {
      setPage(item)
    }
  }

  return (
    <Pagination {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={page <= 1}
            className={page <= 1 ? "pointer-events-none opacity-50" : undefined}
            onClick={handlePrevious}
          />
        </PaginationItem>
        {paginationRange.map((item, i) =>
          item ? (
            <PaginationItem key={"null" + item}>
              <PaginationLink
                onClick={(e) => handlePageClick(item, e)}
                isActive={page === item}
                className="cursor-pointer"
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={i + 1}>
              <PaginationEllipsis />
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={maxPages ? page >= maxPages : true}
            className={
              page >= maxPages ? "pointer-events-none opacity-50" : undefined
            }
            onClick={handleNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export { PaginationControl }
