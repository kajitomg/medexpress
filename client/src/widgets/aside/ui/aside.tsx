import { fetchNavigationCategoriesList } from "@/entities/category/services/fetch-navigation-categories-list"
import { AsideList } from "@/widgets/aside/ui/aside-list"

interface AsideProps {
  params: Promise<{ category_id: string }>
}

const Aside = async ({ params }: AsideProps) => {
  const { category_id } = await params
  const categories = await fetchNavigationCategoriesList()

  return (
    <div className="w-80 h-full overflow-y-auto pl-2 py-5">
      <AsideList
        categories={categories.data || []}
        selectedCategory={+category_id}
      />
    </div>
  )
}

export { Aside }
