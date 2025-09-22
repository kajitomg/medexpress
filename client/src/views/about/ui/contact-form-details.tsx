import { cn } from "@/shared/lib"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { ContactFormSection } from "@/shared/model/strapi/sections/contact-form-section"
import { Typography } from "@/shared/ui"
import DynamicIcon from "@/shared/ui/dynamic-icon"
import Link from "next/link"
import * as React from "react"
import { ComponentProps } from "react"
import Markdown from "react-markdown"

interface ContactFormDetailsProps {
  data?: ContactFormSection
}

const ContactFormDetails = ({
  className,
  data,
}: ComponentProps<"div"> & ContactFormDetailsProps) => {
  return (
    <div className={cn("flex flex-col items-center dark", className)}>
      <Typography
        variant="display"
        className="font-black cursor-default hover-scale text-center xl:text-left"
      >
        <strong>
          <Markdown
            components={{
              strong: (data) => <span className="text-gray-300/70" {...data} />,
              p: ({ children }) => <>{children}</>,
            }}
          >
            {data?.display}
          </Markdown>
        </strong>
      </Typography>
      <div className="mt-8 max-w-md xl:max-w-full w-full">
        <div className="flex flex-col items-start gap-2">
          <div
            itemScope
            itemType="https://schema.org/Organization"
            className="grid items-center gap-2 content-start justify-start"
          >
            <DynamicIcon
              url={imageUrlBuilder(data?.phonenumber.icon?.url)}
              className="size-7 md:size-8 text-foreground"
            />
            <Typography asChild variant="h4">
              <h4 className="col-start-2">{data?.phonenumber.title}</h4>
            </Typography>
            <div className="col-start-2">
              {data?.phonenumber.body?.map((item) => (
                <Typography
                  itemProp="telephone"
                  key={item.id}
                  variant="muted"
                  className="text-foreground"
                >
                  <Link href={`tel:${item.value}`}>{item.value}</Link>
                </Typography>
              ))}
            </div>
          </div>
          <div className="grid items-center gap-2 content-start justify-start">
            <DynamicIcon
              url={imageUrlBuilder(data?.email.icon?.url)}
              className="size-7 md:size-8 text-foreground"
            />
            <Typography asChild variant="h4">
              <h4 className="col-start-2">{data?.email.title}</h4>
            </Typography>

            <div className="col-start-2">
              {data?.email.body?.map((item) => (
                <Typography
                  itemProp="email"
                  key={item.id}
                  variant="muted"
                  className="text-foreground col-start-2"
                >
                  <Link href={`mailto:${item.value}`}>{item.value}</Link>
                </Typography>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ContactFormDetails }
