import { ProductBase } from "@/entities/product/model"
import { ContactFormSchema } from "@/features/contact-form/model"

const sendContactFormWithProduct = async (
  body: ContactFormSchema & {
    product?: ProductBase
  }
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch("/api/send-contact-form-with-product-item", {
      method: "POST",
      body: JSON.stringify(body),
    })
    return await response.json()
  } catch (err) {
    console.error("Ошибка отправки письма:", err)
    return { success: false, message: "Ошибка при отправке запроса" }
  }
}

export { sendContactFormWithProduct }
