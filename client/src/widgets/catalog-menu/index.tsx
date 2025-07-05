"use client"

import { useCategoriesListStore } from "@/features/catalog/store"
import { cn } from "@/shared/lib"
import { Button } from "@/shared/ui"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export const CatalogMenu = () => {
  const [categoryIndex, setCategoryIndex] = useState<number>(0)
  const { categories, fetchCategories } = useCategoriesListStore(
    (state) => state
  )
  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className="flex w-300 max-h-[calc(100vh-100px)] gap-8">
      <div className="flex flex-col items-center justify-center gap-8">
        <div>
          <Image
            src="/oborud.png"
            alt="alt"
            width="100"
            height="100"
            className="h-auto w-60 object-cover rounded-2xl"
          />
        </div>
        <div className="flex-auto overflow-y-auto">
          <ul className="w-80">
            {categories?.map((category, i) => (
              <li
                key={category.id}
                onMouseEnter={() => {
                  setCategoryIndex(i)
                }}
                className={cn(
                  "flex flex-col my-1 p-2 py-1.5 rounded-lg bg-gray-100",
                  i === categoryIndex && "bg-gray-200"
                )}
              >
                <Button
                  asChild
                  variant="link"
                  className="whitespace-normal h-auto"
                >
                  <Link href={`/catalog/${category.id}`}>{category.title}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-auto overflow-y-auto">
        <ul className="gap-2 p-4 columns-3">
          {categories?.[categoryIndex]?.childrens?.map((category) => (
            <li key={category.id}>
              <Button
                asChild
                variant="link"
                className="whitespace-normal justify-start h-auto bg-gray-100 w-full mb-2"
              >
                <Link href={`/catalog/${category.id}`}>{category.title}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
