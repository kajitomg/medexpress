"use client"

import { CategoryBase } from "@/entities/category/model"
import { useProductDetailsStore } from "@/features/product-details/provider/product-details-provider"
import { routes } from "@/shared/config/routes"
import { urlBuilder } from "@/shared/lib/url-builder"
import { Button, List, Title } from "@/shared/ui"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

const ProductPage = () => {
  const product = useProductDetailsStore((state) => state.product)

  const renderCategoryItem = (category: CategoryBase) => (
    <Button
      asChild
      key={category.id}
      variant="secondary"
      size="sm"
      className="max-w-full justify-start truncate text-xs cursor-pointer"
    >
      <Link
        href={routes.CATALOG(category.id).path}
        onClick={(e) => e.stopPropagation()}
      >
        {category.title}
      </Link>
    </Button>
  )

  return (
    <div className="flex flex-row">
      <div className="flex-none basis-200 h-[calc(100vh-80px)] p-5">
        <Image
          src={
            product?.media?.url
              ? urlBuilder(product.media?.url)
              : urlBuilder("/uploads/placeholder_y_Pg_Ly_Fqc_0d8b721762.webp")
          }
          alt="alt"
          width="1024"
          height="683"
          className="w-full h-full rounded-3xl object-cover"
        />
      </div>
      <div className="basis-auto p-5">
        <Title className={"font-bold text-4xl"}>{product?.title}</Title>
        <List
          items={product?.categories}
          renderItem={renderCategoryItem}
          className="block space-x-1 space-y-1"
        />

        <div className="mt-10">
          <div>
            <span className="font-bold text-sm">Артикул: </span>
            <span className="text-sm text-gray-500">{product?.code}</span>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-500">
              {product?.description}
            </span>
          </div>
        </div>
        {/*<div className="mt-10">
        <div>
          <span className="font-bold text-lg">Похожие товары</span>
        </div>
        <div></div>
      </div>
      <div className="mt-10">
        <div>
          <span className="font-bold text-lg">Отзывы</span>
        </div>
        <div></div>
      </div>*/}
      </div>
    </div>
  )
}

export { ProductPage }
