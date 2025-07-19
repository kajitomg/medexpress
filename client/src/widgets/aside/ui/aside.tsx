import { fetchAllCategories } from "@/entities/category/services"
import { AsideList } from "@/widgets/aside/ui/aside-list"

interface AsideProps {
  params: Promise<{ category_id: string }>
}

const Aside = async ({ params }: AsideProps) => {
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

export { Aside }
