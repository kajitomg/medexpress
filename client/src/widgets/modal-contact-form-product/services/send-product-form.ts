import { ProductBase } from "@/entities/product/model"
import { DocumentServices } from "@/shared/model"
import { ContactFormSchema } from "@/widgets/contact-form/model"

const sendProductForm = async (
  // ContactFormSchema невозможная область применения
  body: ContactFormSchema & {
    product?: ProductBase & DocumentServices
  }
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch("/api/send-product-form", {
      method: "POST",
      body: JSON.stringify(body),
    })
    return await response.json()
  } catch (err) {
    console.error("Ошибка отправки письма:", err)
    return { success: false, message: "Ошибка при отправке запроса" }
  }
}

export { sendProductForm }
