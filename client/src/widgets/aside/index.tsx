import { fetchAllCategories } from "@/entities/category/services"
import { ClientAside } from "@/widgets/aside/client"

const Aside = async ({
  params,
}: {
  params: Promise<{ category_id: string }>
}) => {
  const { category_id } = await params
  const categories = await fetchAllCategories()

  return (
    <ClientAside category_id={category_id} initialCategories={categories} />
  )
}

export { Aside }
