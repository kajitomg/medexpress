import { cn } from "@/shared/lib"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import * as React from "react"
import { ComponentProps } from "react"

interface PageHeroProps {
  height: number | "full"
  image?: string | StaticImport
}

const PageHero = ({
  height,
  className,
  ...props
}: ComponentProps<"header"> & PageHeroProps) => {
  const full = height === "full"

  return (
    <header
      id="container"
      className={cn(
        `relative`,
        full ? "h-[calc(100vh-80px)]" : `h-${height}`,
        className
      )}
      {...props}
    />
  )
}

const PageHeroBackground = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      id="container-background"
      className={cn("absolute inset-0 w-full h-full", className)}
      {...props}
    />
  )
}

const PageHeroContent = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      id="container-content"
      className={cn("absolute w-full h-full", className)}
      {...props}
    />
  )
}

export { PageHero, PageHeroBackground, PageHeroContent }
