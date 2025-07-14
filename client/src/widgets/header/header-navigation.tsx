import { fetchAllCategories } from "@/entities/category/services"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/shared/ui"
import { MenuCatalog } from "@/widgets/menu-catalog"
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu"
import Link from "next/link"
import * as React from "react"

interface HeaderNavigationProps {}

const HeaderNavigation = async ({
  ...props
}: NavigationMenuProps & HeaderNavigationProps) => {
  const categories = await fetchAllCategories()
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {routes.CATALOG().title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <MenuCatalog initCategoriesList={categories || []} />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={routes.ABOUT.path}>{routes.ABOUT.title}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={routes.CONTACTS.path}>{routes.CONTACTS.title}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuViewport
        className={cn(
          "relative mt-2 h-auto",
          "w-screen max-w-md sm:max-w-lg md:max-w-xl",
          "transition-all duration-300"
        )}
      />
    </NavigationMenu>
  )
}

export { HeaderNavigation }
