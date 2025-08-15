"use server"

import { sendMail } from "@/entities/mail/api"
import { ContactFormSchema } from "@/widgets/contact-form/model"
import Mail from "nodemailer/lib/mailer"

const sendContactForm = async (body: ContactFormSchema) => {
  const { firstname, message, mode } = body

  const mailOptions: Mail.Options = {
    from: `"Сайт" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "Новый запрос с сайта",
    html: `
      <p><strong>Имя:</strong> ${firstname}</p>
      ${mode === "email" ? `<p><strong>Email:</strong> ${body.email}</p>` : ""}
      ${mode === "phonenumber" ? `<p><strong>Номер телефона:</strong> ${body.phonenumber}</p>` : ""}
      ${message ? `<p><strong>Сообщение:</strong> ${message}</p>` : ""}
    `,
  }
  try {
    await sendMail(mailOptions)
    return { success: true, message: "Запрос успешно отправлен" }
  } catch (err) {
    console.error("Ошибка отправки письма:", err)
    return { success: false, message: "Ошибка при отправке запроса" }
  }
}

export { sendContactForm }
