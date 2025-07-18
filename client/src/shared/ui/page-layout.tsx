import { cn } from "@/shared/lib"
import * as React from "react"
import { ComponentProps } from "react"

const PageLayout = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "relative w-full h-full min-h-[100vh] flex flex-col",
        className
      )}
      {...props}
    />
  )
}

const PageLayoutContent = ({
  className,
  headerHeight,
  asideWidth,
  ...props
}: ComponentProps<"section"> &
  Readonly<{
    headerHeight: number
    asideWidth?: number
  }>) => {
  return (
    <section
      id="content-section"
      className={cn("flex flex-col flex-auto", className)}
      style={{
        marginTop: `${headerHeight}px`,
        ...(asideWidth ? { marginLeft: `${asideWidth}px` } : {}),
      }}
      {...props}
    />
  )
}

const PageLayoutAside = ({
  headerHeight,
  className,
  ...props
}: ComponentProps<"section"> &
  Readonly<{
    headerHeight: number
  }>) => {
  return (
    <section
      id="aside-section"
      className={cn("fixed h-[100vh]", className)}
      style={{ paddingTop: `${headerHeight}px` }}
      {...props}
    />
  )
}

const PageLayoutMain = ({ className, ...props }: ComponentProps<"main">) => {
  return (
    <main id="main-section" className={cn("flex-auto", className)} {...props} />
  )
}

const PageLayoutHeader = ({
  className,
  ...props
}: ComponentProps<"section">) => {
  return (
    <section
      id="header-section"
      className={cn("z-50 fixed w-full", className)}
      {...props}
    />
  )
}

const PageLayoutFooter = ({ ...props }: ComponentProps<"section">) => {
  return <section id="footer-section" {...props} />
}

export {
  PageLayout,
  PageLayoutContent,
  PageLayoutAside,
  PageLayoutMain,
  PageLayoutHeader,
  PageLayoutFooter,
}
