"use client"

import { cn } from "@/shared/lib"
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/shared/ui"
import { NavigationMenuItemData } from "@/widgets/header/ui/navigation"
import { MiddlewareState } from "@floating-ui/react"
import { shift, useFloating } from "@floating-ui/react-dom"
import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { ReactNode } from "react"
import Error from "../../../../app/error"

interface NavigationMenuDropdownItemProps {
  item: NavigationMenuItemData<ReactNode>
}

const centerHorizontally = () => ({
  name: "centerHorizontally",
  fn({ rects }: MiddlewareState) {
    const floatingWidth = rects.floating.width
    const newX = (window.innerWidth - floatingWidth) / 2

    return {
      x: newX,
    }
  },
})

const NavigationMenuDropdownItem = ({
  item,
}: NavigationMenuDropdownItemProps) => {
  const pathname = usePathname()
  const { refs, floatingStyles } = useFloating({
    placement: "bottom",
    strategy: "fixed",
    middleware: [centerHorizontally(), shift({ padding: 4 })],
  })

  return (
    <NavigationMenuItem ref={refs.setReference}>
      <Link href={item.path}>
        <NavigationMenuTrigger
          className={cn(
            "cursor-pointer bg-transparent backdrop-blur-3xl text-base font-bold hover:text-(--color-brand) data-[state=open]:text-(--color-brand)"
          )}
          style={{
            ...(pathname === item.path && { color: "var(--color-brand)" }),
          }}
        >
          {item.title}
        </NavigationMenuTrigger>
      </Link>
      <NavigationMenuContent
        style={floatingStyles}
        ref={refs.setFloating}
        className="z-50 w-auto"
      >
        <ErrorBoundary errorComponent={Error}>
          {item.content && item.content}
        </ErrorBoundary>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

export { NavigationMenuDropdownItem }
