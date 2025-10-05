import { ProductBase } from "@/entities/product/model"
import { CartData } from "@/features/cart/model/cart"
import { DocumentServices } from "@/shared/model"
import { ContactFormSchema } from "@/widgets/contact-form/model"

const sendCartForm = async (
  // ContactFormSchema невозможная область применения
  body: ContactFormSchema & {
    products?: CartData<(ProductBase & DocumentServices) | undefined>[]
  }
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch("api/send-cart-form", {
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
