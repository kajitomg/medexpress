import { Clock, Mail, MapPin, Phone } from "lucide-react"
import * as React from "react"

interface FooterContactsProps {}

const FooterContacts = ({}: FooterContactsProps) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-bold text-accent">Контакты</span>
      <div className="mt-3">
        <div className="flex flex-col space-y-2">
          <div className="text-accent flex text-sm">
            <MapPin size="20" />
            <span className="ml-2">г. Москва, ул. Медицинская, 123</span>
          </div>
          <div className="text-accent flex text-sm">
            <Phone size="20" />
            <span className="ml-2">+7 (495) 123-45-67</span>
          </div>
          <div className="text-accent flex text-sm">
            <Mail size="20" />
            <span className="ml-2">info@medexpress.ru</span>
          </div>
          <div className="text-accent flex text-sm">
            <Clock size="20" />
            <span className="ml-2">Пн-Пт: 9:00-18:00</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { FooterContacts }
