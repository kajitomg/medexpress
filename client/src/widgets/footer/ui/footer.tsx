import { cn } from "@/shared/lib"
import { About } from "@/widgets/footer/ui/about"
import { CatalogNavigation } from "@/widgets/footer/ui/catalog-navigation"
import { Contacts } from "@/widgets/footer/ui/contacts"
import { InfoNavigation } from "@/widgets/footer/ui/info-navigation"
import * as React from "react"

const Footer = ({ className, ...props }: React.ComponentProps<"footer">) => {
  return (
    <footer
      className={cn(
        className,
        "py-8 px-4 md:px-8 backdrop-blur-3xl bg-[#93A79E] dark"
      )}
      {...props}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start gap-2 w-full">
        <About />
        <CatalogNavigation />
        <InfoNavigation />
        <Contacts />
      </div>
    </footer>
  )
}

export { Footer }
