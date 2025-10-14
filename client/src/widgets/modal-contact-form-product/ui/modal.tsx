import { ProductBase } from "@/entities/product/model"
import { cn } from "@/shared/lib"
import { Button, Separator, Typography } from "@/shared/ui"
import { buttonVariants } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog"
import { ContactFormSchema } from "@/widgets/contact-form/model"
import { ContactFormProvider } from "@/widgets/contact-form/provider"
import { ContactForm } from "@/widgets/contact-form/ui"
import { sendProductForm } from "@/widgets/modal-contact-form-product/services"
import { VariantProps } from "class-variance-authority"
import { LucideProps, Phone } from "lucide-react"
import * as React from "react"
import { ComponentProps, ComponentType } from "react"

interface ModalProps {
  dialogButtonText?: string
  dialogButtonIcon?: ComponentType<LucideProps>
  product: ProductBase
}

const Modal = ({
  dialogButtonText = "К оформлению",
  dialogButtonIcon: Icon = Phone,
  product,
  className,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> &
  ModalProps) => {
  const handleSubmit = async (data: ContactFormSchema) => {
    return sendProductForm({ ...data, product })
  }
  return (
    <Dialog>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button
          variant="secondary"
          size="lg"
          className={cn(
            "cursor-pointer hover:shadow-md active:shadow-md overflow-hidden",
            className
          )}
          {...props}
        >
          {dialogButtonText}
          {Icon && <Icon className="size-4" />}
        </Button>
      </DialogTrigger>

      <DialogContent
        aria-describedby="Модальное окно контактной формы"
        className="gap-2 md:gap-4 p-2 md:p-6 flex max-h-[95vh] flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>
            <Typography variant="h4">Контактная форма</Typography>
          </DialogTitle>
        </DialogHeader>

        <Separator className="my-2 md:my-4" />
        <div className="overflow-y-auto">
          <div className="mx-2 md:mx-6 p-2 rounded-b-sm border-t border-(--color-brand) from-black/2 to-black/1 bg-linear-to-b">
            <Typography variant="muted">
              <strong>{product.name}</strong>
            </Typography>
          </div>
          <ContactFormProvider
            options={{ defaultValues: { mode: "phonenumber" } }}
          >
            <ContactForm
              handleSubmit={handleSubmit}
              className="w-full bg-transparent border-none shadow-none p-0 min-w-0"
            />
          </ContactFormProvider>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { Modal }
