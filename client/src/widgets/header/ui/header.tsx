import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { ActionBar } from "@/widgets/header/ui/action-bar"
import { CollectionsBar } from "@/widgets/header/ui/collections-bar"
import { Navigation } from "@/widgets/header/ui/navigation"
import { MenuBurger } from "@/widgets/menu-burger/ui/menu-burger"
import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import Link from "next/link"
import * as React from "react"
import { ComponentProps } from "react"
import Logo from "../../../../../static/logo.svg"
import Error from "../../../../app/error"

const Header = async ({ className, ...props }: ComponentProps<"header">) => {
  return (
    <header
      className={cn(
        className,
        "w-full h-32 backdrop-blur-3xl bg-background/30 border-b border-gray-800/10"
      )}
      {...props}
    >
      <div className="h-20 grid grid-cols-6 content-center justify-items-center items-center p-4">
        <div className="col-start-1">
          <MenuBurger />
        </div>
        <div className="col-start-2 col-span-4 md:col-start-1 md:col-span-1 justify-self-start">
          <Link href={routes.MAIN.path}>
            <Logo className="p-2 h-14 lg:h-16 w-auto fill-foreground" />
          </Link>
        </div>
        <Navigation className="col-start-2 col-span-4 hidden md:block" />
        <ActionBar className="col-start-6 col-span-2" />
      </div>
      <ErrorBoundary errorComponent={Error}>
        <CollectionsBar className="h-12" />
      </ErrorBoundary>
    </header>
  )
}

export { Header }
