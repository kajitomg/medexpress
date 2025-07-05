import CatalogItemTemp from "./temp"

const CatalogItem = async ({
  params,
}: {
  params: Promise<{ category_id: string }>
}) => {
  const { category_id } = await params

  return (
    <div className="grid grid-flow-col flex-auto">
      <CatalogItemTemp category_id={category_id} />
    </div>
  )
}

export default CatalogItem
