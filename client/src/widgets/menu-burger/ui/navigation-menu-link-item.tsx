import { cn } from "@/shared/lib"
import { NavigationMenuItem, NavigationMenuLink } from "@/shared/ui"
import { SheetClose } from "@/shared/ui/sheet"
import { typographyVariants } from "@/shared/ui/typography"
import { NavigationMenuItemData } from "@/widgets/header/ui/navigation"
import Link from "next/link"
import * as React from "react"

interface NavigationMenuLinkItemProps {
  item: NavigationMenuItemData
}

const NavigationMenuLinkItem = ({ item }: NavigationMenuLinkItemProps) => {
  return (
    <NavigationMenuItem asChild>
      <SheetClose asChild>
        <NavigationMenuLink
          itemProp="url"
          asChild
          className={cn(
            typographyVariants({ variant: "lead" }),
            "hover:text-(--color-brand) text-black",
            "bg-transparent backdrop-blur-3xl"
          )}
        >
          <Link href={item.path}>
            <span itemProp="name">{item.title}</span>
          </Link>
        </NavigationMenuLink>
      </SheetClose>
    </NavigationMenuItem>
  )
}

export { NavigationMenuLinkItem }
