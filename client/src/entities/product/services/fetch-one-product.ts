import { fetchProduct } from "@/entities/product/api/product"

export const fetchOneProduct = async (documentId: string) => {
  try {
    return await fetchProduct(documentId)
  } catch (e) {
    console.error(e)
  }
}
