import { routes } from "@/shared/config/routes"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/shared/ui"
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import * as React from "react"

interface HeaderActionBarProps {}

const HeaderActionBar = ({
  ...props
}: NavigationMenuProps & HeaderActionBarProps) => {
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={routes.CART.path}>
              <ShoppingCart />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export { HeaderActionBar }
