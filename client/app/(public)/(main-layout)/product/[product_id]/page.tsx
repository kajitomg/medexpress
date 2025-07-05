"use client"

import ProductItemTemp from "./temp"

const ProductItem = async ({
  params,
}: {
  params: Promise<{ product_id: string }>
}) => {
  const { product_id } = await params

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-auto">
        <main className="flex flex-col items-center">
          <ProductItemTemp product_id={product_id} />
        </main>
      </div>
    </div>
  )
}

export default ProductItem
