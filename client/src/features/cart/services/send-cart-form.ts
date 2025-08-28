import { ProductBase } from "@/entities/product/model"
import { CartItem } from "@/features/cart/model"
import { ContactFormSchema } from "@/widgets/contact-form/model"

const sendCartForm = async (
  // ContactFormSchema невозможная область применения
  body: ContactFormSchema & { cartItems: CartItem<ProductBase>[] }
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch("api/send-contact-form", {
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
