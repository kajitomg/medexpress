"use client"

import { HeaderSections } from "@/entities/header/model/header"
import { createSectionsStore } from "@/features/sections/provider"
import { selectSectionItemByName } from "@/features/sections/store"
import { cn } from "@/shared/lib"
import { formatTime } from "@/shared/lib/format-time"
import { getDaysStringFromArray } from "@/shared/lib/get-days-string-from-array"
import { getWorkingTime } from "@/shared/lib/get-working-time"
import { useScrollDirection } from "@/shared/lib/hooks/use-scroll-direction"
import { HeaderContacts } from "@/shared/model/strapi/elements/header-contacts"
import { Button, Typography } from "@/shared/ui"
import { ModalContactForm } from "@/widgets/modal-contact-form/ui"
import Link from "next/link"
import * as React from "react"
import { ComponentProps, useEffect, useRef, useState } from "react"
import { LocalBusiness, WithContext } from "schema-dts"

const useSectionsStore = createSectionsStore<HeaderSections[]>()

const localBusiness = (
  contacts?: HeaderContacts
): WithContext<LocalBusiness> => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ООО «Медэкспресс»",
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

const ContactsBar = ({ className }: ComponentProps<"div">) => {
  const ANIMATION_DURATION = 300
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const data = useSectionsStore(
    selectSectionItemByName("elements.header-contacts")
  )
  const direction = useScrollDirection()
  const [isRendered, setIsRendered] = useState(true)

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = undefined
    }

    if (direction === "down") {
      timerRef.current = setTimeout(() => {
        setIsRendered(false)
      }, ANIMATION_DURATION)
    } else if (!isRendered) {
      setIsRendered(true)
    }
    return () => {
      clearTimeout(timerRef.current)
      timerRef.current = undefined
    }
  }, [direction])

  return (
    <div
      className={cn(
        `grid overflow-hidden transition-[grid-template-rows] duration-[${ANIMATION_DURATION}]`,
        {
          "grid-rows-[1fr]": direction !== "down",
          "grid-rows-[0fr]": direction === "down",
        }
      )}
    >
      {isRendered && (
        <div
          className={cn(
            `transition-[padding] duration-[${ANIMATION_DURATION}] min-h-0 overflow-hidden w-full px-4 py-2 flex items-start justify-between sm:justify-center border-b border-gray-800/10 gap-2 sm:gap-4 md:gap-6`,
            className,
            direction === "down" && "p-0"
          )}
        >
          <script
            id="header-contacts"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(localBusiness(data)),
            }}
          />
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
                <Link itemProp="url" href={`tel:${item.value}`}>
                  {item.value}
                </Link>
              </Button>
            ))}
          </div>
          <div className="flex flex-col hidden sm:block">
            <Typography variant="small" className="font-bold">
              {data?.email.title}
            </Typography>
            {data?.email.body.map((item) => (
              <Button key={item.id} variant="link" className="px-0" asChild>
                <Link itemProp="url" href={`mailto:${item.value}`}>
                  {item.value}
                </Link>
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
      )}
    </div>
  )
}

export { ContactsBar }
