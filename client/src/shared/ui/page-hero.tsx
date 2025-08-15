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
      className={cn(`relative flex flex-col`, className)}
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
      className={cn("absolute inset-0 w-full h-full -z-1", className)}
      {...props}
    />
  )
}

const PageHeroContent = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      id="container-content"
      className={cn("relative flex-0 grow-1 p-2 lg:p-4", className)}
      {...props}
    />
  )
}

export { PageHero, PageHeroBackground, PageHeroContent }
