import { formatTime } from "@/shared/lib/format-time"
import { getDaysStringFromArray } from "@/shared/lib/get-days-string-from-array"
import { getWorkingTime } from "@/shared/lib/get-working-time"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { ContactsDetails } from "@/shared/model/strapi/elements/contacts-details"
import {
  Button,
  ContentSection,
  ContentSectionContent,
  Typography,
} from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import DynamicIcon from "@/shared/ui/dynamic-icon"
import Link from "next/link"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionContactsDetailsProps {
  data?: ContactsDetails
}

const SectionContactsDetails = ({
  data,
  className,
}: ComponentProps<"section"> & SectionContactsDetailsProps) => {
  return (
    <ContentSection className={className}>
      <ContentSectionContent className="flex items-center flex-col lg:flex-row gap-4 w-full p-4">
        <div className="flex-1/2 grid grid-cols-2 gap-4 p-4">
          <div className="flex flex-col gap-2">
            <Typography asChild variant="h4">
              <h4 className="col-start-2">{data?.address.title}</h4>
            </Typography>

            <div>
              {data?.address.body?.map((item) => (
                <Typography key={item.id} variant="muted">
                  {item.value}
                </Typography>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Typography asChild variant="h4">
              <h4 className="col-start-2">{data?.workingSchedule.title}</h4>
            </Typography>
            <Typography variant="muted">
              {(() => {
                const time = getWorkingTime(data?.workingSchedule.body?.days)

                if (time?.uniform)
                  return `C ${formatTime(time.start)} до ${formatTime(time.end)}`
                return ""
              })()}
              <br />
              {getDaysStringFromArray(data?.workingSchedule.body?.days, {
                type: "Выходной",
                divider: ", ",
              })}{" "}
              - Выходной
            </Typography>
          </div>
          <div className="flex flex-col gap-2">
            <Typography asChild variant="h4">
              <h4 className="col-start-2">{data?.phonenumber.title}</h4>
            </Typography>
            <div>
              {data?.phonenumber.body?.map((item) => (
                <Typography key={item.id} variant="muted">
                  {item.value}
                </Typography>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Typography asChild variant="h4">
              <h4 className="col-start-2">{data?.email.title}</h4>
            </Typography>
            <div>
              {data?.email.body?.map((item) => (
                <Typography key={item.id} variant="muted">
                  {item.value}
                </Typography>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h6 className="text-base md:text-lg font-bold">
              {data?.social.title}
            </h6>
            <div className="mt-2">
              {data?.social.body.map((item) => (
                <Link key={item.id} href={item.url}>
                  <Button
                    variant="link"
                    size="icon"
                    className="cursor-pointer text-muted-foreground hover:text-(--color-brand)"
                  >
                    <DynamicIcon
                      url={imageUrlBuilder(item.icon?.url)}
                      className="size-5"
                    />
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1/2 w-full">
          <AspectRatio ratio={16 / 9} className="h-full">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Aeee8ace2d2d28e3ab2f55b2e0ebf4d05c73c3d341c2c18ca2f3bf32bab2b5f45&amp;source=constructor"
              width="500"
              height="400"
              className="w-full h-full"
            ></iframe>
          </AspectRatio>
        </div>
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionContactsDetails }
