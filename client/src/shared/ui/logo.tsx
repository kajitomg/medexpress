import { cn } from "@/shared/lib"
import { Button } from "@/shared/ui/index"
import Link from "next/link"
import * as React from "react"
import { ComponentProps } from "react"
import LogoIcon from "../../../public/logo.svg"

interface LogoProps {
  path: string
}

const Logo = ({
  path,
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
        <LogoIcon className="size-full" />
      </Link>
    </Button>
  )
}

export { Logo }
