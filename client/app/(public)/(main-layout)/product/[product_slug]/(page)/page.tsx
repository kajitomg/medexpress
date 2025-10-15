import { fetchDetailProductItem } from "@/entities/product/services/fetch-detail-product-item"
import { ProductDetailsProvider } from "@/features/product-details/provider"
import { generatePageMetadata } from "@/shared/lib/generate-page-metadata"
import { generateSeoViewport } from "@/shared/lib/generate-seo-viewport"
import { PageLayoutMain } from "@/shared/ui"
import { ProductPage } from "@/views/product/ui"
import { Metadata, NextPage, Viewport } from "next"

interface ProductPageProps {
  params: Promise<{ product_slug: string }>
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { product_slug } = await params

  const response = await fetchDetailProductItem(product_slug)

  const data = response.data

  return generatePageMetadata(data, {
    defaultTitle: data.name || "Страница не найдена",
    defaultDescription: data.description || undefined,
  })
}

export async function generateViewport({
  params,
}: ProductPageProps): Promise<Viewport | string> {
  const { product_slug } = await params

  const response = await fetchDetailProductItem(product_slug)

  const data = response.data

  return generateSeoViewport(data)
}

const Page: NextPage<ProductPageProps> = async ({ params }) => {
  const { product_slug } = await params

  const response = await fetchDetailProductItem(product_slug)

  const product = response.data

  return (
    <ProductDetailsProvider initialState={{ item: product }}>
      <PageLayoutMain>
        <ProductPage />
      </PageLayoutMain>
    </ProductDetailsProvider>
  )
}

export default Page
