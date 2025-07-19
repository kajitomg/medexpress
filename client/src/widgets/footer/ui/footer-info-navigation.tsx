import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/shared/ui"
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu"
import * as React from "react"

interface FooterInfoNavigationProps {}

const FooterInfoNavigation = ({
  className,
  ...props
}: NavigationMenuProps & FooterInfoNavigationProps) => {
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
          Информация
        </NavigationMenuItem>
        <NavigationMenuItem className="mt-2">
          <NavigationMenuLink
            href={routes.ABOUT.path}
            className={cn(
              navigationMenuTriggerStyle(),
              "text-accent-foreground bg-transparent hover:bg-transparent hover:text-gray-200 font-bold p-0 h-auto "
            )}
          >
            {routes.ABOUT.title}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href={routes.CONTACTS.path}
            className={cn(
              navigationMenuTriggerStyle(),
              "text-accent-foreground bg-transparent hover:bg-transparent hover:text-gray-200 font-bold p-0 h-auto "
            )}
          >
            {routes.CONTACTS.title}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href={routes.SITEMAP.path}
            className={cn(
              navigationMenuTriggerStyle(),
              "text-accent-foreground bg-transparent hover:bg-transparent hover:text-gray-200 font-bold p-0 h-auto "
            )}
          >
            {routes.SITEMAP.title}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export { FooterInfoNavigation }
