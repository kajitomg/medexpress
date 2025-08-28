import { fetchDetailProductItemBySlug } from "@/entities/product/services"
import { ProductDetailsProvider } from "@/features/product-details/provider"
import * as React from "react"

const RootLayout = async ({
  params,
  children,
}: {
  params: Promise<{ product_slug: string }>
  children: React.ReactNode
}) => {
  const { product_slug } = await params

  const response = await fetchDetailProductItemBySlug(product_slug)

  const product = response.data

  return (
    <ProductDetailsProvider initialState={{ product }}>
      {children}
    </ProductDetailsProvider>
  )
}

export default RootLayout
