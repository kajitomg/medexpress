import { NavigationMenuLink } from "@/shared/ui"
import Link from "next/link"
import { ComponentProps } from "react"

interface CategoryItemProps {
  href: string
}

function CategoryItem({
  title,
  children,
  href,
  ...props
}: ComponentProps<"li"> & CategoryItemProps) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export { CategoryItem }
