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

interface NaivgationSidebarSheetProps {
  category_slug: string
}

const NaivgationSidebarSheet = ({
  category_slug,
}: NaivgationSidebarSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed lg:hidden block lg:w-0 lg:h-0 w-auto h-auto cursor-pointer z-50 flex items-center justify-center"
        >
          <ChevronRight className="size-8" />
          <span className="sr-only">Открыть меню категорий</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        aria-describedby="Меню"
        side="left"
        className="w-full sm:w-auto"
      >
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
        <NomenclatureTypesNavigationSidebar category_slug={category_slug} />
      </SheetContent>
    </Sheet>
  )
}

export { NaivgationSidebarSheet }
