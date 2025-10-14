import { sendMail } from "@/entities/mail/api"
import { ProductBase } from "@/entities/product/model"
import { ContactFormSchema } from "@/widgets/contact-form/model"
import { NextResponse } from "next/server"
import Mail from "nodemailer/lib/mailer"

export async function POST(request: Request) {
  const body: ContactFormSchema & { product: ProductBase } =
    await request.json()
  const { firstname, message, product, mode } = body

  const mailOptions: Mail.Options = {
    from: `"Сайт" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "Новый запрос с сайта",
    html: `
      <p><strong>Имя:</strong> ${firstname}</p>
      ${mode === "email" ? `<p><strong>Email:</strong> ${body.email}</p>` : ""}
      ${mode === "phonenumber" ? `<p><strong>Номер телефона:</strong> ${body.phonenumber}</p>` : ""}
      ${message ? `<p><strong>Сообщение:</strong> ${message}</p>` : ""}
      <p><strong>Интересующий товар:</strong></p>
      ${
        product
          ? `<ul>
        <li>${product.name} (код: ${product.type?.code})</li>
      </ul>`
          : "Нет выбранного товара"
      }
    `,
  }

  try {
    await sendMail(mailOptions)
    return NextResponse.json({
      success: true,
      message: "Запрос успешно отправлен",
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка при отправке запроса",
      },
      { status: 400 }
    )
  }
}
