import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination"

interface CatalogPaginationProps {
  page: number
  setPage: (page: number) => void
  maxPages: number
  paginationRange: (number | null)[]
}

const CatalogPagination = ({
  setPage,
  maxPages,
  page,
  paginationRange,
}: CatalogPaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={page <= 1}
            className={page <= 1 ? "pointer-events-none opacity-50" : undefined}
            onClick={() => page > 1 && setPage(page - 1)}
          />
        </PaginationItem>
        {paginationRange.map((item, i) =>
          item ? (
            <PaginationItem key={"null" + item}>
              <PaginationLink
                onClick={() => page !== item && setPage(item)}
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
            onClick={() => page < maxPages && setPage(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export { CatalogPagination }
