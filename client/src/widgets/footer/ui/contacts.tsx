import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import * as React from "react"

const Contacts = () => {
  return (
    <Card className="bg-transparent border-none shadow-none justify-start gap-y-1 sm:gap-y-2 py-2 sm:py-4 md:py-6">
      <CardHeader className="justify-start px-2 md:px-4 lg:px-6">
        <CardTitle className="p-1 text-start text-lg font-bold text-accent h-7 md:h-8">
          Контакты
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 md:px-4 lg:px-6">
        <div className="text-accent flex text-sm p-1">
          <MapPin className="size-5 min-w-5" />
          <span className="ml-2">
            357820 Ставропольский край, г. Георгевск, ул. Минераловодская 8А
          </span>
        </div>
        <div className="text-accent flex text-sm p-1">
          <Phone className="size-5 min-w-5" />
          <span className="ml-2">
            (87951) 5-07-02
            <br />
            (87951) 5-11-16
          </span>
        </div>
        <div className="text-accent flex text-sm p-1">
          <Mail className="size-5 min-w-5" />
          <span className="ml-2">torg-medekspress@mail.ru</span>
        </div>
        <div className="text-accent flex text-sm p-1 hover:text-gray-200">
          <Clock className="size-5 min-w-5" />
          <span className="ml-2">Пн-Пт: 8:30-17:30</span>
        </div>
      </CardContent>
    </Card>
  )
}

export { Contacts }
