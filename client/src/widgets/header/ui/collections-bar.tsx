import { fetchNavigationCollectionsList } from "@/entities/collection/services"
import { CollectionsListProvider } from "@/features/catalog/provider"
import { routes } from "@/shared/config/routes"
import { cn } from "@/shared/lib"
import { Button } from "@/shared/ui"
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area"
import { CollectionsList } from "@/widgets/header/ui/collections-list"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { ComponentProps } from "react"

const CollectionsBar = async ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const responseCollections = await fetchNavigationCollectionsList()

  const collections = responseCollections.data

  return (
    <CollectionsListProvider initialState={{ collections }}>
      <div
        className={cn("w-full flex items-center px-4", className)}
        {...props}
      >
        <ScrollArea className="flex-1 min-w-0 rounded-sm pb-3 pr-2">
          <CollectionsList
            collections={collections}
            className="flex gap-1 whitespace-nowrap"
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Button
          variant="ghost"
          size="icon"
          className="font-bold backdrop-blur-3xl hover:text-(--color-brand) cursor-pointer mb-3"
        >
          <Link href={routes.COLLESCTIONS().path}>
            <ChevronRight />
          </Link>
        </Button>
      </div>
    </CollectionsListProvider>
  )
}

export { CollectionsBar }
