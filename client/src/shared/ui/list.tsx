import { cn } from "@/shared/lib"
import { Slot } from "@radix-ui/react-slot"
import * as React from "react"
import { ReactNode } from "react"

interface ListProps<T> {
  asChild?: true
  items?: T[]
  renderItem: (item: T, i: number) => ReactNode
}

function List<T>({
  asChild,
  items,
  renderItem,
  className,
  ...props
}: React.ComponentProps<"div"> & ListProps<T>) {
  const Component = asChild ? Slot : "div"

  return (
    <Component className={cn("flex flex-col", className)} {...props}>
      {items?.map((item, i) => renderItem(item, i))}
    </Component>
  )
}

export { List }
