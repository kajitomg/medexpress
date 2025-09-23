import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { getBaseUrl } from "@/shared/lib/get-base-url"
import { NavigationMenu, NavigationMenuList } from "@/shared/ui"
import { NavigationMenuLinkItem } from "@/widgets/menu-burger/ui/navigation-menu-link-item"
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

const NavigationMobile = async ({
  className,
  ...props
}: NavigationMenuProps) => {
  return (
    <>
      <Head>
        <script
          id="navigation-mobile"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(await navigationElement(DATA)),
          }}
        />
      </Head>
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
    </>
  )
}

export { NavigationMobile }
