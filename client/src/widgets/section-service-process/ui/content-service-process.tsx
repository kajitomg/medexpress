import { RowTextItem } from "@/entities/_components/blocks/row-text-item"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { Typography } from "@/shared/ui"
import DynamicIcon from "@/shared/ui/dynamic-icon"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionServiceProcessContentProps {
  items?: RowTextItem[]
}

const ContentServiceProcess = ({
  items,
  className,
}: ComponentProps<"div"> & SectionServiceProcessContentProps) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
        {items?.map((item) => (
          <div
            className="flex flex-col items-center gap-2 lg:gap-4"
            key={item.id}
          >
            <div className="relative rounded-full w-16 h-16 bg-background shadow-sm shadow-black">
              <DynamicIcon
                url={imageUrlBuilder(item.icon?.url)}
                className="absolute top-1/2 left-1/2 -translate-1/2 size-6"
              />
            </div>
            <Typography asChild variant="h4" className="col-start-2">
              <h4 className="text-center">{item.title}</h4>
            </Typography>
            <Typography
              variant="muted"
              className="col-start-2 col-start-2 text-center"
            >
              {item.content}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ContentServiceProcess }
