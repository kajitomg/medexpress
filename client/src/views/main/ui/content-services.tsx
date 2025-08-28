import { cn } from "@/shared/lib"
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Typography,
} from "@/shared/ui"
import { ServicesItemData } from "@/views/main/ui/services"
import { useContactForm } from "@/widgets/contact-form/provider"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionServicesContentProps {
  onScrollToForm: () => void
  items: ServicesItemData[]
}

const ContentServices = ({
  className,
  items,
  onScrollToForm,
}: ComponentProps<"div"> & SectionServicesContentProps) => {
  const methods = useContactForm()

  const callbacks = {
    onScrollToForm: () => {
      onScrollToForm()

      setTimeout(() => {
        methods?.setFocus("firstname", { shouldSelect: true })
      }, 800)
    },
  }
  return (
    <Card
      className={cn(
        "py-0 sm:flex-row sm:gap-0 overflow-hidden rounded-4xl p-0 w-full",
        className
      )}
    >
      <CardContent className="grow-1 px-0">
        <Image
          src="/oborud4.jpeg"
          alt="alt"
          width="8000"
          height="5784"
          className="size-full object-cover"
        />
      </CardContent>
      <div className="min-w-60 md:min-w-90 py-4 md:py-8">
        <CardHeader className="">
          <CardTitle>
            <Typography asChild variant="h3">
              <h3>Чем мы можем помочь?</h3>
            </Typography>
          </CardTitle>
          <ul className="text-nowrap text-left flex flex-col items-start pt-2 md:pt-6">
            {items?.map((item) => (
              <Button
                key={item.id}
                asChild
                variant="link"
                className="cursor-pointer hover:no-underline hover:text-(--color-brand) text-base md:text-lg font-bold"
              >
                <Link href={item.path}>{item.title}</Link>
              </Button>
            ))}
          </ul>
        </CardHeader>
        <CardFooter>
          <Button
            variant="brand"
            className="cursor-pointer rounded-full mt-2 w-full text-base md:text-lg h-auto md:h-14"
            onClick={callbacks.onScrollToForm}
          >
            Заказать консультацию
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}

export { ContentServices }
