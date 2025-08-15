import { CategoryBase } from "@/entities/category/model"
import { DocumentServices } from "@/shared/model"
import { List } from "@/shared/ui"

interface CategoriesListProps {
  categories?: (CategoryBase & DocumentServices)[]
}

const CategoriesList = ({ categories }: CategoriesListProps) => {
  const renderCategoryItem = (item: CategoryBase & DocumentServices) => (
    <div>{item.title}</div>
  )

  return (
    <List
      items={categories}
      renderItem={renderCategoryItem}
      className="flex flex-col gap-2"
    />
  )
}

export { CategoriesList }
