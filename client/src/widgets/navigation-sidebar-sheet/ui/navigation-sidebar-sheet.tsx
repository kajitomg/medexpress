import { routes } from "@/shared/config/routes"
import { Button, Logo } from "@/shared/ui"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet"
import { NomenclatureTypesNavigationSidebar } from "@/widgets/catalog-categories-navigation-sidebar/ui"
import { ChevronRight } from "lucide-react"
import * as React from "react"
import { ComponentProps } from "react"

interface NaivgationSidebarSheetProps {
  initSlug?: string
  redirect?: boolean
}

const NaivgationSidebarSheet = ({
  initSlug,
  redirect = false,
}: ComponentProps<"div"> & NaivgationSidebarSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="absolute lg:hidden block lg:w-0 lg:h-0 w-auto h-auto cursor-pointer z-50 flex items-center justify-center"
        >
          <ChevronRight className="size-8" />
          <span className="sr-only">Открыть меню категорий</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        aria-describedby="Меню"
        side="left"
        className="w-full sm:w-auto flex flex-col h-full"
      >
        <SheetHeader className="flex-none">
          <SheetTitle>
            <SheetClose asChild>
              <Logo
                path={routes.MAIN.path}
                className="p-2 h-10 fill-foreground"
              />
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          <NomenclatureTypesNavigationSidebar
            initSlug={initSlug}
            redirect={redirect}
            className="w-full sm:w-80"
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { NaivgationSidebarSheet }
