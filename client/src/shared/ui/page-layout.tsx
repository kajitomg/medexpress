"use client"

import { cn } from "@/shared/lib"
import {
  PageLayoutProvider,
  usePageLayoutStore,
} from "@/shared/provider/page-layout-provider"
import * as React from "react"
import { ComponentProps } from "react"
import { useCallbackRef } from "use-callback-ref"

const PageLayout = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <PageLayoutProvider>
      <div
        id="page-section-root"
        className={cn(
          "relative w-full h-full min-h-[100vh] flex flex-col",
          className
        )}
        {...props}
      />
    </PageLayoutProvider>
  )
}

const PageLayoutContent = ({
  className,
  initOffsetTop,
  initOffsetLeft,
  ...props
}: ComponentProps<"section"> &
  Readonly<{
    initOffsetTop?: number
    initOffsetLeft?: number
  }>) => {
  const offset = usePageLayoutStore((state) => state.offset)

  const offsetLeft = offset.left !== undefined ? offset.left : initOffsetLeft
  const offsetTop = offset.top !== undefined ? offset.top : initOffsetTop

  return (
    <section
      id="content-section"
      className={cn(
        "flex flex-col flex-auto transition-all duration-200",
        className
      )}
      style={{
        marginTop: `${offsetTop}px`,
        marginLeft: `${offsetLeft}px`,
      }}
      {...props}
    />
  )
}

const PageLayoutAside = ({
  initOffsetTop,
  className,
  ...props
}: ComponentProps<"section"> &
  Readonly<{
    initOffsetTop?: number
  }>) => {
  const offset = usePageLayoutStore((state) => state.offset)
  const setOffset = usePageLayoutStore((state) => state.setOffset)
  const aside = useCallbackRef<null | HTMLElement>(null, (newValue) => {
    if (newValue) {
      const observer = new ResizeObserver((entries) => {
        setOffset({ left: entries[0].contentRect.width })
      })
      observer.observe(newValue)
      return () => observer.disconnect()
    }
  })

  const offsetTop = offset.top !== undefined ? offset.top : initOffsetTop

  return (
    <section
      id="aside-section"
      className={cn(
        "z-40 fixed h-[100vh] transition-all duration-200",
        className
      )}
      style={{ paddingTop: `${offsetTop}px` }}
      ref={aside}
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
  const setOffset = usePageLayoutStore((state) => state.setOffset)
  const header = useCallbackRef<null | HTMLElement>(null, (newValue) => {
    if (newValue) {
      const observer = new ResizeObserver((entries) => {
        setOffset({ top: entries[0].contentRect.height })
      })
      observer.observe(newValue)
      return () => observer.disconnect()
    }
  })

  return (
    <section
      id="header-section"
      className={cn("z-50 fixed w-full", className)}
      ref={header}
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
