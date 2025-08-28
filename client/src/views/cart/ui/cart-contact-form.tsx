"use client"

import { ProductBase } from "@/entities/product/model"
import { CartItem } from "@/features/cart/model"
import { useCartStore } from "@/features/cart/provider"
import { sendCartForm } from "@/features/cart/services"
import { ContactFormSchema } from "@/widgets/contact-form/model"
import { ContactFormProvider } from "@/widgets/contact-form/provider"
import { ContactForm } from "@/widgets/contact-form/ui"

interface CartContactFormProps {
  cartItems: CartItem<ProductBase>[]
}

const CartContactForm = ({ cartItems }: CartContactFormProps) => {
  const clearCart = useCartStore((state) => state.clearCart)

  const handleSubmit = async (data: ContactFormSchema) => {
    try {
      const response = await sendCartForm({ ...data, cartItems })
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
