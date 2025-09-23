import { formatTime } from "@/shared/lib/format-time"
import { getDaysStringFromArray } from "@/shared/lib/get-days-string-from-array"
import { getWorkingTime } from "@/shared/lib/get-working-time"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { FooterContacts } from "@/shared/model/strapi/elements/footer-contacts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Typography,
} from "@/shared/ui"
import DynamicIcon from "@/shared/ui/dynamic-icon"
import * as React from "react"
import { LocalBusiness, WithContext } from "schema-dts"

interface ContactsProps {
  data?: FooterContacts
}

const localBusiness = (
  contacts?: FooterContacts
): WithContext<LocalBusiness> => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ООО «Медэкспресс»",
    address: contacts?.address.body.map((item) => item.value),
    telephone: contacts?.phonenumber.body.map((item) => item.value),
    email: contacts?.email.body.map((item) => item.value),
    openingHours:
      `${getDaysStringFromArray(contacts?.workingSchedule.body?.days, {
        alphabet: {
          Понедельник: "Пн",
          Вторник: "Вт",
          Среда: "Ср",
          Четверг: "Чт",
          Пятница: "Пт",
          Суббота: "Сб",
          Воскресенье: "Вс",
        },
      })}: ${(() => {
        const time = getWorkingTime(contacts?.workingSchedule.body?.days)

        if (time?.uniform)
          return `${formatTime(time.start)}:${formatTime(time.end)}`
        return ""
      })()}` || "",
  }
}

const Contacts = ({ data }: ContactsProps) => {
  return (
    <Card className="bg-transparent border-none shadow-none justify-start gap-y-1 sm:gap-y-2 py-2 sm:py-4 md:py-6">
      <script
        id="footer-contacts"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusiness(data)),
        }}
      />
      <CardHeader className="justify-start p-0">
        <CardTitle className="p-1 text-start text-lg font-bold text-foreground h-7 md:h-8">
          {data?.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col p-0 gap-2">
        <div className="grid items-start gap-2 lg:gap-3 content-start justify-start">
          <DynamicIcon
            url={imageUrlBuilder(data?.address.icon?.url)}
            className="size-5 md:size-6"
          />
          <div className="col-start-2 flex flex-col gap-1">
            {data?.address.body?.map((item) => (
              <Typography key={item.id} variant="small">
                {item.value}
              </Typography>
            ))}
          </div>
        </div>
        <div className="grid items-start gap-y-1 gap-x-2 lg:gap-x-3 content-start justify-start">
          <DynamicIcon
            url={imageUrlBuilder(data?.phonenumber.icon?.url)}
            className="size-5 md:size-6"
          />
          <div className="col-start-2 flex flex-col gap-1">
            {data?.phonenumber.body?.map((item) => (
              <Typography key={item.id} variant="small">
                {item.value}
              </Typography>
            ))}
          </div>
        </div>
        <div className="grid items-start gap-2 lg:gap-3 content-start justify-start">
          <DynamicIcon
            url={imageUrlBuilder(data?.email.icon?.url)}
            className="size-5 md:size-6"
          />
          <div className="col-start-2 flex flex-col gap-1">
            {data?.email.body?.map((item) => (
              <Typography key={item.id} variant="small">
                {item.value}
              </Typography>
            ))}
          </div>
        </div>
        <div className="grid items-center gap-2 lg:gap-3 content-start justify-start">
          <DynamicIcon
            url={imageUrlBuilder(data?.workingSchedule.icon?.url)}
            className="size-5 md:size-6"
          />
          <Typography variant="small" className="col-start-2">
            {getDaysStringFromArray(data?.workingSchedule.body?.days, {
              alphabet: {
                Понедельник: "Пн",
                Вторник: "Вт",
                Среда: "Ср",
                Четверг: "Чт",
                Пятница: "Пт",
                Суббота: "Сб",
                Воскресенье: "Вс",
              },
            })}
            {": "}
            {(() => {
              const time = getWorkingTime(data?.workingSchedule.body?.days)

              if (time?.uniform)
                return `${formatTime(time.start)}:${formatTime(time.end)}`
              return ""
            })()}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export { Contacts }
