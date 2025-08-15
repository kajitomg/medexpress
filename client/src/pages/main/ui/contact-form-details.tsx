import { cn } from "@/shared/lib"
import { Mail, Phone } from "lucide-react"
import * as React from "react"
import { ComponentProps } from "react"

const ContactFormDetails = ({ className }: ComponentProps<"div">) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <h4 className="text-4xl md:text-5xl text-white font-black cursor-default hover-scale text-center xl:text-left max-w-3xl xl:max-w-full">
        <strong>
          <span className="text-gray-300/70">Обсудим</span> оптимальное решение
          для вашей клиники
        </strong>
      </h4>
      <div className="mt-8 max-w-md xl:max-w-full w-full">
        <div className="flex flex-col items-start gap-2">
          <div className="grid items-start gap-x-2 content-start">
            <Phone className="size-8 md:size-9 row-span-2 text-gray-300/70" />
            <span className="col-start-2 text-base md:text-lg font-bold text-accent">
              Телефон/факс
            </span>
            <span className="col-start-2 text-sm md:text-base font-light text-accent">
              (87951) 5-07-02
              <br />
              (87951) 5-11-16
            </span>
          </div>

          <div className="grid items-center gap-x-2 content-start">
            <Mail className="size-8 md:size-9 row-span-2 text-gray-300/70" />
            <span className="col-start-2 text-base md:text-lg font-bold text-accent">
              Почта
            </span>
            <span className="col-start-2 text-sm md:text-base font-light text-accent">
              torg-medekspress@mail.ru
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ContactFormDetails }
