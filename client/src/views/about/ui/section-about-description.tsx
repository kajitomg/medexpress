import { ContentSection, ContentSectionContent, Typography } from "@/shared/ui"
import * as React from "react"

const SectionAboutDescription = () => {
  return (
    <>
      <ContentSection>
        <ContentSectionContent className="flex flex-col lg:flex-row gap-4 items-center p-4">
          <div className="text-center flex-none basis-1/2">
            <Typography asChild variant="h2">
              <h2>О компании</h2>
            </Typography>
          </div>
          <div className="flex flex-col items-center justify-center flex-none basis-1/2 mt-6 lg:mt-0">
            <Typography>
              Наша компания осуществляет продажу медицинской техники и расходных
              материалов на территории Южного Федерального Округа и других
              регионов Российской Федерации. Компания ООО «Medexpress» успешно
              работает в области оснащения медицинских учреждений
              (государственного и частного сектора) на протяжении 10 лет, и за
              это время были успешно выполнены более 1000 контрактов на поставку
              медицинского оборудования в более чем 100 городов Российской
              Федерации.
            </Typography>
            <Typography className="mt-8">
              В «Medexpress» мы верим, что доступ к современному медицинскому
              оборудованию – это залог эффективной диагностики, качественного
              лечения и, в конечном итоге, здоровья нации. Наша компания
              специализируется на поставках широкого спектра высококачественного
              медицинского оборудования для лечебных учреждений всех типов – от
              небольших частных клиник до крупных государственных больниц.
            </Typography>
          </div>
        </ContentSectionContent>
      </ContentSection>
      <ContentSection className="bg-(--color-brand)">
        <ContentSectionContent className="flex flex-col-reverse lg:flex-row  gap-4 items-center p-4 dark">
          <div className="flex flex-col items-center flex-none basis-1/2 mt-6 lg:mt-0">
            <Typography className="text-foreground">
              Мы стремимся быть больше, чем просто поставщиком. Наша миссия –
              создать надежную логистическую экосистему, которая соединяет
              передовых производителей медицинского оборудования с медицинскими
              учреждениями по всей стране. Мы хотим, чтобы врачи имели
              возможность использовать лучшие инструменты для своей работы, а
              пациенты получали своевременную и квалифицированную помощь.
            </Typography>
          </div>
          <div className="text-center flex-none basis-1/2">
            <Typography asChild variant="h2">
              <h2>Наша миссия</h2>
            </Typography>
          </div>
        </ContentSectionContent>
      </ContentSection>
    </>
  )
}

export { SectionAboutDescription }
