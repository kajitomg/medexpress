import { routes } from "@/shared/config/routes"
import { Button } from "@/shared/ui"
import { Logo } from "@/shared/ui/logo"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import * as React from "react"

interface FooterAboutProps {}

const FooterAbout = ({}: FooterAboutProps) => {
  return (
    <div className="flex flex-col items-start">
      <Logo
        title="Medexpress"
        path={routes.MAIN.path}
        className="text-accent"
      />
      <div className="mt-3">
        <span className="text-accent text-sm">
          Ваш надежный партнер в мире медицинского оборудования с 2010 года
        </span>
        <div>
          <Button
            variant="link"
            className="text-accent hover:text-gray-200 cursor-pointer"
          >
            <Instagram />
          </Button>
          <Button
            variant="link"
            className="text-accent hover:text-gray-200 cursor-pointer"
          >
            <Twitter />
          </Button>
          <Button
            variant="link"
            className="text-accent hover:text-gray-200 cursor-pointer"
          >
            <Facebook />
          </Button>
          <Button
            variant="link"
            className="text-accent hover:text-gray-200 cursor-pointer"
          >
            <Linkedin />
          </Button>
        </div>
      </div>
    </div>
  )
}

export { FooterAbout }
