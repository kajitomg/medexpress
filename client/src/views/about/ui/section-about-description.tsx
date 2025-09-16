import { AboutInfo } from "@/shared/model/strapi/elements/about-info"
import { ContentSection, ContentSectionContent, Typography } from "@/shared/ui"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import * as React from "react"

interface SectionAboutDescriptionProps {
  data?: AboutInfo
}

const SectionAboutDescription = ({ data }: SectionAboutDescriptionProps) => {
  return (
    <>
      <ContentSection>
        <ContentSectionContent className="flex flex-col lg:flex-row gap-4 items-center p-4">
          <div className="text-center flex-none basis-1/2">
            <Typography asChild variant="h2">
              <h2>{data?.items[0].title}</h2>
            </Typography>
          </div>
          {data && (
            <div className="flex flex-col items-center justify-center flex-none basis-1/2 mt-6 lg:mt-0">
              <BlocksRenderer
                content={data?.items[0].content}
                blocks={{
                  paragraph: ({ children }) => (
                    <Typography className="mt-8 first:mt-0">
                      {children}
                    </Typography>
                  ),
                }}
              />
            </div>
          )}
        </ContentSectionContent>
      </ContentSection>
      <ContentSection className="bg-(--color-brand)">
        <ContentSectionContent className="flex flex-col-reverse lg:flex-row  gap-4 items-center p-4 dark">
          {data && (
            <div className="flex flex-col items-center flex-none basis-1/2 mt-6 lg:mt-0">
              <BlocksRenderer
                content={data?.items[1].content}
                blocks={{
                  paragraph: ({ children }) => (
                    <Typography className="text-foreground mt-8 first:mt-0">
                      {children}
                    </Typography>
                  ),
                }}
              />
            </div>
          )}
          <div className="text-center flex-none basis-1/2">
            <Typography asChild variant="h2">
              <h2>{data?.items[1].title}</h2>
            </Typography>
          </div>
        </ContentSectionContent>
      </ContentSection>
    </>
  )
}

export { SectionAboutDescription }
