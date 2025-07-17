import { Title } from "@/shared/ui/title"
import { Mail, Phone } from "lucide-react"
import * as React from "react"
import { ComponentProps } from "react"

const SectionContactFormDetails = ({ className }: ComponentProps<"div">) => {
  return (
    <div className={className}>
      <Title asChild>
        <h4 className="text-6xl text-white font-black cursor-default hover-scale">
          <strong>
            <span className="text-gray-300/70">Обсудим</span> оптимальное
            решение для вашей клиники
          </strong>
        </h4>
      </Title>
      <div className="mt-8">
        <div className="flex flex-col items-start gap-2">
          <div className="grid items-center gap-x-2 content-start">
            <Phone size="40" className="row-span-2  text-gray-300/70" />
            <span className="col-start-2 text-base text-accent">Телефон</span>
            <span className="col-start-2 text-sm text-accent">
              +7 (495) 123-45-67
            </span>
          </div>

          <div className="grid items-center gap-x-2 content-start">
            <Mail size="40" className="row-span-2  text-gray-300/70" />
            <span className="col-start-2 text-base text-accent">Почта</span>
            <span className="col-start-2 text-sm text-accent">
              info@medexpress.ru
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { SectionContactFormDetails }
