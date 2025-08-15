import { fetchNavigationCategoriesList } from "@/entities/category/services"
import { CategoriesListProvider } from "@/features/catalog/provider"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { CategoriesList } from "@/widgets/catalog-categories-navigation-sidebar/ui/categories-list"

interface AsideProps {
  category_slug: string
}

const CatalogCategoriesNavigationSidebar = async ({
  category_slug,
}: AsideProps) => {
  const responseCategories = await fetchNavigationCategoriesList()

  const categories = responseCategories.data

  return (
    <CategoriesListProvider initialState={{ categories }}>
      <ScrollArea className="w-80 h-full bg-background border-r-1 border-gray-800/10 p-2 pr-3">
        <div className="font-bold text-(--color-brand) text-xl px-3 pb-2">
          Категории
        </div>
        <CategoriesList
          categories={categories}
          selectedCategory={category_slug}
        />
      </ScrollArea>
    </CategoriesListProvider>
  )
}

export { CatalogCategoriesNavigationSidebar }
