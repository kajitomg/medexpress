import { routes } from "@/shared/config/routes"
import { Button, Logo, Separator } from "@/shared/ui"
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
import * as React from "react"

const MenuBurger = () => {
  return (
    <Sheet aria-describedby="Меню">
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
              <Logo
                path={routes.MAIN.path}
                className="p-2 h-10 fill-foreground"
              />
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
