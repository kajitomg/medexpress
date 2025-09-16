import { cn } from "@/shared/lib"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import DynamicIcon from "@/shared/ui/dynamic-icon"
import { Button } from "@/shared/ui/index"
import Link from "next/link"
import * as React from "react"
import { ComponentProps } from "react"
import LogoIcon from "../../../public/logo.svg"

interface LogoProps {
  path: string
  url?: string
}

const Logo = ({
  path,
  url,
  className,
  ...props
}: ComponentProps<"button"> & LogoProps) => {
  return (
    <Button
      asChild
      variant="link"
      size="icon"
      className={cn(
        "bg-transparent text-xl font-black hover:no-underline p-0 w-auto",
        className
      )}
      {...props}
    >
      <Link href={path}>
        {url ? (
          <DynamicIcon
            url={imageUrlBuilder(url)}
            className="size-full text-foreground"
          />
        ) : (
          <LogoIcon className="size-full" />
        )}
      </Link>
    </Button>
  )
}

export { Logo }
