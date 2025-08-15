import { cn } from "@/shared/lib"
import * as React from "react"
import { ComponentProps } from "react"

interface PageHeroProps {
  height: number | "full"
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
      className={cn(`relative`, className)}
      style={{
        minHeight: full ? "calc(100vh - 128px)" : `${height * 4}px`,
      }}
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
      className={cn("absolute w-full h-full px-2 lg:px-4", className)}
      {...props}
    />
  )
}

export { PageHero, PageHeroBackground, PageHeroContent }
