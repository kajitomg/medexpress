"use server"

import { sendMail } from "@/entities/mail/api"
import { Body, BodyEmail, BodyPhonenumber } from "@/entities/mail/model"
import Mail from "nodemailer/lib/mailer"

const sendContactFormMail = async (
  body: Body & (BodyEmail | BodyPhonenumber)
) => {
  const { firstname, message, type, phonenumber, email } = body

  const mailOptions: Mail.Options = {
    from: `"Сайт" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "Новый запрос с сайта",
    html: `
      <p><strong>Имя:</strong> ${firstname}</p>
      ${type === "email" ? `<p><strong>Email:</strong> ${email}</p>` : ""}
      ${type === "phonenumber" ? `<p><strong>Номер телефона:</strong> ${phonenumber}</p>` : ""}
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

export { sendContactFormMail }
