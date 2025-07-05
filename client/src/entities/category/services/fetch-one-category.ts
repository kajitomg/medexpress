import { fetchCategory } from "@/entities/category/api/category"

export const fetchOneCategory = async (documentId: string) => {
  try {
    return await fetchCategory(documentId)
  } catch (e) {
    console.error(e)
  }
}
