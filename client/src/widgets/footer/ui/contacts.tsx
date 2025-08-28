import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Typography,
} from "@/shared/ui"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import * as React from "react"

const Contacts = () => {
  return (
    <Card className="bg-transparent border-none shadow-none justify-start gap-y-1 sm:gap-y-2 py-2 sm:py-4 md:py-6">
      <CardHeader className="justify-start px-2 md:px-4 lg:px-6">
        <CardTitle className="p-1 text-start text-lg font-bold text-foreground h-7 md:h-8">
          Контакты
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col px-2 md:px-4 lg:px-6 gap-2">
        <div className="grid items-center gap-2 lg:gap-4 content-start justify-start">
          <MapPin className="size-5 md:size-6" />
          <Typography variant="small" className="col-start-2">
            357820 Ставропольский край, г. Георгевск, ул. Минераловодская 8А
          </Typography>
        </div>
        <div className="grid items-center gap-2 lg:gap-4 content-start justify-start">
          <Phone className="size-5 md:size-6" />
          <Typography variant="small" className="col-start-2">
            (87951) 5-07-02
            <br />
            (87951) 5-11-16
          </Typography>
        </div>
        <div className="grid items-center gap-2 lg:gap-4 content-start justify-start">
          <Mail className="size-5 md:size-6" />
          <Typography variant="small" className="col-start-2">
            torg-medekspress@mail.ru
          </Typography>
        </div>
        <div className="grid items-center gap-2 lg:gap-4 content-start justify-start">
          <Clock className="size-5 md:size-6" />
          <Typography variant="small" className="col-start-2">
            Пн-Пт: 8:30-17:30
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export { Contacts }
