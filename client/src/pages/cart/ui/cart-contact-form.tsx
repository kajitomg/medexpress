import { sendCartFormMail } from "@/entities/mail/services/send-cart-form-mail"
import { ProductBase } from "@/entities/product/model"
import { CartItem } from "@/features/cart/model"
import { useCartStore } from "@/features/cart/provider"
import {
  ContactFormMode,
  ContactFormSchema,
  contactFormSchemaEmail,
  contactFormSchemaPhonenumber,
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
  const schema =
    mode === ContactFormMode.EMAIL
      ? contactFormSchemaEmail
      : contactFormSchemaPhonenumber

  const callbacks = {
    handleSubmit: async (data: ContactFormSchema) => {
      const type: "email" | "phonenumber" =
        (data?.email && "email") || (data?.phonenumber && "phonenumber")
      return await sendCartFormMail({
        type,
        cartItems: cartItems,
        ...data,
      }).then((result) => {
        clearCart()
        return result
      })
    },
  }

  return (
    <ContactFormProvider schema={schema}>
      <ContactForm
        handleSubmit={callbacks.handleSubmit}
        title="Заказ:"
        subtitle="Оставьте заявку, чтобы связаться с нами"
        className="bg-transparent border-none shadow-none"
      />
    </ContactFormProvider>
  )
}

export { CartContactForm }
