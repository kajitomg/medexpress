import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { Button, Card, CardContent, CardFooter, CardHeader } from "@/shared/ui"
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
      <CardHeader className="justify-start px-2 md:px-4 lg:px-6">
        <Button
          asChild
          variant="link"
          className="hover:no-underline p-1 text-start text-lg font-bold text-accent hover:text-gray-200 h-7 md:h-8"
        >
          <Link href={routes.CATALOG().path}>{routes.CATALOG().title}</Link>
        </Button>
      </CardHeader>
      <CardContent className="px-2 md:px-4 lg:px-6">
        <Button
          asChild
          variant="link"
          className="hover:no-underline p-1 font-bold text-accent hover:text-gray-200 h-auto"
        >
          <Link href={routes.COLLESCTIONS().path}>
            {routes.COLLESCTIONS().title}
          </Link>
        </Button>
      </CardContent>
      <CardFooter className="px-2 md:px-4 lg:px-6">
        <Button
          size="sm"
          variant="secondary"
          className="cursor-pointer mt-2 px-2 md:px-4 lg:px-6"
        >
          Сделать заказ
        </Button>
      </CardFooter>
    </Card>
  )
}

export { CatalogNavigation }
