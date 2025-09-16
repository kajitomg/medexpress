import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { RowTextItem } from "@/shared/model/strapi/blocks/row-text-item"
import { Typography } from "@/shared/ui"
import DynamicIcon from "@/shared/ui/dynamic-icon"
import * as React from "react"
import { ComponentProps } from "react"

interface ContentStandOutProps {
  items?: RowTextItem[]
}

const ContentStandOut = ({
  items,
  className,
}: ComponentProps<"div"> & ContentStandOutProps) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-4 ms:gap-2 md:gap-4 sm:grid-cols-2">
        {items?.map((item) => {
          return (
            <div
              key={item.id}
              className="grid items-center gap-2 lg:gap-4 content-start justify-start"
            >
              <DynamicIcon
                url={imageUrlBuilder(item.icon?.url)}
                className="size-5 md:size-6"
              />
              <Typography asChild variant="h4" className="col-start-2">
                <h4>{item.title}</h4>
              </Typography>
              <Typography variant="muted" className="col-start-2">
                {item.content}
              </Typography>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { ContentStandOut }
