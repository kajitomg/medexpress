import { cn } from "@/shared/lib"
import * as React from "react"
import { ReactNode } from "react"

type BoxProps<C extends React.ElementType> = {
  as?: C
}

type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = object,
> = BoxProps<C> & Props & Omit<React.ComponentProps<C>, keyof BoxProps<C>>

interface ListProps<T> {
  items?: T[] | null
  renderItem: (item: T, i: number) => ReactNode
}

function List<T, C extends React.ElementType = "div">({
  as,
  items,
  renderItem,
  className,
  ...props
}: ListProps<T> & PolymorphicComponentProps<C>) {
  const Component = as || "div"
  return (
    <Component data-slot="list" className={cn(className)} {...props}>
      {items?.map((item, i) => renderItem(item, i))}
    </Component>
  )
}

export { List }
