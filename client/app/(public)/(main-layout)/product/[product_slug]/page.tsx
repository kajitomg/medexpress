import { fetchDetailProductItemBySlug } from "@/entities/product/services/fetch-detail-product-item-by-slug"
import { ProductDetailsProvider } from "@/features/product-details/provider/product-details-provider"
import { ProductPage } from "@/pages/product/ui"
import { NextPage } from "next"

interface ProductPageProps {
  params: Promise<{ product_slug: string }>
}

const Page: NextPage<ProductPageProps> = async ({ params }) => {
  const { product_slug } = await params

  const response = await fetchDetailProductItemBySlug(product_slug)

  const product = response.data

  return (
    <ProductDetailsProvider initialState={{ product }}>
      <ProductPage />
    </ProductDetailsProvider>
  )
}

export default Page
