"use client"

import { ProductBase } from "@/entities/product/model"
import { CartItem } from "@/features/cart/model"
import { useState } from "react"

interface Props {
  cartItems: CartItem<ProductBase>[]
}

export function ContactForm({ cartItems }: Props) {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  )

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, cartItems }),
    })

    setStatus(res.ok ? "sent" : "error")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Имя"
        required
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
        required
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Сообщение"
        required
      />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Отправка…" : "Отправить"}
      </button>
      {status === "sent" && <p>✅ Отправлено!</p>}
      {status === "error" && <p>❌ Ошибка отправки</p>}
    </form>
  )
}
