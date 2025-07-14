import { ProductBase } from "@/entities/product/model"
import { CartItem } from "@/features/cart/model"
import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { name, email, message, cartItems } = body

  // ✅ Настройка SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
  // ✅ Составляем письмо
  const mailOptions = {
    from: `"Сайт" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "Новый запрос с сайта",
    html: `
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Сообщение:</strong> ${message}</p>
      <p><strong>Выбранные товары:</strong></p>
      <ul>
        ${cartItems.map((item: CartItem<ProductBase>) => `<li>${item.item.title} (код: ${item.item.code}) количество: ${item.count}</li>`).join("")}
      </ul>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Ошибка отправки письма:", err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
