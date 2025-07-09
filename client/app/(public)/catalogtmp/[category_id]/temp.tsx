"use client"

import { useCartStore } from "@/features/cart/store/cart-store"
import {
  useCatalogOptionsStore,
  useProductsListStore,
} from "@/features/catalog/store"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Separator } from "@/shared/ui/separator"
import { Heart, Plus, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ChangeEvent, useEffect, useState } from "react"

const CatalogItemTemp = ({ category_id }: { category_id: string }) => {
  const { products, fetchAllProducts } = useProductsListStore((state) => state)
  const { addItemToCart } = useCartStore((state) => state)
  const { searchQuery, changeSearchQuery } = useCatalogOptionsStore(
    (state) => state
  )
  const [input, setInput] = useState<string>(searchQuery || "")

  useEffect(() => {
    setInput(searchQuery || "")
  }, [searchQuery])

  useEffect(() => {
    fetchAllProducts(+category_id, searchQuery)
  }, [category_id, searchQuery])

  const callbacks = {
    changeSearch: (e: ChangeEvent<HTMLInputElement>) => {
      setInput(e.currentTarget.value)
    },
    applyOptions: () => {
      changeSearchQuery(input || null)
    },
    resetOptions: () => {
      changeSearchQuery(null)
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grid grid-flow-col flex-auto">
        <main>
          <div className="relative flex justify-center items-center h-50">
            <h1 className="text-5xl text-center hover:scale-102 transition-transform duration-200 cursor-default">
              <strong>Каталог</strong>
            </h1>
          </div>
          <div className="m-auto px-4 flex max-w-400 w-full items-center space-x-2">
            <Input
              type="text"
              variant="brand"
              placeholder="Поиск по каталогу"
              className="w-100"
              value={input}
              onChange={callbacks.changeSearch}
            />
            <Button
              type="button"
              variant="brand"
              className="rounded-full cursor-pointer"
              onClick={callbacks.applyOptions}
            >
              <Search />
              Найти
            </Button>
            <Button
              type="button"
              variant="brand"
              className="rounded-full cursor-pointer"
              disabled={!searchQuery}
              onClick={callbacks.resetOptions}
            >
              Сбросить
            </Button>
          </div>
          <ul className="m-auto my-8 p-4 grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 max-w-full gap-4">
            {products?.map((product) => (
              <li
                key={product.id}
                className="bg-accent rounded-4xl overflow-hidden cursor-pointer"
              >
                <Link href={`/product/${product.documentId}`}>
                  <div className="flex flex-col">
                    <div className="relative w-full h-60">
                      <Image
                        src="/oborud.png"
                        alt="alt"
                        width="200"
                        height="200"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 mb-2 overflow-hidden overflow-x-auto whitespace-nowrap scrollbar-hide">
                        {product.categories?.map((category) => (
                          <Button
                            key={category.id}
                            variant="brand"
                            className="font-bold text-xs rounded-4xl h-auto p-0.5 px-3"
                          >
                            {category.title}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between h-full">
                      <div className="p-4">
                        <span className="flex flex-col font-semibold text-sm text-left mb-2">
                          {product.title}
                          <span className="font-normal mt-1">
                            {product.code}
                          </span>
                        </span>
                        <Separator className="mb-2" />
                        <span className="line-clamp-3 text-gray-600 font-light text-sm">
                          {product.description}
                        </span>
                      </div>
                      <div className="flex justify-end space-x-2 mt-2 p-4">
                        <Button
                          variant="brand"
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault()
                            addItemToCart(product)
                          }}
                        >
                          <Plus />
                        </Button>
                        <Button variant="brand" className="cursor-pointer">
                          <Heart />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  )
}

export default CatalogItemTemp
