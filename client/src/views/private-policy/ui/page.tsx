"use client"

import { PageSections } from "@/entities/page/model/page"
import { createSectionsStore } from "@/features/sections/provider"
import { selectSectionItemByName } from "@/features/sections/store"
import { routes } from "@/shared/config/routes"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { ContentSection, ContentSectionContent, Typography } from "@/shared/ui"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"
import Markdown from "react-markdown"

const useSectionsStore = createSectionsStore<PageSections[]>()

const Page = () => {
  const privatePolicy = useSectionsStore(
    selectSectionItemByName("shared.rich-text")
  )
  const hero = useSectionsStore(selectSectionItemByName("sections.hero"))
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
