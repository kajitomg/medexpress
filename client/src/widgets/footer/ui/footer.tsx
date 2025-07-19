import { cn } from "@/shared/lib"
import { FooterAbout } from "@/widgets/footer/ui/footer-about"
import { FooterCatalogNavigation } from "@/widgets/footer/ui/footer-catalog-navigation"
import { FooterContacts } from "@/widgets/footer/ui/footer-contacts"
import { FooterInfoNavigation } from "@/widgets/footer/ui/footer-info-navigation"
import * as React from "react"

interface FooterProps {}

const Footer = ({
  className,
  ...props
}: React.ComponentProps<"footer"> & FooterProps) => {
  return (
    <footer
      className={cn(className, "p-8 backdrop-blur-3xl bg-[#93A79E]")}
      {...props}
    >
      <div className="grid grid-cols-4 items-start gap-2 w-full">
        <FooterAbout />
        <FooterCatalogNavigation />
        <FooterInfoNavigation />
        <FooterContacts />
      </div>
    </footer>
  )
}

export { Footer }
