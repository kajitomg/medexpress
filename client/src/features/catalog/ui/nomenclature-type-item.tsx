import { DeviceTypeBase } from "@/entities/device-type/model"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { Button, Card, CardContent, Separator, Typography } from "@/shared/ui"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { useState } from "react"

interface NomenclatureTypeItemProps {
  item: DeviceTypeBase & DocumentServices
}

const NomenclatureTypeItem = ({ item }: NomenclatureTypeItemProps) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card
      onClick={() => setExpanded(!expanded)}
      className="group relative shadow-black/20 hover:shadow-md transition-all duration-200 from-muted/50 to-muted h-full w-full rounded-md bg-linear-to-b outline-hidden select-none focus:shadow-md"
    >
      <CardContent className="flex gap-2 flex-col sm:flex-row">
        <div className="flex-none basis-20 flex items-start justify-center">
          <Typography target="card">
            <strong>{item.code}</strong>
          </Typography>
        </div>
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-auto"
        />
        <div className={cn(!expanded && "line-clamp-2", "flex-none basis-50")}>
          {item.sections?.map((item) => (
            <Button
              asChild
              variant="link"
              key={item.slug}
              className="whitespace-normal h-auto w-full p-0 justify-start"
            >
              <Link href={routes.NOMENCLATURE(item.slug).path}>
                <Typography target="card">
                  {item.code + ". " + item.name}
                </Typography>
              </Link>
            </Button>
          ))}
        </div>
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-auto"
        />
        <div className="flex-none basis-40 flex items-start justify-center">
          <Typography target="card">{item.name}</Typography>
        </div>
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-auto"
        />
        <div className="flex flex-col justify-end items-end gap-2">
          <Typography className={cn(!expanded && "line-clamp-6")} target="card">
            {item.description}
          </Typography>
          <Button className="cursor-pointer" size="sm" variant="brand"></Button>
        </div>
      </CardContent>
      <div
        className={cn(
          "group-hover:flex group-active:flex hidden absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10 justify-center items-center",
          expanded && "flex"
        )}
      >
        <Button className="cursor-pointer" size="sm" variant="brand">
          <ChevronDown className={cn(expanded && "rotate-180")} />
        </Button>
      </div>
    </Card>
  )
}

export { NomenclatureTypeItem }
