import { cn } from "@/shared/lib"
import { Slot } from "@radix-ui/react-slot"
import * as React from "react"

const Subtitle = ({
  children,
  className,
  asChild,
  ...props
}: React.ComponentProps<"span"> & {
  asChild?: boolean
}) => {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp className={cn("text-xl text-gray-400 ", className)} {...props}>
      {children}
    </Comp>
  )
}

export { Subtitle }
