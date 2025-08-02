import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import {
  Button,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
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
          <NavigationMenuLink
            href={routes.CATALOG().path}
            className={cn(
              navigationMenuTriggerStyle(),
              "text-accent-foreground bg-transparent hover:bg-transparent hover:text-gray-200 font-bold p-0 h-auto focus:bg-transparent"
            )}
          >
            {routes.CATALOG().title}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="mt-2">
          <NavigationMenuLink
            href={routes.COLLESCTIONS().path}
            className={cn(
              navigationMenuTriggerStyle(),
              "text-accent-foreground bg-transparent hover:bg-transparent hover:text-gray-200 font-bold p-0 h-auto focus:bg-transparent"
            )}
          >
            {routes.COLLESCTIONS().title}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <Button size="sm" className="cursor-pointer mt-2">
          Сделать заказ
        </Button>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export { FooterCatalogNavigation }
