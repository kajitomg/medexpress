import { cn } from "@/shared/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import * as React from "react"

const ContentSection = ({
  children,
  className,
  ...props
}: React.ComponentProps<"section">) => {
  return (
    <section
      className={cn(
        "py-8 sm:py-12 lg:py-24 flex flex-col items-center",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

const ContentSectionContent = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "max-w-7xl first:mt-0 mt-8 md:mt-20 px-4 md:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const ContentSectionHeader = ({
  children,
  className,
  asChild,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp className={cn("max-w-7xl px-4 md:px-8", className)} {...props}>
      {children}
    </Comp>
  )
}

export { ContentSection, ContentSectionContent, ContentSectionHeader }
