import { CollectionBase } from "@/entities/collection/model/collection"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import { Button, List } from "@/shared/ui"
import Link from "next/link"
import { ComponentProps } from "react"

interface CollectionsListProps {
  collections?: (CollectionBase & DocumentServices)[]
}

const CollectionsList = ({
  collections,
  className,
  ...props
}: ComponentProps<"div"> & CollectionsListProps) => {
  const renderCollectionItem = (item: CollectionBase & DocumentServices) => (
    <Button
      key={item.id}
      variant="ghost"
      size="sm"
      className="font-bold backdrop-blur-3xl hover:text-(--color-brand) cursor-pointer"
    >
      <Link href={routes.COLLESCTIONS(item.slug).path}>{item.title}</Link>
    </Button>
  )

  return (
    <List
      items={collections}
      renderItem={renderCollectionItem}
      className={cn("flex gap-1", className)}
      {...props}
    />
  )
}

export { CollectionsList }
