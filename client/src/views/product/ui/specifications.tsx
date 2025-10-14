import { ProductSpecification } from "@/entities/product/model/product"
import { cn } from "@/shared/lib"
import { Typography } from "@/shared/ui"
import { Table, TableBody, TableCell, TableRow } from "@/shared/ui/table"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import * as React from "react"
import { ReactNode } from "react"

interface SpecificationsProps {
  items?: ProductSpecification[]
}

type TypeT = {
  type: string
  value?: string | React.JSX.Element | ReactNode
}

export const columns: ColumnDef<TypeT>[] = [
  {
    accessorKey: "type",
    cell: ({ row }) => (
      <Typography className="text-foreground">
        {row.getValue("type")}
      </Typography>
    ),
  },
  {
    accessorKey: "value",
    accessorFn: (row) =>
      typeof row.value === "string" ? (
        <Typography>{row.value}</Typography>
      ) : (
        row.value
      ),
    cell: (cell) => cell.getValue(),
  },
]

const Specifications = ({ items }: SpecificationsProps) => {
  const data =
    items?.map((item) => {
      const tmp: TypeT = { type: item?.type?.name, value: "" }

      switch (item.type?.type) {
        case "text": {
          tmp.value = item.bodyText
          break
        }
        case "number": {
          tmp.value = item.bodyNumber + item.type?.units
          break
        }
        case "boolean": {
          tmp.value = item.bodyBoolean ? "Да" : "Нет"
          break
        }
        case "list": {
          console.log(item)
          tmp.value = item.bodyList?.map((item) => item.value).join(", ")
          break
        }
      }
      return tmp
    }) || []

  const table = useReactTable({
    data,
    getCoreRowModel: getCoreRowModel(),
    columns,
    manualPagination: true,
  })
  return (
    <div>
      <Table className="mt-2">
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
                      className={cn(
                        "bg-background content-start items-start p-2 sm:p-4 md:p-5 whitespace-normal border"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
    </div>
  )
}

export { Specifications }
