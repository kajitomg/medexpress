import { routes } from "@/shared/config/routes"
import { Button } from "@/shared/ui"
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import * as React from "react"

const ActionBar = async ({ ...props }: NavigationMenuProps) => {
  return (
    <div {...props}>
      <Button
        variant="ghost"
        size="icon"
        className="font-bold backdrop-blur-3xl hover:text-(--color-brand) cursor-pointer"
      >
        <Link href={routes.CART.path}>
          <ShoppingCart className="size-5" />
          <span className="sr-only">Открыть страницу корзины</span>
        </Link>
      </Button>
    </div>
  )
}

export { ActionBar }
