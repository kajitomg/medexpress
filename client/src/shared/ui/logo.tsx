import { cn } from "@/shared/lib"
import { Button } from "@/shared/ui/index"
import Link from "next/link"
import * as React from "react"
import { ComponentProps } from "react"

interface LogoProps {
  title: string
  path: string
}

const Logo = ({
  title,
  path,
  className,
  ...props
}: ComponentProps<"button"> & LogoProps) => {
  return (
    <Button
      asChild
      variant="link"
      className={cn("text-xl font-black hover:no-underline p-0", className)}
      {...props}
    >
      <Link href={path}>{title}</Link>
    </Button>
  )
}

export { Logo }
