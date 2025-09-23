import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { getBaseUrl } from "@/shared/lib/get-base-url"
import { NavigationMenu, NavigationMenuList } from "@/shared/ui"
import { HeaderMenuCatalog } from "@/widgets/header/ui/header-menu-catalog"
import { NavigationMenuDropdownItem } from "@/widgets/header/ui/navigation-menu-dropdown-item"
import { NavigationMenuLinkItem } from "@/widgets/header/ui/navigation-menu-link-item"
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu"
import Head from "next/head"
import * as React from "react"
import { FC, ReactNode } from "react"
import { SiteNavigationElement, WithContext } from "schema-dts"

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
    id: 3,
    title: routes.COLLESCTIONS().title,
    path: routes.COLLESCTIONS().path,
  },
  {
    id: 2,
    title: routes.ABOUT.title,
    path: routes.ABOUT.path,
  },
  {
    id: 4,
    title: routes.CONTACTS.title,
    path: routes.CONTACTS.path,
  },
]
const navigationElement = async (
  navigations: NavigationMenuItemData[]
): Promise<WithContext<SiteNavigationElement>> => {
  const baseUrl = await getBaseUrl()
  const name: string[] = []
  const url: string[] = []

  navigations.map((navigation) => {
    name.push(navigation.title)
    url.push(baseUrl + navigation.path)
  })

  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name,
    url,
  }
}

const Navigation = async ({ className, ...props }: NavigationMenuProps) => {
  return (
    <>
      <Head>
        <script
          id="navigation"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(await navigationElement(DATA)),
          }}
        />
      </Head>
      <NavigationMenu className={cn(className)} viewport={false} {...props}>
        <NavigationMenuList
          className={cn(
            props.orientation === "vertical" &&
              "flex-col justify-start items-start"
          )}
        >
          {DATA.map((item) =>
            item.content ? (
              <NavigationMenuDropdownItem
                key={item.id}
                item={{ ...item, content: <item.content /> }}
              />
            ) : (
              <NavigationMenuLinkItem key={item.id} item={item} />
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  )
}

export { Navigation }
