import { routes } from "@/shared/config/routes"
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
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import * as React from "react"

const About = () => {
  return (
    <Card className="bg-transparent border-none shadow-none gap-y-1 sm:gap-y-2 py-2 sm:py-4 md:py-6">
      <CardHeader className="justify-start px-2 md:px-4 lg:px-6">
        <Logo
          path={routes.MAIN.path}
          className="fill-foreground p-2 h-10 lg:h-10"
        />
      </CardHeader>
      <CardContent className=" px-2 md:px-4 lg:px-6">
        <CardTitle>
          <Typography variant="small">
            Ваш надежный партнер в мире медицинского оборудования с 2008 года
          </Typography>
        </CardTitle>
      </CardContent>
      <CardFooter className="flex gap-2 px-2 md:px-4 lg:px-6">
        <Button
          variant="link"
          className="text-foreground hover:text-gray-200 cursor-pointer h-auto"
          size="icon"
        >
          <Instagram className="size-5" />
        </Button>
        <Button
          variant="link"
          className="text-foreground hover:text-gray-200 cursor-pointer h-auto"
          size="icon"
        >
          <Twitter className="size-5" />
        </Button>
        <Button
          variant="link"
          className="text-foreground hover:text-gray-200 cursor-pointer h-auto"
          size="icon"
        >
          <Facebook className="size-5" />
        </Button>
        <Button
          variant="link"
          className="text-foreground hover:text-gray-200 cursor-pointer h-auto"
          size="icon"
        >
          <Linkedin className="size-5" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export { About }
