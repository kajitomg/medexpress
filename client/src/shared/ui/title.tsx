import { cn } from "@/shared/lib"
import { Slot } from "@radix-ui/react-slot"
import * as React from "react"

const Title = ({
  children,
  className,
  asChild,
  ...props
}: React.ComponentProps<"h1"> & {
  asChild?: boolean
}) => {
  const Comp = asChild ? Slot : "h1"

  return (
    <Comp className={cn("text-5xl", className)} {...props}>
      {children}
    </Comp>
  )
}

export { Title }
