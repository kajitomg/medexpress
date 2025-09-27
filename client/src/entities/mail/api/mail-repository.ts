"use server"

import { ErrorHandler } from "@/shared/lib/error"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

export const sendMail = async (options: Mail.Options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    return await transporter.sendMail(options)
  } catch (e) {
    return ErrorHandler(e, "send mail")
  }
}
