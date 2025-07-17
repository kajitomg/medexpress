import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { Subtitle } from "@/shared/ui/subtitle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Title } from "@/shared/ui/title"
import { ContactFormEmail } from "@/widgets/main/contact-form-email"
import { ContactFormPhonenumber } from "@/widgets/main/contact-form-phonenumber"
import * as React from "react"
import { ComponentProps } from "react"
import { HomeFormDataType } from "../../../app/(public)/(main-layout)/(main)/page"

interface SectionContactFormContactFormsProps {
  formData: HomeFormDataType
  onFormChange: (
    field: keyof HomeFormDataType
  ) => (value: string | boolean) => void
}

const SectionContactFormContactForms = ({
  className,
  formData,
  onFormChange,
}: ComponentProps<"div"> & SectionContactFormContactFormsProps) => {
  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <Title asChild className="text-xl">
            <h6>
              <strong>Запросить консультацию</strong>
            </h6>
          </Title>
          <Subtitle className="text-sm">
            Подскажем, какие модели подходят именно под ваши нужды
          </Subtitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email">
            <TabsList className="w-full">
              <TabsTrigger value="email" className="cursor-pointer">
                Почта
              </TabsTrigger>
              <TabsTrigger value="phonenumber" className="cursor-pointer">
                Телефон
              </TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <ContactFormEmail
                formData={formData}
                onFormChange={onFormChange}
              />
            </TabsContent>
            <TabsContent value="phonenumber">
              <ContactFormPhonenumber
                formData={formData}
                onFormChange={onFormChange}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export { SectionContactFormContactForms }
