"use client"

import { ProductBase } from "@/entities/product/model"
import { CartData } from "@/features/cart/model/cart"
import { useCartStore } from "@/features/cart/provider"
import { sendCartForm } from "@/features/cart/services"
import { ContactFormSchema } from "@/features/contact-form/model"
import { ContactFormProvider } from "@/widgets/contact-form/provider"
import { ContactForm } from "@/widgets/contact-form/ui"

interface CartContactFormProps {
  products?: CartData<ProductBase>[]
}

const CartContactForm = ({ products }: CartContactFormProps) => {
  const clearCart = useCartStore((state) => state.clearCart)

  const handleSubmit = async (data: ContactFormSchema) => {
    try {
      const response = await sendCartForm({ ...data, products })
      if (response.success) {
        clearCart()
      }
      return response
    } catch (e) {
      console.error("Ошибка отправки формы:", e)
      return { success: false, message: "Ошибка отправки." }
    }
  }

  return (
    <ContactFormProvider>
      <ContactForm
        handleSubmit={handleSubmit}
        title="Заказ:"
        subtitle="Оставьте заявку, чтобы мы связались с вами"
        className="bg-transparent border-none shadow-none w-full"
      />
    </ContactFormProvider>
  )
}

export { CartContactForm }
