import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { Logo } from "@/shared/ui/logo"
import { HeaderActionBar } from "@/widgets/header/ui/header-action-bar"
import { HeaderCollections } from "@/widgets/header/ui/header-collections"
import { HeaderNavigation } from "@/widgets/header/ui/header-navigation"
import * as React from "react"
import { ComponentProps } from "react"

interface HeaderProps {}

const Header = ({
  className,
  ...props
}: ComponentProps<"header"> & HeaderProps) => {
  return (
    <header
      className={cn(className, "w-full h-32 backdrop-blur-3xl")}
      {...props}
    >
      <div className="grid grid-cols-6 content-center justify-items-center items-center py-4 h-20">
        <div className="col-start-1">
          <Logo
            title="Medexpress"
            path={routes.MAIN.path}
            className="bg-white p-2"
          />
        </div>
        <HeaderNavigation className="col-start-2 col-span-4 justify-self-start" />
        <HeaderActionBar className="col-start-6 col-span-2" />
      </div>
      <HeaderCollections />
    </header>
  )
}

export { Header }
