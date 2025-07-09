import { fetchAllCategories } from "@/entities/category/services"
import { AsideList } from "@/widgets/asidetmp/aside-list"
import { ComponentProps } from "react"

interface AsidetmpProps {
  params: Promise<{ category_id: string }>
}

const Asidetmp = async ({ params }: ComponentProps<"div"> & AsidetmpProps) => {
  const { category_id } = await params
  const categories = await fetchAllCategories()

  return (
    <div className="w-80 h-full overflow-y-auto pl-2 py-5">
      <AsideList
        categories={categories || []}
        selectedCategory={+category_id}
      />
    </div>
  )
}

export { Asidetmp }
