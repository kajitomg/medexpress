import { CollectionBase } from "@/entities/collection/model/collection"
import { fetchNavigationCollectionsList } from "@/entities/collection/services"
import { routes } from "@/shared/config/routes"
import { Button, List } from "@/shared/ui"
import Link from "next/link"

const HeaderCollections = async () => {
  const collections = await fetchNavigationCollectionsList()

  const renders = {
    collectionItem: (item: CollectionBase) => (
      <Button
        key={item.id}
        variant="ghost"
        size="sm"
        className="font-bold bg-white"
      >
        <Link href={routes.COLLESCTIONS(item.id).path}>{item.title}</Link>
      </Button>
    ),
  }

  return (
    <div className="w-full flex items-center h-12 px-4">
      <List
        items={collections.data}
        renderItem={renders.collectionItem}
        className="flex gap-1 overflow-y-auto scrollbar-hide"
      />
    </div>
  )
}

export { HeaderCollections }
