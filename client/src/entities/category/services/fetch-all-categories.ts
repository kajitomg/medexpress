import { fetchCategories } from "@/entities/category/api/category"
import { CategoryOptions } from "@/entities/category/model"
import { listToTree } from "@/shared/lib/list-to-tree"

export const fetchAllCategories = async () => {
  try {
    const response = (await fetchCategories()) || []

    response.sort((a, b) => +a.code - +b.code)

    return listToTree<(typeof response)[0], CategoryOptions>(
      response,
      "parent",
      "documentId"
    )
  } catch (e) {
    console.error(e)
  }
}
