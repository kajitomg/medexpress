import { fetchDetailProductItem } from "@/entities/product/services"
import { ProductDetailsProvider } from "@/features/product-details/provider/product-details-provider"
import { ProductPage } from "@/pages/product/ui"
import { NextPage } from "next"

interface ProductPageProps {
  params: Promise<{ product_id: string }>
}

const Page: NextPage<ProductPageProps> = async ({ params }) => {
  const { product_id } = await params

  const response = await fetchDetailProductItem(product_id)

  const product = response.data

  return (
    <ProductDetailsProvider initialState={{ product }}>
      <ProductPage />
    </ProductDetailsProvider>
  )
}

export default Page
