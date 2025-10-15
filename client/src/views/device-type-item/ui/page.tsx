"use client"

import { DeviceTypeBase } from "@/entities/device-type/model"
import { useDeviceTypeDetailsStore } from "@/features/device-type-details/provider"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { ContentSection, ContentSectionContent, Typography } from "@/shared/ui"
import { Table, TableBody, TableCell, TableRow } from "@/shared/ui/table"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import Link from "next/link"
import * as React from "react"
import { ReactNode } from "react"

const Type = ({ type }: { type?: DeviceTypeBase & DocumentServices }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {type?.sections?.map((item) => (
        <Typography
          asChild
          variant="link"
          key={item.slug}
          className="whitespace-normal hover:no-underline text-start"
        >
          <Link href={routes.NOMENCLATURE().path}>
            {item.code}. {item.name}
          </Link>
        </Typography>
      ))}
    </div>
  )
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

const Page = () => {
  const type = useDeviceTypeDetailsStore((state) => state.item)
  const table = useReactTable({
    data: [
      { type: "Наименование:", value: type?.name },
      { type: "Код:", value: type?.code },
      {
        type: "Раздел:",
        value: <Type type={type} />,
      },
      { type: "Описание:", value: type?.description || undefined },
    ],
    getCoreRowModel: getCoreRowModel(),
    columns,
    manualPagination: true,
  })
  return (
    <>
      <PageHeroRoutes page={routes.NOMENCLATURE(type?.slug, type?.name)} />
      <ContentSection>
        <ContentSectionContent className="max-w-380 w-full">
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
                            "bg-background content-start items-start p-2 sm:p-4 md:p-5 whitespace-normal"
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
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ContentSectionContent>
      </ContentSection>
    </>
  )
}

export { Page }
