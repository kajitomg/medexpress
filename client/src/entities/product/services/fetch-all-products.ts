import { fetchProducts } from "@/entities/product/api/product"
import { DocumentId } from "@/shared/model/document"

export const fetchAllProducts = async (
  page: number = 1,
  categories: DocumentId[] = [],
  search?: string | null
) => {
  try {
    return await fetchProducts([], page, categories, search)
  } catch (e) {
    console.error(e)
  }
}
