import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/shared/ui/navigation-menu"
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react"
import Link from "next/link"
import * as React from "react"

const Footer = ({ className, ...props }: React.ComponentProps<"footer">) => {
  return (
    <footer
      className={cn(className, "p-8 backdrop-blur-3xl bg-[#93A79E]")}
      {...props}
    >
      <div className="grid grid-cols-4 gap-2 w-full">
        <div className="flex flex-col">
          <Button
            asChild
            variant="link"
            className="self-start text-xl font-black text-accent hover:no-underline p-0"
          >
            <Link href="/">Medexpress</Link>
          </Button>
          <div className="mt-3">
            <span className="text-accent text-sm">
              Ваш надежный партнер в мире медицинского оборудования с 2010 года
            </span>
            <div>
              <Button
                variant="link"
                className="text-accent hover:text-gray-200 cursor-pointer"
              >
                <Instagram />
              </Button>
              <Button
                variant="link"
                className="text-accent hover:text-gray-200 cursor-pointer"
              >
                <Twitter />
              </Button>
              <Button
                variant="link"
                className="text-accent hover:text-gray-200 cursor-pointer"
              >
                <Facebook />
              </Button>
              <Button
                variant="link"
                className="text-accent hover:text-gray-200 cursor-pointer"
              >
                <Linkedin />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <NavigationMenu className="dark" orientation="vertical">
            <NavigationMenuList className="flex-col items-start">
              <NavigationMenuItem className="bg-transparent">
                <NavigationMenuLink
                  href="/catalog"
                  className={cn(
                    "text-accent-foreground bg-transparent hover:bg-transparent hover:text-gray-200 font-bold p-0 h-auto "
                  )}
                >
                  Каталог
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="mt-2">
                <NavigationMenuLink
                  href="/about"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-accent-foreground bg-transparent hover:bg-transparent hover:text-gray-200 font-bold p-0 h-auto "
                  )}
                >
                  О нас
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/contacts"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-accent-foreground bg-transparent hover:bg-transparent hover:text-gray-200 font-bold p-0 h-auto "
                  )}
                >
                  Контакты
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/sitemap"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-accent-foreground bg-transparent hover:bg-transparent hover:text-gray-200 font-bold p-0 h-auto "
                  )}
                >
                  Карта сайта
                </NavigationMenuLink>
              </NavigationMenuItem>

              <Button size="sm" className="cursor-pointer mt-2">
                Сделать заказ
              </Button>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div>
          <NavigationMenu className="dark" orientation="vertical">
            <NavigationMenuList className="flex-col items-start">
              <NavigationMenuItem
                className={cn(
                  "text-accent-foreground cursor-default text-sm font-bold p-0 h-auto"
                )}
              >
                Информация
              </NavigationMenuItem>
              <NavigationMenuItem className="mt-2">
                <NavigationMenuLink
                  href="/about"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-accent-foreground bg-transparent hover:bg-transparent hover:text-gray-200 font-bold p-0 h-auto "
                  )}
                >
                  О нас
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/contacts"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-accent-foreground bg-transparent hover:bg-transparent hover:text-gray-200 font-bold p-0 h-auto "
                  )}
                >
                  Контакты
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/sitemap"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-accent-foreground bg-transparent hover:bg-transparent hover:text-gray-200 font-bold p-0 h-auto "
                  )}
                >
                  Карта сайта
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
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
      </div>
    </footer>
  )
}

export default Footer
