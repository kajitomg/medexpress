import { routes } from "@/shared/config/routes"
import { Button, Separator } from "@/shared/ui"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet"
import { NavigationMobile } from "@/widgets/menu-burger/ui/navigation-mobile"
import { Menu } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import Logo from "../../../../public/logo.svg"

const MenuBurger = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden flex-shrink-0 cursor-pointer"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Открыть меню навигации</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-full sm:w-[350px]">
        <SheetHeader>
          <SheetTitle>
            <SheetClose asChild>
              <Link href={routes.MAIN.path}>
                <Logo className="p-2 h-14 lg:h-16 w-auto fill-foreground" />
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <Separator className="my-4" />
        <SheetClose>
          <NavigationMobile />
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}

export { MenuBurger }
