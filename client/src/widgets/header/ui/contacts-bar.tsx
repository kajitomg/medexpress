"use client"

import { HeaderSections } from "@/entities/header/model/header"
import { createSectionsStore } from "@/features/sections/provider"
import { selectSectionItemByName } from "@/features/sections/store"
import { cn } from "@/shared/lib"
import { formatTime } from "@/shared/lib/format-time"
import { getDaysStringFromArray } from "@/shared/lib/get-days-string-from-array"
import { getWorkingTime } from "@/shared/lib/get-working-time"
import { useScrollDirection } from "@/shared/lib/hooks/use-scroll-direction"
import { Button, Typography } from "@/shared/ui"
import { ModalContactForm } from "@/widgets/modal-contact-form/ui"
import Link from "next/link"
import { ComponentProps } from "react"

const useSectionsStore = createSectionsStore<HeaderSections[]>()

const ContactsBar = ({ className }: ComponentProps<"div">) => {
  const data = useSectionsStore(
    selectSectionItemByName("elements.header-contacts")
  )

  const direction = useScrollDirection()

  return (
    <div
      className={cn(
        "overflow-hidden w-full px-4 py-2 flex items-start justify-between sm:justify-end border-b border-gray-800/10 gap-2 sm:gap-4 md:gap-6",
        className,
        direction === "down" && "hidden"
      )}
    >
      <div className="self-center">
        <ModalContactForm dialogButton={data?.contactButton} />
      </div>
      <div className="flex flex-col">
        <Typography
          variant="small"
          className="font-bold cursor-pointer hidden sm:block"
        >
          {data?.phonenumber.title}
        </Typography>
        {data?.phonenumber.body.map((item) => (
          <Button key={item.id} variant="link" className="px-0" asChild>
            <Link href={`tel:${item.value}`}>{item.value}</Link>
          </Button>
        ))}
      </div>
      <div className="flex flex-col hidden sm:block">
        <Typography variant="small" className="font-bold">
          {data?.email.title}
        </Typography>
        {data?.email.body.map((item) => (
          <Button key={item.id} variant="link" className="px-0" asChild>
            <Link href={`mailto:${item.value}`}>{item.value}</Link>
          </Button>
        ))}
      </div>
      <div className="flex flex-col hidden sm:block">
        <Typography variant="small" className="font-bold">
          {data?.workingSchedule.title}
        </Typography>
        <Typography variant="small" className="py-2 leading-5">
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
          {" : "}
          {(() => {
            const time = getWorkingTime(data?.workingSchedule.body?.days)

            if (time?.uniform)
              return `${formatTime(time.start)}:${formatTime(time.end)}`
            return ""
          })()}
        </Typography>
      </div>
    </div>
  )
}

export { ContactsBar }
