import "@/application/styles/globals.css"
import { fetchFooter } from "@/entities/_single-types/footer/services"
import { fetchHeader } from "@/entities/_single-types/header/services"
import { fetchPage } from "@/entities/page/services"
import { SectionListProvider } from "@/features/sections/provider"
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
} from "@/shared/ui/page-layout"
import { Footer } from "@/widgets/footer/ui"
import { Header } from "@/widgets/header/ui"
import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import * as React from "react"
import slugify from "slugify"
import Error from "../../error"

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const responseCatalog = await fetchPage(
    slugify("Каталог", { lower: true, strict: true })
  )
  const responseHeader = await fetchHeader()
  const responseFooter = await fetchFooter()

  const catalog = responseCatalog.data
  const header = responseHeader.data
  const footer = responseFooter.data
  return (
    <PageLayout>
      <PageLayoutHeader>
        <SectionListProvider
          initialState={{ sections: [...header.sections, ...catalog.sections] }}
        >
          <Header />
        </SectionListProvider>
      </PageLayoutHeader>
      <PageLayoutContent>
        <ErrorBoundary errorComponent={Error}>{children}</ErrorBoundary>
        <PageLayoutFooter>
          <SectionListProvider initialState={{ sections: footer.sections }}>
            <Footer />
          </SectionListProvider>
        </PageLayoutFooter>
      </PageLayoutContent>
    </PageLayout>
  )
}

export default RootLayout
