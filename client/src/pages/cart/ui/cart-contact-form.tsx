import { sendCartFormMail } from "@/entities/mail/services/send-cart-form-mail"
import { ProductBase } from "@/entities/product/model"
import { CartItem } from "@/features/cart/model"
import { useCartStore } from "@/features/cart/provider"
import {
  ContactFormMode,
  ContactFormModeSchema,
  ContactFormSchema,
} from "@/widgets/contact-form/model"
import {
  ContactFormProvider,
  useContactFormModeStore,
} from "@/widgets/contact-form/provider"
import { ContactForm } from "@/widgets/contact-form/ui"

interface CartContactFormProps {
  cartItems: CartItem<ProductBase>[]
}

const CartContactForm = ({ cartItems }: CartContactFormProps) => {
  const mode = useContactFormModeStore((state) => state.mode)
  const clearCart = useCartStore((state) => state.clearCart)
  const schema = ContactFormModeSchema[mode]

  const callbacks = {
    handleSubmit: async (data: ContactFormSchema) => {
      const type = mode === ContactFormMode.EMAIL ? "email" : "phonenumber"

      try {
        const response = await sendCartFormMail({
          type,
          cartItems: cartItems,
          ...data,
        })
        if (response.success) {
          clearCart()
        }
        return response
      } catch (e) {
        console.error("Ошибка отправки формы:", e)
        return { success: false, message: "Ошибка отправки." }
      }
    },
  }

  return (
    <ContactFormProvider schema={schema}>
      <ContactForm
        handleSubmit={callbacks.handleSubmit}
        title="Заказ:"
        subtitle="Оставьте заявку, чтобы мы связались с вами"
        className="bg-transparent border-none shadow-none"
      />
    </ContactFormProvider>
  )
}

export { CartContactForm }
