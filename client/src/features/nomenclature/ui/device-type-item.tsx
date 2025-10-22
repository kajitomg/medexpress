import { DeviceTypeBase } from "@/entities/device-type/model"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { Button } from "@/shared/ui"
import { TableCell, TableRow } from "@/shared/ui/table"
import { ChevronDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { useState } from "react"

interface DeviceTypeItemProps {
  item: DeviceTypeBase
}

const DeviceTypeItem = ({ item }: DeviceTypeItemProps) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <TableRow
      className="relative cursor-pointer"
      onClick={(e) => {
        e.stopPropagation()
        setExpanded(true)
      }}
    >
      <TableCell className="font-medium content-start border border-gray-300 hyphens-auto break-words">
        <div
          className={cn(
            "whitespace-normal text-start p-0 underline hover:no-underline focus:no-underline",
            !expanded && "line-clamp-2"
          )}
        >
          <Link href={routes.NOMENCLATURE(item.slug).path}>{item.code}</Link>
        </div>
      </TableCell>
      <TableCell className="content-start border border-gray-300 hyphens-auto break-words">
        <div className={cn("whitespace-normal", !expanded && "line-clamp-2")}>
          {item.sections?.map((item) => item.code + ". " + item.name).join(" ")}
        </div>
      </TableCell>
      <TableCell className="content-start border border-gray-300 hyphens-auto break-words">
        <div
          className={cn(
            "whitespace-normal text-start p-0 underline hover:no-underline focus:no-underline",
            !expanded && "line-clamp-2"
          )}
        >
          <Link href={routes.NOMENCLATURE(item.slug).path}>{item.name}</Link>
        </div>
      </TableCell>
      <TableCell className="content-start border border-gray-300 hyphens-auto break-words">
        <div className={cn("whitespace-normal", !expanded && "line-clamp-2")}>
          {item.description}
        </div>
      </TableCell>
      <TableCell className="content-start border border-gray-300 hyphens-auto break-words items-end">
        <Button
          size="icon"
          onClick={(e) => {
            e.stopPropagation()
            setExpanded(!expanded)
          }}
          className="cursor-pointer p-0"
        >
          <ChevronDown className={cn(expanded && "rotate-180")} />
        </Button>
        <Button
          size="icon"
          onClick={(e) => {
            e.stopPropagation()
            setExpanded(!expanded)
          }}
          className="cursor-pointer p-0"
        >
          <MoreHorizontal />
        </Button>
      </TableCell>
    </TableRow>
  )
}

export { DeviceTypeItem }
