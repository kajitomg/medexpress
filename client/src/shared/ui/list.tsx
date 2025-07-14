import { cn } from "@/shared/lib"
import * as React from "react"
import { JSX, ReactNode } from "react"

interface ListProps<T> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  items?: T[]
  renderItem: (item: T, i: number) => ReactNode
}

function List<T>({
  as: Component = "div",
  items,
  renderItem,
  className,
  ...props
}: React.ComponentProps<"div"> & ListProps<T>) {
  return (
    <Component data-slot="list" className={cn(className)} {...props}>
      {items?.map((item, i) => renderItem(item, i))}
    </Component>
  )
}

export { List }
