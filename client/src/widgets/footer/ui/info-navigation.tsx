import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui"
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu"
import Link from "next/link"
import * as React from "react"

const InfoNavigation = ({ className, ...props }: NavigationMenuProps) => {
  return (
    <Card
      className={cn(
        "bg-transparent border-none shadow-none justify-start gap-y-1 sm:gap-y-2 py-2 sm:py-4 md:py-6",
        className
      )}
      {...props}
    >
      <CardHeader className="justify-start px-2 md:px-4 lg:px-6">
        <CardTitle className="p-1 text-start text-lg font-bold text-accent h-7 md:h-8">
          Информация
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-start px-2 md:px-4 lg:px-6">
        <Button
          asChild
          variant="link"
          className="hover:no-underline p-1 font-bold text-accent hover:text-gray-200 h-auto"
        >
          <Link href={routes.ABOUT.path}>{routes.ABOUT.title}</Link>
        </Button>
        <Button
          asChild
          variant="link"
          className="hover:no-underline p-1 font-bold text-accent hover:text-gray-200 h-auto"
        >
          <Link href={routes.CONTACTS.path}>{routes.CONTACTS.title}</Link>
        </Button>
        <Button
          asChild
          variant="link"
          className="hover:no-underline p-1 font-bold text-accent hover:text-gray-200 h-auto"
        >
          <Link href={routes.SITEMAP.path}>{routes.SITEMAP.title}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export { InfoNavigation }
