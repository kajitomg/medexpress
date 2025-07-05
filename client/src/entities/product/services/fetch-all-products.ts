import { fetchProducts } from "@/entities/product/api/product"
import { DocumentId } from "@/shared/model/document"

export const fetchAllProducts = async (
  categories: DocumentId[] = [],
  search?: string | null
) => {
  try {
    return (await fetchProducts([], categories, search)) || []
  } catch (e) {
    console.error(e)
  }
}
