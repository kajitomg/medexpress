import { Button, Separator, Typography } from "@/shared/ui"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog"
import { ContactFormSchema } from "@/widgets/contact-form/model"
import { ContactFormProvider } from "@/widgets/contact-form/provider"
import { sendContactForm } from "@/widgets/contact-form/services"
import { ContactForm } from "@/widgets/contact-form/ui"
import * as React from "react"

interface ModalProps {
  dialogButton?: string
}

const Modal = ({ dialogButton = "Заказать звонок" }: ModalProps) => {
  const handleSubmit = async (data: ContactFormSchema) => {
    return sendContactForm(data)
  }
  return (
    <Dialog aria-describedby="Модальное окно контактной формы">
      <DialogTrigger asChild>
        <Button size="sm" className="cursor-pointer">
          {dialogButton}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Typography variant="h4">Контактная форма</Typography>
          </DialogTitle>
        </DialogHeader>

        <Separator className="my-4" />
        <div className="min-h-180">
          <ContactFormProvider
            options={{ defaultValues: { mode: "phonenumber" } }}
          >
            <ContactForm
              handleSubmit={handleSubmit}
              className="w-full bg-transparent border-none shadow-none"
            />
          </ContactFormProvider>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { Modal }
