import { CategoryBase } from "@/entities/category/model"
import { ProductBase } from "@/entities/product/model"
import { routes } from "@/shared/config/routes"
import { Button } from "@/shared/ui"
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card"
import { List } from "@/shared/ui/list"
import { Loader2Icon, Plus, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

interface CatalogItemProps {
  product: ProductBase
  isInCart: boolean
  onActionButton: () => void
  isClient: boolean
}

const CatalogItem = ({
  product,
  isInCart = false,
  onActionButton,
  isClient,
}: CatalogItemProps) => {
  const categories = [...(product.categories || [])].sort(
    (a, b) => +a.code - +b.code
  )

  const renders = {
    categoryItem: (category: CategoryBase) => (
      <Button
        asChild
        key={category.id}
        variant="secondary"
        size="sm"
        className="max-w-full justify-start truncate text-xs cursor-pointer"
      >
        <Link href={routes.CATALOG(category.id).path}>{category.code}</Link>
      </Button>
    ),
  }

  return (
    <Card>
      <CardHeader>
        <Image
          src="/oborud.png"
          alt="alt"
          width="300"
          height="300"
          className="w-full h-full object-cover"
        />
      </CardHeader>
      <CardContent className="flex-auto flex flex-col gap-4">
        <div className="flex justify-end"></div>
        <span className="font-bold">{product.title}</span>
        <List
          items={categories}
          renderItem={renders.categoryItem}
          className="block space-x-1 space-y-1"
        />
        <div className="line-clamp-4 font-light text-sm text-gray-500">
          {product.description}
        </div>
      </CardContent>
      <CardFooter className="justify-between items-end">
        <span className="text-xs text-gray-500">{product.code}</span>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="cursor-pointer"
            onClick={onActionButton}
            disabled={!isClient}
          >
            {!isClient && (
              <>
                <Loader2Icon className="animate-spin" />
                Загрузка
              </>
            )}
            {isClient && isInCart && (
              <>
                Удалить
                <X />
              </>
            )}
            {isClient && !isInCart && (
              <>
                В корзину
                <Plus />
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export { CatalogItem }
