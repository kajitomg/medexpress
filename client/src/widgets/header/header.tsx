import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { Logo } from "@/shared/ui/logo"
import { HeaderActionBar } from "@/widgets/header/header-action-bar"
import { HeaderNavigation } from "@/widgets/header/header-navigation"
import * as React from "react"
import { ComponentProps } from "react"

interface HeaderProps {}

const Header = ({
  className,
  ...props
}: ComponentProps<"header"> & HeaderProps) => {
  return (
    <header
      className={cn(
        className,
        "w-full h-20 grid grid-cols-6 content-center justify-items-center items-center py-4 backdrop-blur-3xl"
      )}
      {...props}
    >
      <div className="col-start-1">
        <Logo title="Medexpress" path={routes.MAIN.path} />
      </div>
      <HeaderNavigation className="col-start-2 col-span-4 justify-self-start" />
      <HeaderActionBar className="col-start-6 col-span-2" />
    </header>
  )
}

export { Header }
