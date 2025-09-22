import { cn } from "@/shared/lib"
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/shared/ui"
import { NavigationMenuItemData } from "@/widgets/header/ui/navigation"
import Link from "next/link"
import * as React from "react"

interface NavigationMenuLinkItemProps {
  item: NavigationMenuItemData
}

const NavigationMenuLinkItem = ({ item }: NavigationMenuLinkItemProps) => {
  return (
    <NavigationMenuItem asChild>
      <NavigationMenuLink
        itemProp="url"
        asChild
        className={cn(
          navigationMenuTriggerStyle(),
          "text-base font-bold hover:text-(--color-brand)",
          "bg-transparent backdrop-blur-3xl"
        )}
      >
        <Link href={item.path}>
          <span itemProp="name">{item.title}</span>
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

export { NavigationMenuLinkItem }
