import { NextRequest, NextResponse } from "next/server"

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify"

export async function POST(req: NextRequest) {
  const { token } = await req.json()

  const secretKey = process.env.TURNSTILE_KEY

  if (!secretKey) {
    return NextResponse.json(
      { message: "Ошибка конфигурации: секретный ключ не найден." },
      { status: 500 }
    )
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: secretKey,
      response: token,
    }),
  })

  const verificationResult = await response.json()

  if (verificationResult.success) {
    return NextResponse.json({
      message: `Спасибо! Проверка CAPTCHA прошла успешно.`,
    })
  } else {
    return NextResponse.json(
      { message: "Проверка CAPTCHA не удалась. Попробуйте еще раз." },
      { status: 400 }
    )
  }
}
