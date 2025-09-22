"use client"

import { cn } from "@/shared/lib"
import { usePageLayoutStore } from "@/shared/provider/page-layout-provider"
import * as React from "react"
import { ComponentProps } from "react"

interface PageHeroProps {
  height: number | "full"
  initOffsetTop?: number
}

const PageHero = ({
  height,
  initOffsetTop = 195,
  className,
  ...props
}: ComponentProps<"header"> & PageHeroProps) => {
  const offset = usePageLayoutStore((state) => state.offset)
  const offsetTop = offset.top !== undefined ? offset.top : initOffsetTop

  const full = height === "full"

  return (
    <header
      id="container"
      className={cn(
        `relative flex flex-col transition-all duration-200`,
        className
      )}
      style={{
        minHeight: full ? `calc(100vh - ${offsetTop}px)` : `${height * 4}px`,
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
