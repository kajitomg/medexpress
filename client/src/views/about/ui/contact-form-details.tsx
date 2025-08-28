import { cn } from "@/shared/lib"
import { Typography } from "@/shared/ui"
import { Mail, Phone } from "lucide-react"
import * as React from "react"
import { ComponentProps } from "react"

const ContactFormDetails = ({ className }: ComponentProps<"div">) => {
  return (
    <div className={cn("flex flex-col items-center dark", className)}>
      <Typography
        variant="display"
        className="font-black cursor-default hover-scale text-center xl:text-left"
      >
        <strong>
          <span className="text-gray-300/70">Обсудим</span> оптимальное решение
          для вашей клиники
        </strong>
      </Typography>
      <div className="mt-8 max-w-md xl:max-w-full w-full">
        <div className="flex flex-col items-start gap-2">
          <div className="grid items-center gap-2 content-start justify-start">
            <Phone className="size-7 md:size-8 text-foreground" />
            <Typography asChild variant="h4">
              <h4 className="col-start-2">Телефон/факс</h4>
            </Typography>
            <Typography variant="muted" className="text-foreground col-start-2">
              (87951) 5-07-02
              <br />
              (87951) 5-11-16
            </Typography>
          </div>
          <div className="grid items-center gap-2 content-start justify-start">
            <Mail className="size-7 md:size-8 text-foreground" />
            <Typography asChild variant="h4">
              <h4 className="col-start-2">Почта</h4>
            </Typography>
            <Typography variant="muted" className="text-foreground col-start-2">
              torg-medekspress@mail.ru
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ContactFormDetails }
