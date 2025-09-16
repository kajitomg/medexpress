"use client"

import { usePageStore } from "@/features/page/provider"
import { selectSectionItemByName } from "@/features/page/store"
import { routes } from "@/shared/config/routes"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { ContentSection, ContentSectionContent, Typography } from "@/shared/ui"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"
import Markdown from "react-markdown"

const Page = () => {
  const privatePolicy = usePageStore(
    selectSectionItemByName("shared.rich-text")
  )
  const hero = usePageStore(selectSectionItemByName("sections.hero"))
  return (
    <>
      <PageHeroRoutes
        page={routes.PRIVATEPOLICY}
        title={hero?.title}
        image={hero?.picture?.url && imageUrlBuilder(hero?.picture?.url)}
      />
      <ContentSection>
        <ContentSectionContent>
          <Markdown
            components={{
              strong: ({ children }) => (
                <strong className="text-black">{children}</strong>
              ),
              h3: ({ children }) => (
                <Typography asChild variant="h3" className="text-center my-6">
                  <h3>{children}</h3>
                </Typography>
              ),
              li: ({ children }) => (
                <Typography asChild>
                  <li>{children}</li>
                </Typography>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside">{children}</ul>
              ),
            }}
          >
            {privatePolicy?.body}
          </Markdown>
        </ContentSectionContent>
      </ContentSection>
    </>
  )
}

export { Page }
