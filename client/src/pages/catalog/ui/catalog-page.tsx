import { ProductBase } from "@/entities/product/model"
import { routes } from "@/shared/config/routes"
import { PageHeroRoutes } from "@/shared/ui"
import { Catalog } from "@/widgets/catalog/ui"

interface CatalogPageProps {
  category_id: string
  initProducts: ProductBase[]
  initSearchQuery: string | null
  initMaxPages: number | null
}

const CatalogPage = ({
  category_id,
  initMaxPages,
  initProducts,
  initSearchQuery,
}: CatalogPageProps) => {
  return (
    <div className="p-2">
      <PageHeroRoutes page={routes.CATALOG(category_id)} />
      <Catalog
        category_id={category_id}
        initProducts={initProducts}
        initSearchQuery={initSearchQuery}
        initMaxPages={initMaxPages}
      />
    </div>
  )
}
export { CatalogPage }
