import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import {
  Button,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/shared/ui"
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu"
import * as React from "react"

interface FooterCatalogNavigationProps {}

const FooterCatalogNavigation = ({
  className,
  ...props
}: NavigationMenuProps & FooterCatalogNavigationProps) => {
  return (
    <NavigationMenu
      className={cn("dark", className)}
      orientation="vertical"
      {...props}
    >
      <NavigationMenuList className="flex-col items-start">
        <NavigationMenuItem
          className={cn(
            "text-accent-foreground cursor-default text-sm font-bold p-0 h-auto"
          )}
        >
          {routes.CATALOG().title}
        </NavigationMenuItem>
        <Button size="sm" className="cursor-pointer mt-2">
          Сделать заказ
        </Button>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export { FooterCatalogNavigation }
