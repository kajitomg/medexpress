"use server"

import { sendMail } from "@/entities/mail/api"
import { ProductBase } from "@/entities/product/model"
import { CartItem } from "@/features/cart/model"
import { ContactFormSchema } from "@/widgets/contact-form/model"
import Mail from "nodemailer/lib/mailer"

const sendCartForm = async (
  // ContactFormSchema невозможная область применения
  body: ContactFormSchema & { cartItems: CartItem<ProductBase>[] }
) => {
  const { firstname, message, cartItems, mode } = body

  const mailOptions: Mail.Options = {
    from: `"Сайт" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "Новый запрос с сайта",
    html: `
      <p><strong>Имя:</strong> ${firstname}</p>
      ${mode === "email" ? `<p><strong>Email:</strong> ${body.email}</p>` : ""}
      ${mode === "phonenumber" ? `<p><strong>Номер телефона:</strong> ${body.phonenumber}</p>` : ""}
      ${message ? `<p><strong>Сообщение:</strong> ${message}</p>` : ""}
      <p><strong>Выбранные товары:</strong></p>
      ${
        cartItems.length
          ? `<ul>
        ${cartItems?.map((item) => `<li>${item.item.title} (код: ${item.item.code}) количество: ${item.count} шт.</li>`).join("")}
      </ul>`
          : "Нет выбранных товаров"
      }
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

export { sendCartForm }
