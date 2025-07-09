import { fetchAllProducts } from "@/entities/product/services"
import { CatalogList } from "@/widgets/catalog/catalog-list"
import { CatalogOptions } from "@/widgets/catalog/catalog-options"

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ category_id: string }>
  searchParams: Promise<{ sort: string }>
}) => {
  const { category_id } = await params
  const search = await searchParams
  const products =
    (await fetchAllProducts(
      [+category_id],
      search?.options
        ? JSON.parse(JSON.parse(search?.options)).state.searchQuery
        : null
    )) || []

  return (
    <div className="p-2">
      <div className="relative flex justify-center items-center h-50">
        <h1 className="text-5xl text-center hover:scale-102 transition-transform duration-200 cursor-default">
          <strong>Каталог</strong>
        </h1>
      </div>
      <CatalogOptions />
      <CatalogList category_id={category_id} initProducts={products} />
    </div>
  )
}
export default Page
