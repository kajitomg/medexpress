"use client"

import { CategoryBase, CategoryOptions } from "@/entities/category/model"
import {
  useCatalogOptionsStore,
  useCategoriesListStore,
} from "@/features/catalog/store"
import { cn } from "@/shared/lib"
import { DocumentServices } from "@/shared/model"
import Link from "next/link"
import { useEffect } from "react"

const ClientAside = ({
  category_id,
  initialCategories,
}: {
  category_id: string
  initialCategories?: (CategoryBase & CategoryOptions & DocumentServices)[]
}) => {
  const { categories, setCategories, fetchCategories } = useCategoriesListStore(
    (state) => state
  )
  const { changeSearchQuery } = useCatalogOptionsStore((state) => state)

  useEffect(() => {
    if (initialCategories) setCategories(initialCategories)
    else fetchCategories()
  }, [initialCategories])

  const callbacks = {
    resetOptions: () => {
      changeSearchQuery(null)
    },
  }

  return (
    <nav className="max-w-80 max-h-[calc(100vh-80px)] overflow-auto p-2">
      <ul className="flex flex-col">
        {categories?.map((category) => (
          <li key={category.id}>
            <div>
              <button
                className={cn(
                  "grid grid-flow-col justify-between w-full gap-2 items-start cursor-pointer text-sm text-left row-start-1 hover:text-[#93A79E]",
                  +category_id === category.id && "text-red-500"
                )}
              >
                <Link
                  href={`/catalog/${category.id}`}
                  onClick={callbacks.resetOptions}
                >
                  <span className="min-h-7 font-semibold leading-5">
                    {category.title}
                  </span>
                </Link>
              </button>
              <ul className="flex flex-col pl-2 my-1">
                {category.childrens.map((sub_category) => (
                  <li
                    key={sub_category.id}
                    className={cn(
                      "my-1",
                      +category_id !== category.id &&
                        !category.childrens.some(
                          (value) => value.id === +category_id
                        ) &&
                        "h-0 overflow-hidden hidden"
                    )}
                  >
                    <button
                      className={cn(
                        "cursor-pointer text-left text-sm font-extralight leading-4 hover:text-[#93A79E]",
                        +category_id === sub_category.id && "text-red-500"
                      )}
                    >
                      <Link
                        href={`/catalog/${sub_category.id}`}
                        onClick={callbacks.resetOptions}
                      >
                        <span>{sub_category.title}</span>
                      </Link>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { ClientAside }
