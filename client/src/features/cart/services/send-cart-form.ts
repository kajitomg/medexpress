import { ProductBase } from "@/entities/product/model"
import { CartData } from "@/features/cart/model/cart"
import { ContactFormSchema } from "@/features/contact-form/model"

const sendCartForm = async (
  body: ContactFormSchema & {
    products?: CartData<ProductBase | undefined>[]
  }
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch("/api/send-contact-form-with-product-list", {
      method: "POST",
      body: JSON.stringify(body),
    })
    return await response.json()
  } catch (err) {
    console.error("Ошибка отправки письма:", err)
    return { success: false, message: "Ошибка при отправке запроса" }
  }
}

export { sendCartForm }
