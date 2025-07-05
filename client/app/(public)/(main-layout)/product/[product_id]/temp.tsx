"use client"

import { useProductDetailsStore } from "@/features/product-details/store"
import { Button } from "@/shared/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

const ProductItemTemp = ({ product_id }: { product_id: string }) => {
  const { product, fetchOneProduct } = useProductDetailsStore((state) => state)

  useEffect(() => {
    fetchOneProduct(product_id)
  }, [fetchOneProduct, product_id])

  return (
    <div className="flex flex-col max-w-400">
      <div data-slot="hero" className="flex">
        <div data-slot="gallery" className="basis-1/2">
          <div className="max-h-160 w-full overflow-hidden rounded-4xl">
            <Image
              src="/oborud.png"
              alt="alt"
              width="800"
              height="800"
              className="w-full max-h-160 object-cover"
            />
          </div>
        </div>
        <div data-slot="content" className="basis-1/2">
          <div>
            <ul className="flex flex-wrap">
              {product?.categories?.map((item) => {
                return (
                  <li key={item.id}>
                    <Button className="h-auto p-0.5 px-3 bg-(--color-brand)/80 hover:bg-(--color-brand)">
                      <Link href="/client/app1/productt">
                        <span>{item.title}</span>
                      </Link>
                    </Button>
                  </li>
                )
              })}
            </ul>
            <span>{product?.title}</span>
            <span>{product?.code}</span>
          </div>
          <div>
            <span>{product?.description}</span>
          </div>
          <div>
            <span>{product?.description}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItemTemp
