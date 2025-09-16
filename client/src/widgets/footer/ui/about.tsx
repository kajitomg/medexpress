import { routes } from "@/shared/config/routes"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { FooterAbout } from "@/shared/model/strapi/elements/footer-about"
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Logo,
  Typography,
} from "@/shared/ui"
import DynamicIcon from "@/shared/ui/dynamic-icon"
import Link from "next/link"
import * as React from "react"

interface AboutProps {
  data?: FooterAbout
}

const About = ({ data }: AboutProps) => {
  return (
    <Card className="bg-transparent border-none shadow-none gap-y-1 sm:gap-y-2 py-2 sm:py-4 md:py-6">
      <CardHeader className="justify-start px-2 md:px-4 lg:px-6">
        <Logo
          path={routes.MAIN.path}
          url={data?.logo.image?.url}
          className="fill-foreground p-2 h-10 lg:h-10"
        />
      </CardHeader>
      <CardContent className=" px-2 md:px-4 lg:px-6">
        <CardTitle>
          <Typography variant="small">{data?.caption}</Typography>
        </CardTitle>
      </CardContent>
      <CardFooter className="flex gap-2 px-2 md:px-4 lg:px-6">
        {data?.social.body?.map((item) => (
          <Link key={item.id} href={item.url}>
            <Button
              variant="link"
              size="icon"
              className="cursor-pointer text-foreground hover:text-gray-200 cursor-pointer h-auto"
            >
              <DynamicIcon
                url={imageUrlBuilder(item.icon?.url)}
                className="size-5"
              />
            </Button>
          </Link>
        ))}
      </CardFooter>
    </Card>
  )
}

export { About }
