"use client"

import { cn } from "@/shared/lib"
import { ContactFormSection } from "@/shared/model/strapi/sections/contact-form-section"
import { Typography } from "@/shared/ui"
import { Mail, Phone } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { ComponentProps } from "react"
import Markdown from "react-markdown"
import { LocalBusiness, WithContext } from "schema-dts"

interface ContactFormDetailsProps {
  data?: ContactFormSection
}

const localBusiness = (
  contacts?: ContactFormSection
): WithContext<LocalBusiness> => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ООО «Медэкспресс»",
    telephone: contacts?.phonenumber.body.map((item) => item.value),
    email: contacts?.email.body.map((item) => item.value),
  }
}

const ContactFormDetails = ({
  className,
  data,
}: ComponentProps<"div"> & ContactFormDetailsProps) => {
  return (
    <div className={cn("flex flex-col items-center dark", className)}>
      <script
        id="contact-form-contacts"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusiness(data)),
        }}
      />
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
          <div className="grid items-center gap-2 content-start justify-start">
            <Phone className="size-7 md:size-8 text-foreground" />
            <Typography asChild variant="h4">
              <h4 className="col-start-2">Телефон/факс</h4>
            </Typography>
            <div className="col-start-2">
              {data?.phonenumber.body?.map((item) => (
                <Typography
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
            <Mail className="size-7 md:size-8 text-foreground" />
            <Typography asChild variant="h4">
              <h4 className="col-start-2">Почта</h4>
            </Typography>
            <div className="col-start-2">
              {data?.email.body?.map((item) => (
                <Typography
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
