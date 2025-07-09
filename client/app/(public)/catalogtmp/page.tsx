"use client"

import { useCategoriesListStore } from "@/features/catalog/store/categories-list-store"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { ChevronRight, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

const Catalog = () => {
  const { categories, fetchCategories } = useCategoriesListStore(
    (state) => state
  )
  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-auto">
        <main>
          <div className="relative flex justify-center items-center h-50">
            <h1 className="text-5xl text-center hover:scale-102 transition-transform duration-200 cursor-default">
              <strong>Каталог</strong>
            </h1>
          </div>
          <div className="m-auto px-4 flex max-w-400 items-center space-x-2 w-full">
            <Input
              variant="brand"
              placeholder="Поиск по каталогу"
              className="w-100"
            />
            <Button
              type="submit"
              variant="brand"
              className="rounded-full cursor-pointer"
            >
              <Search />
              Найти
            </Button>
          </div>
          <ul className="m-auto my-8 p-4 grid auto-cols-auto 2xl:grid-cols-2 max-w-400 gap-4">
            {categories.map((category) => (
              <li key={category.id} className="flex gap-4">
                <Image
                  src="/oborud.png"
                  alt="alt"
                  width="200"
                  height="200"
                  className="w-auto h-60 object-cover rounded-2xl"
                />
                <div>
                  <Button
                    asChild
                    variant="link"
                    className="grid grid-flow-col justify-between w-full h-auto p-0 gap-2 items-start text-lg font-black cursor-pointer text-left row-start-1 whitespace-normal hover:no-underline hover:text-[#93A79E]"
                  >
                    <Link href={`/client/app1/catalog/${category.id}`}>
                      <span className="min-h-7">{category.title}</span>
                      <div className="flex items-center justify-center h-7">
                        <ChevronRight />
                      </div>
                    </Link>
                  </Button>
                  <ul className="grid grid-cols-3 gap-2 py-4 row-start-2">
                    {category.childrens.map((sub_category) => (
                      <li key={sub_category.id}>
                        <Button
                          asChild
                          variant="link"
                          className="cursor-pointer text-left text-sm font-extralight h-auto p-0 whitespace-normal hover:no-underline hover:text-[#93A79E]"
                        >
                          <Link href={`/client/app1/catalog/${category.id}`}>
                            <span>{sub_category.title}</span>
                          </Link>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  )
}

export default Catalog
