import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { Button, Card, CardContent, CardFooter, CardHeader } from "@/shared/ui"
import { ModalContactForm } from "@/widgets/modal-contact-form/ui"
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu"
import Link from "next/link"
import * as React from "react"

const CatalogNavigation = ({ className, ...props }: NavigationMenuProps) => {
  return (
    <Card
      className={cn(
        "bg-transparent border-none shadow-none justify-start gap-y-1 sm:gap-y-2 py-2 sm:py-4 md:py-6",
        className
      )}
      {...props}
    >
      <CardHeader className="justify-start p-0">
        <Button
          asChild
          variant="link"
          className="hover:no-underline p-1 text-start text-lg font-bold text-foreground hover:text-gray-200 h-7 md:h-8"
        >
          <Link href={routes.CATALOG().path}>{routes.CATALOG().title}</Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Button
          asChild
          variant="link"
          className="hover:no-underline p-1 font-bold text-foreground hover:text-gray-200 h-auto"
        >
          <Link href={routes.COLLESCTIONS().path}>
            {routes.COLLESCTIONS().title}
          </Link>
        </Button>
      </CardContent>
      <CardFooter className="p-0">
        <ModalContactForm />
      </CardFooter>
    </Card>
  )
}

export { CatalogNavigation }
