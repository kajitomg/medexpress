import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { NavigationMenu, NavigationMenuList } from "@/shared/ui"
import { HeaderMenuCatalog } from "@/widgets/header/ui/header-menu-catalog"
import { NavigationMenuLinkItem } from "@/widgets/menu-burger/ui/navigation-menu-link-item"
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu"
import * as React from "react"
import { FC, ReactNode } from "react"

export type NavigationMenuItemData<T extends FC | ReactNode = FC> = {
  id: number
  title: string
  path: string
  content?: T
}

const DATA: NavigationMenuItemData[] = [
  {
    id: 1,
    title: routes.CATALOG().title,
    path: routes.CATALOG().path,
    content: HeaderMenuCatalog,
  },
  {
    id: 2,
    title: routes.ABOUT.title,
    path: routes.ABOUT.path,
  },
  {
    id: 3,
    title: routes.COLLESCTIONS().title,
    path: routes.COLLESCTIONS().path,
  },
  {
    id: 4,
    title: routes.CONTACTS.title,
    path: routes.CONTACTS.path,
  },
]

const NavigationMobile = async ({
  className,
  ...props
}: NavigationMenuProps) => {
  return (
    <NavigationMenu
      className={cn("items-start flex-0 px-6", className)}
      orientation="vertical"
      {...props}
    >
      <NavigationMenuList
        className={cn("flex-col justify-center items-start w-full")}
      >
        {DATA.map((item) => (
          <NavigationMenuLinkItem item={item} key={item.id} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export { NavigationMobile }
