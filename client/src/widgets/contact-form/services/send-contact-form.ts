import { ContactFormSchema } from "@/widgets/contact-form/model"

const sendContactForm = async (
  body: ContactFormSchema
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

export { sendContactForm }
