"use client"

import { DeviceSectionBase } from "@/entities/device-section/model"
import { DeviceTypeBase } from "@/entities/device-type/model"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { Button } from "@/shared/ui"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import {
  Column,
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, ExternalLink } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { ComponentProps, CSSProperties } from "react"

interface ProductsListProps {
  items?: (DeviceTypeBase & DocumentServices)[]
}

export const columns: ColumnDef<DeviceTypeBase & DocumentServices>[] = [
  {
    id: "expand",
    cell: ({ row }) => {
      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={row.getToggleExpandedHandler()}
          className={cn(
            "px-2 cursor-pointer touch-manipulation hover:text-(--color-brand) active:text-(--color-brand)",

            row.getIsExpanded() && "text-(--color-brand)"
          )}
        >
          <ChevronDown
            className={cn("size-5", row.getIsExpanded() && "rotate-180")}
          />
          <span className="sr-only">Expand row</span>
        </Button>
      )
    },
  },
  {
    accessorKey: "code",
    header: "Код",
    cell: ({ row }) => <div>{row.getValue("code")}</div>,
  },
  {
    accessorKey: "name",
    header: "Наименование",
    cell: ({ row }) => (
      <div
        className={cn(
          "whitespace-normal text-start",
          !row.getIsExpanded() && "line-clamp-2"
        )}
      >
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "sections",
    header: "Раздел",
    cell: ({ row }) => (
      <div
        className={cn(
          "whitespace-normal text-start",
          !row.getIsExpanded() && "line-clamp-2"
        )}
      >
        {(row.getValue("sections") as DeviceSectionBase[])
          ?.map((item) => item.code + ". " + item.name)
          .join(" ")}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Описание",
    cell: ({ row }) => (
      <div
        className={cn(
          "whitespace-normal text-start",
          !row.getIsExpanded() && "line-clamp-2"
        )}
      >
        {row.getValue("description")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const slug: string = row.original.slug

      return (
        <Button
          asChild
          size="icon"
          variant="ghost"
          className="px-2 cursor-pointer touch-manipulation hover:text-(--color-brand) active:text-(--color-brand)"
        >
          <Link href={routes.NOMENCLATURE(slug).path}>
            <ExternalLink className="size-5" />
            <span className="sr-only">Open menu</span>
          </Link>
        </Button>
      )
    },
  },
]
const getCommonPinningStyles = (
  column: Column<DeviceTypeBase & DocumentServices>
): CSSProperties => {
  const isPinned = column.getIsPinned()

  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? "sticky" : "relative",
    zIndex: isPinned ? 1 : 0,
  }
}
const NomenclatureTypeList = ({
  items,
  className,
  ...props
}: ComponentProps<"table"> & ProductsListProps) => {
  const [expanded, setExpanded] = React.useState<ExpandedState>({})

  const table = useReactTable({
    data: items || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
    columnResizeMode: "onChange",
    getRowCanExpand: () => true,
    manualPagination: true,
    state: {
      expanded,
      columnPinning: {
        left: ["expand"],
        right: ["actions"],
      },
    },
  })
  return (
    <Table className={cn("mt-2", className)} {...props}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className={cn("bg-background")}
                  style={{ ...getCommonPinningStyles(header.column) }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell
                    key={cell.id}
                    className={cn("bg-background content-start items-start")}
                    style={{ ...getCommonPinningStyles(cell.column) }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                )
              })}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export { NomenclatureTypeList }
